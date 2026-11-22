/**
 * Résolution des images de la base `assets/` (racine du dépôt) vers des objets
 * ImageMetadata d'Astro, pour que <Image>/<Picture> les optimisent (AVIF/WebP, srcset).
 *
 * Usage : const img = getImage('assets/apsud/images/…/photo.jpg')
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '/assets/**/*.{jpg,jpeg,png,webp,avif,svg}',
  { eager: true },
);

export function getImage(path: string): ImageMetadata {
  const key = '/' + path.replace(/^\/+/, '');
  const mod = files[key];
  if (!mod) {
    throw new Error(`Image introuvable : ${path} (vérifier le chemin dans data/ ou src/data/)`);
  }
  return mod.default;
}

export function hasImage(path: string | null | undefined): boolean {
  if (!path) return false;
  return ('/' + path.replace(/^\/+/, '')) in files;
}
