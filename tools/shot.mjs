// Capture d'écran d'une page via Edge headless + protocole DevTools (émulation d'appareil réelle).
// Plusieurs captures peuvent tourner en parallèle : chaque appel utilise son propre port et profil.
//
// usage : node tools/shot.mjs <url> <largeur> <hauteur|full> <sortie.png> [port=9400] [attente_ms=2500] [scrollY=0]
// ex.    node tools/shot.mjs http://localhost:4321/ 1440 full docs/captures/accueil-desktop.png 9401
//        node tools/shot.mjs http://localhost:4321/ 390 844 docs/captures/accueil-mobile.png 9402
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { tmpdir } from 'node:os';

const [url, wArg, hArg, out, portArg = '9400', waitArg = '2500', scrollArg = '0'] = process.argv.slice(2);
if (!url || !wArg || !hArg || !out) {
  console.error('usage: node tools/shot.mjs <url> <w> <h|full> <out.png> [port] [wait_ms] [scrollY]');
  process.exit(1);
}
const W = Number(wArg), FULL = hArg === 'full', H0 = FULL ? 900 : Number(hArg);
const PORT = Number(portArg), WAIT = Number(waitArg), SCROLL_Y = Number(scrollArg);
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profile = join(tmpdir(), `apsud-shot-${PORT}`);
const edge = spawn(EDGE, ['--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWs() {
  for (let i = 0; i < 60; i++) {
    try {
      const l = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
      const p = l.find((t) => t.type === 'page');
      if (p) return p.webSocketDebuggerUrl;
    } catch {}
    await sleep(500);
  }
  throw new Error('Edge CDP indisponible');
}

try {
  const ws = new WebSocket(await getWs());
  await new Promise((r) => ws.addEventListener('open', r));
  let id = 0; const pending = new Map();
  ws.addEventListener('message', (e) => { const m = JSON.parse(e.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } });
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

  const mobile = W < 768;
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  await send('Network.setUserAgentOverride', {
    userAgent: mobile
      ? 'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Mobile Safari/537.36'
      : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36',
    acceptLanguage: 'fr-FR,fr;q=0.9',
  });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H0, deviceScaleFactor: 1, mobile });
  await send('Page.navigate', { url });
  await sleep(WAIT);
  let H = H0;
  if (FULL) {
    // défile toute la page pour déclencher révélations, compteurs et lazy-loading
    await ev(`(async()=>{const s=ms=>new Promise(r=>setTimeout(r,ms));for(let y=0;y<document.documentElement.scrollHeight;y+=300){scrollTo(0,y);await s(120)}await s(1600);scrollTo(0,0);await s(600);return 1})()`);
    H = Math.min(await ev('document.documentElement.scrollHeight'), 16000);
    await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
    // force la fin des révélations au défilement, puis laisse finir les transitions (~1,2 s)
    await ev(`(()=>{document.querySelectorAll('[data-reveal]').forEach(e=>{e.classList.add('is-revealed');e.dispatchEvent(new CustomEvent('reveal'))});return 1})()`);
    await sleep(2600);
  } else if (SCROLL_Y) {
    await ev(`(async()=>{scrollTo(0,${SCROLL_Y});await new Promise(r=>setTimeout(r,1800));return 1})()`);
  }
  const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: FULL });
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, Buffer.from(shot.result.data, 'base64'));
  console.log(`${out} ${W}x${H}`);
  ws.close();
} catch (e) {
  console.error('Échec capture :', e.message);
  process.exitCode = 1;
} finally {
  edge.kill();
  await sleep(400);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
}
