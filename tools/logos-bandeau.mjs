// Logos du bandeau défilant de l'accueil (HomePartners.astro) : version SANS FOND, posée sur le vert.
// Pour chaque logo de partenaire utilisé par le site :
//   - s'il est déjà détouré (bords transparents) : SVG gardé tel quel ; image matricielle rognée de ses marges ;
//   - sinon, le fond clair RELIÉ AUX BORDS est rendu transparent (remplissage par diffusion depuis
//     les bords, bord adouci) ; les blancs INTÉRIEURS du logo (lettres, emblèmes) sont conservés.
// Sortie : assets/partenaires/bandeau/<slug>.png (PNG RGBA, hauteur 320 px max, sans agrandir).
// Les originaux ne sont jamais modifiés. Relancer après l'ajout d'un logo :
//   node tools/logos-bandeau.mjs
import sharp from 'sharp';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const OUT = 'assets/partenaires/bandeau';
const data = JSON.parse(readFileSync('data/apsud/partenaires.json', 'utf8'));
const list = Array.isArray(data) ? data : data.partenaires;
mkdirSync(OUT, { recursive: true });

const pick = (p) => {
  const c = [p.logo_hd?.chemin, p.logo_source_apsud?.chemin];
  const a = JSON.stringify(p).match(/assets\/partenaires\/archives-apsud\/[\w.-]+/);
  if (a) c.push(a[0]);
  return c.find((f) => f && existsSync(f) && /\.(png|jpe?g|webp|svg)$/i.test(f));
};

const report = [];
for (const p of list) {
  const file = pick(p);
  if (!file) continue;
  // version vectorielle redessinée à la main (ex. drapeau du Japon) : prioritaire, on n'y touche pas
  if (existsSync(join(OUT, `${p.slug}.svg`))) { report.push(`${p.slug} : SVG redessiné conservé`); continue; }
  const img = sharp(file, { density: 300 }).resize({ height: 320, withoutEnlargement: true }).ensureAlpha();
  const { data: px, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const at = (x, y) => (y * w + x) * 4;
  const light = (i) => px[i + 3] > 20 && Math.min(px[i], px[i + 1], px[i + 2]) > 225;

  // part des pixels de bord déjà transparents
  let border = 0, clear = 0;
  for (let x = 0; x < w; x++) for (const y of [0, h - 1]) { border++; if (px[at(x, y) + 3] < 20) clear++; }
  for (let y = 0; y < h; y++) for (const x of [0, w - 1]) { border++; if (px[at(x, y) + 3] < 20) clear++; }
  if (clear / border > 0.9) {
    // déjà détouré : les SVG restent tels quels ; les images matricielles sont seulement rognées
    // de leurs marges transparentes (sinon un logo noyé dans sa marge paraît minuscule)
    if (/\.svg$/i.test(file)) { report.push(`${p.slug} : déjà détouré, vectoriel (${file})`); continue; }
    const out = join(OUT, `${p.slug}.png`);
    writeFileSync(out, await sharp(px, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer());
    report.push(`${p.slug} : déjà détouré, marges rognées → ${out}`);
    continue;
  }

  // diffusion depuis les bords sur les pixels clairs
  const seen = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => { const k = y * w + x; if (!seen[k] && light(k * 4)) { seen[k] = 1; stack.push(k); } };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const k = stack.pop(); const x = k % w, y = (k / w) | 0;
    if (x > 0) push(x - 1, y); if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1); if (y < h - 1) push(x, y + 1);
  }
  // transparence + bord adouci : un pixel voisin du fond perd de l'opacité selon sa clarté
  for (let k = 0; k < w * h; k++) {
    const i = k * 4;
    if (seen[k]) { px[i + 3] = 0; continue; }
    const x = k % w, y = (k / w) | 0;
    const nearBg = (x > 0 && seen[k - 1]) || (x < w - 1 && seen[k + 1]) || (y > 0 && seen[k - w]) || (y < h - 1 && seen[k + w]);
    if (nearBg) {
      const m = Math.min(px[i], px[i + 1], px[i + 2]);
      if (m > 160) px[i + 3] = Math.round(px[i + 3] * (255 - m) / 95);
    }
  }
  const out = join(OUT, `${p.slug}.png`);
  writeFileSync(out, await sharp(px, { raw: { width: w, height: h, channels: 4 } }).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toBuffer());
  report.push(`${p.slug} : fond retiré → ${out}`);
}
console.log(report.join('\n'));
