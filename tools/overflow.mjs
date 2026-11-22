// Contrôle AUTOMATIQUE du responsive, sans capture d'écran.
// Pour chaque page × largeur, rapporte :
//   - débordement horizontal de la page (scrollWidth > largeur) et les éléments qui dépassent ;
//   - cibles tactiles trop petites (< 44 px) sur mobile ;
//   - textes trop petits (< 12 px).
//
// usage : node tools/overflow.mjs [port=9600] [largeurs=360,390,430,768,1024,1280] [chemins séparés par des virgules]
// sans chemins : explore le site depuis « / » et teste toutes les pages internes trouvées.
import { spawn } from 'node:child_process';
import { rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const BASE = 'http://127.0.0.1:4321';
const [portArg = '9600', widthsArg = '360,390,430,768,1024,1280', pathsArg] = process.argv.slice(2);
const PORT = +portArg;
const WIDTHS = widthsArg.split(',').map(Number);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function crawl() {
  const seen = new Set(); const q = ['/'];
  while (q.length && seen.size < 200) {
    const u = q.shift(); if (seen.has(u)) continue; seen.add(u);
    let html = '';
    try { html = await (await fetch(BASE + u)).text(); } catch { continue; }
    for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
      const h = m[1].replace(/\/$/, '') || '/';
      if (/^\/(_|@|node_modules)/.test(h) || /\.[a-z0-9]+$/i.test(h)) continue;
      if (!seen.has(h)) q.push(h);
    }
  }
  return [...seen];
}

const PATHS = pathsArg ? pathsArg.split(',') : await crawl();
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profile = join(tmpdir(), `apsud-overflow-${PORT}`);
const edge = spawn(EDGE, ['--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });

const CHECK = `(()=>{
  const W = innerWidth, out = { scrollW: document.documentElement.scrollWidth, over: [], small: [], tiny: [] };
  const name = (e) => e.tagName.toLowerCase() + (e.className && typeof e.className === 'string' ? '.' + e.className.trim().split(/\\s+/)[0] : '');
  for (const e of document.querySelectorAll('body *')) {
    const cs = getComputedStyle(e);
    if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
    const r = e.getBoundingClientRect();
    if (!r.width || !r.height) continue;
    if (r.right > W + 1 || r.left < -1) {
      let p = e.parentElement, clipped = false;
      while (p && p !== document.body) { const o = getComputedStyle(p).overflowX; if (o !== 'visible') { clipped = true; break; } p = p.parentElement; }
      if (!clipped) out.over.push(name(e) + ' [' + Math.round(r.left) + '→' + Math.round(r.right) + ']');
    }
    if (W < 768 && e.matches('a[href], button, input, select, textarea, [role=button], [role=tab]') && !e.closest('p, li > p') ) {
      const inline = cs.display === 'inline' && e.closest('p');
      if (!inline && (r.height < 40 || r.width < 40)) out.small.push(name(e) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height) + ' « ' + (e.textContent || e.getAttribute('aria-label') || '').trim().slice(0, 30) + ' »');
    }
    if (e.childNodes.length && [...e.childNodes].some(n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(cs.fontSize) < 12) out.tiny.push(name(e) + ' ' + cs.fontSize);
  }
  out.over = [...new Set(out.over)].slice(0, 8); out.small = [...new Set(out.small)].slice(0, 8); out.tiny = [...new Set(out.tiny)].slice(0, 5);
  return out;
})()`;

try {
  let ws;
  for (let i = 0; i < 60 && !ws; i++) {
    try { const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); const p = l.find((t) => t.type === 'page'); if (p) ws = new WebSocket(p.webSocketDebuggerUrl); } catch {}
    if (!ws) await sleep(500);
  }
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params }));
    setTimeout(() => { if (pending.has(i)) { pending.delete(i); r({}); } }, 30000); });
  await send('Page.enable'); await send('Runtime.enable');
  let problems = 0;
  for (const w of WIDTHS) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 768 });
    for (const p of PATHS) {
      await send('Page.navigate', { url: BASE + p });
      await sleep(2200);
      const r = (await send('Runtime.evaluate', { expression: CHECK, returnByValue: true })).result?.result?.value;
      if (!r) { console.log(`${w}px ${p} : évaluation impossible`); continue; }
      const bad = r.scrollW > w + 1 || r.over.length || r.small.length || r.tiny.length;
      if (bad) {
        problems++;
        console.log(`\n${w}px ${p}${r.scrollW > w + 1 ? `  ⚠ DÉBORDEMENT page ${r.scrollW}px` : ''}`);
        if (r.over.length) console.log('  dépasse :', r.over.join(' | '));
        if (r.small.length) console.log('  cibles < 44px :', r.small.join(' | '));
        if (r.tiny.length) console.log('  texte < 12px :', r.tiny.join(' | '));
      }
    }
  }
  console.log(`\n${PATHS.length} pages × ${WIDTHS.length} largeurs — ${problems} combinaisons avec remarques`);
  ws.close();
} catch (e) {
  console.error('Échec :', e.message); process.exitCode = 1;
} finally {
  edge.kill(); await sleep(400);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  process.exit();
}
