// Préfectures de la République centrafricaine → chemins SVG compacts (src/data/rca-prefectures.json).
//
// Source : geoBoundaries, jeu « gbOpen » CAF ADM1 (version simplifiée)
//   https://github.com/wmgeolab/geoBoundaries/raw/main/releaseData/gbOpen/CAF/ADM1/geoBoundaries-CAF-ADM1_simplified.geojson
// Licence : geoBoundaries gbOpen — données ouvertes (CC BY 4.0 ou licence plus permissive selon la source amont).
//   Citation : Runfola, D. et al. (2020) « geoBoundaries: A global database of political administrative boundaries »,
//   PLoS ONE 15(4): e0231866. https://www.geoboundaries.org
//
// usage : node tools/geo-rca.mjs <fichier.geojson> [sortie=src/data/rca-prefectures.json]
// Projection équirectangulaire (longitude corrigée par cos(latitude moyenne)), y vers le bas,
// précision 1 décimale, largeur de travail 1000 unités.
import { readFileSync, writeFileSync } from 'node:fs';

const [src, out = 'src/data/rca-prefectures.json'] = process.argv.slice(2);
if (!src) {
  console.error('usage : node tools/geo-rca.mjs <fichier.geojson> [sortie.json]');
  process.exit(1);
}

const geo = JSON.parse(readFileSync(src, 'utf8'));
const WIDTH = 1000;
const PAD = 8;

const rings = (g) => (g.type === 'Polygon' ? [g.coordinates] : g.coordinates);
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
for (const f of geo.features) for (const poly of rings(f.geometry)) for (const [x, y] of poly[0]) {
  minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
}
const k = Math.cos((((minY + maxY) / 2) * Math.PI) / 180);
const scale = (WIDTH - 2 * PAD) / ((maxX - minX) * k);
const height = Math.round((maxY - minY) * scale + 2 * PAD);
const px = (lon) => (lon - minX) * k * scale + PAD;
const py = (lat) => (maxY - lat) * scale + PAD;
const r1 = (n) => Math.round(n * 10) / 10;

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[’']/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const prefectures = geo.features.map((f) => {
  let d = '';
  let area = 0, cx = 0, cy = 0;
  for (const poly of rings(f.geometry)) for (const [ri, ring] of poly.entries()) {
    const pts = ring.map(([x, y]) => [r1(px(x)), r1(py(y))]);
    // supprime les points consécutifs identiques après arrondi
    const clean = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
    if (clean.length < 3) continue;
    d += 'M' + clean.map((p) => `${p[0]} ${p[1]}`).join('L') + 'Z';
    if (ri === 0) {
      for (let i = 0; i < clean.length - 1; i++) {
        const [x0, y0] = clean[i], [x1, y1] = clean[i + 1];
        const c = x0 * y1 - x1 * y0;
        area += c; cx += (x0 + x1) * c; cy += (y0 + y1) * c;
      }
    }
  }
  const nom = f.properties.shapeName;
  return { nom, slug: slugify(nom), cx: r1(cx / (3 * area)), cy: r1(cy / (3 * area)), d };
});

const data = {
  source: 'geoBoundaries gbOpen CAF ADM1 (simplifié) — https://www.geoboundaries.org — licence ouverte (CC BY 4.0)',
  viewBox: `0 0 ${WIDTH} ${height}`,
  prefectures: prefectures.sort((a, b) => a.nom.localeCompare(b.nom, 'fr')),
};
writeFileSync(out, JSON.stringify(data));
console.log(`${prefectures.length} préfectures, viewBox ${data.viewBox}, ${JSON.stringify(data).length} octets → ${out}`);
