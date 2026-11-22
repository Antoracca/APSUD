// Vérification des ANIMATIONS (une capture fixe ne suffit pas).
// Amène une section dans l'écran comme un vrai visiteur, puis :
//   1. enregistre une SÉQUENCE d'images (toutes les <intervalle> ms) → on voit l'apparition,
//      le glissement, le compteur qui monte, image par image ;
//   2. relève via le protocole DevTools (domaine Animation) chaque animation/transition jouée :
//      type, nom, propriété, durée, délai, courbe, élément ;
//   3. échantillonne le texte de l'élément ciblé (ex. compteurs 0 → 250 000) au fil du temps.
// Même outil pour Prosper et pour APSUD → comparaison objective.
//
// usage : node tools/anim.mjs <url> <sélecteur_css> <dossier_sortie> [largeur=1440] [hauteur=900] [port=9450] [durée_ms=2600] [intervalle_ms=130]
// ex.    node tools/anim.mjs https://www.prosperglobal.org/ ".c-quick-stats" docs/design/animations/prosper-chiffres
//        node tools/anim.mjs http://127.0.0.1:4321/ ".c-manifesto" docs/design/animations/apsud-chiffres
import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const [url, selector, outDir, wA = '1440', hA = '900', pA = '9450', dA = '2600', iA = '130'] = process.argv.slice(2);
if (!url || !selector || !outDir) {
  console.error('usage: node tools/anim.mjs <url> <sélecteur> <dossier> [largeur] [hauteur] [port] [durée_ms] [intervalle_ms]');
  process.exit(1);
}
const W = +wA, H = +hA, PORT = +pA, DUR = +dA, STEP = +iA;
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profile = join(tmpdir(), `apsud-anim-${PORT}`);
const edge = spawn(EDGE, ['--headless=new', '--hide-scrollbars', '--disable-gpu', '--no-first-run',
  `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
mkdirSync(outDir, { recursive: true });

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
  let id = 0; const pending = new Map(); const animations = [];
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
    if (m.method === 'Animation.animationStarted') animations.push({ t: Date.now(), a: m.params.animation });
  });
  // chaque commande CDP expire après 15 s (évite les blocages sur les pages lourdes)
  const send = (method, params = {}) => new Promise((r) => {
    const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params }));
    setTimeout(() => { if (pending.has(i)) { pending.delete(i); r({ timeout: true }); } }, 15000);
  });
  const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

  const mobile = W < 768;
  await send('Page.enable'); await send('Runtime.enable'); await send('DOM.enable');
  // les vidéos de fond (hero) bloquent les captures en mode headless : on ne les charge pas
  await send('Network.enable');
  await send('Network.setBlockedURLs', { urls: ['*.mp4', '*.webm', '*.m3u8'] });
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile });
  await send('Page.navigate', { url });
  // attend que la section existe (pages lourdes : jusqu'à 40 s)
  for (let i = 0; i < 40; i++) {
    await sleep(1000);
    if (await ev(`!!document.querySelector(${JSON.stringify(selector)})`)) break;
  }
  await sleep(2500);
  // ferme pop-ups / bandeaux (refus) pour ne pas masquer la section
  await ev(`(()=>{document.querySelectorAll('.c-pop-up__decline,.c-pop-up__close,#onetrust-reject-all-handler,[data-cookie-reject]').forEach(b=>{try{b.click()}catch(e){}});return 1})()`);
  const found = await ev(`!!document.querySelector(${JSON.stringify(selector)})`);
  if (!found) throw new Error(`Sélecteur introuvable : ${selector}`);
  // place la section juste sous le bas de l'écran, sans la déclencher
  await ev(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});const y=el.getBoundingClientRect().top+scrollY-innerHeight-40;scrollTo(0,Math.max(0,y));return 1})()`);
  await sleep(1200);
  await send('Animation.enable');
  const t0 = Date.now();
  // défilement « humain » sur ~500 ms jusqu'à centrer la section
  ev(`(async()=>{const el=document.querySelector(${JSON.stringify(selector)});const target=el.getBoundingClientRect().top+scrollY-innerHeight*0.15;const start=scrollY;const n=12;for(let i=1;i<=n;i++){scrollTo(0,start+(target-start)*i/n);await new Promise(r=>setTimeout(r,40))}return 1})()`);
  const frames = []; const texts = [];
  for (let t = 0; t <= DUR; t += STEP) {
    const shot = await send('Page.captureScreenshot', { format: 'jpeg', quality: 70 });
    const name = `frame-${String(frames.length).padStart(2, '0')}-${Date.now() - t0}ms.jpg`;
    writeFileSync(join(outDir, name), Buffer.from(shot.result.data, 'base64'));
    frames.push(name);
    texts.push({ ms: Date.now() - t0, text: await ev(`(document.querySelector(${JSON.stringify(selector)}).innerText||'').replace(/\\s+/g,' ').slice(0,240)`) });
    await sleep(Math.max(0, STEP - 60));
  }
  const report = {
    url, selector, viewport: `${W}x${H}`, captured_ms: DUR, frames,
    animations: animations.map(({ t, a }) => ({
      start_ms: t - t0,
      type: a.type, // CSSTransition | CSSAnimation | WebAnimation
      name: a.name,
      duration_ms: a.source?.duration,
      delay_ms: a.source?.delay,
      easing: a.source?.easing,
      iterations: a.source?.iterations,
      keyframes_rule: a.source?.keyframesRule?.name ?? null,
    })),
    text_samples: texts,
  };
  writeFileSync(join(outDir, 'rapport.json'), JSON.stringify(report, null, 2));
  console.log(`${frames.length} images + rapport.json dans ${outDir} — ${report.animations.length} animations relevées`);
  ws.close();
} catch (e) {
  console.error('Échec :', e.message);
  process.exitCode = 1;
} finally {
  edge.kill();
  await sleep(400);
  try { rmSync(profile, { recursive: true, force: true }); } catch {}
  process.exit();
}
