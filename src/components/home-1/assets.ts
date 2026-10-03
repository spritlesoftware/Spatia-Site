import fs from 'node:fs';
import path from 'node:path';

export type AssetKind = 'video' | 'still' | 'icon' | 'diagram' | 'pdf' | 'image';

export interface Asset {
  id: string;
  file: string;
  kind: AssetKind;
  /** Shown in the placeholder when the real file has not shipped yet. */
  desc: string;
  section: string;
}

export const ASSETS = {
  A01: { id: 'A01', file: 'hero-loop.mp4', kind: 'video', section: '2 Hero', desc: 'Bin picking with pose overlays, plus moving part with deviation highlight' },
  A02: { id: 'A02', file: 'advantage-icons.svg', kind: 'icon', section: '5 Advantages', desc: 'Four line icons' },
  A03: { id: 'A03', file: 'platform-diagram.svg', kind: 'diagram', section: '6 Platform', desc: 'Animated SVG, See to Locate to Plan to Act' },
  A04: { id: 'A04', file: 'assembly-overview.mp4', kind: 'video', section: '7-01', desc: 'Parts brought to an assembly target without fixtures' },
  A05: { id: 'A05', file: 'proof-demo.mp4', kind: 'video', section: '7-01 Pick', desc: 'Robot picks from a bin' },
  A06: { id: 'A06', file: 'assembly-overview.mp4', kind: 'video', section: '7-01 Sort', desc: 'Mixed parts recognized and routed' },
  A07: { id: 'A07', file: 'vernier-inspect.mp4', kind: 'video', section: '7-01 Stack', desc: 'Parts stacked in ordered layers' },
  A08: { id: 'A08', file: 'assembly-overview.mp4', kind: 'video', section: '7-01 Load', desc: 'Part loaded into a machine or station' },
  A09: { id: 'A09', file: 'vernier-inspect.mp4', kind: 'video', section: '7-01 Place', desc: 'Part placed with alignment correction' },
  A10: { id: 'A10', file: 'vernier-inspect.mp4', kind: 'video', section: '7-02', desc: 'Part passes camera, deviation flagged' },
  A11: { id: 'A11', file: 'vernier-inspect.mp4', kind: 'still', section: '7-02', desc: 'Deviation heat-map against CAD' },
  A12: { id: 'A12', file: 'vernier-inspect.mp4', kind: 'video', section: '7-03', desc: 'Unknown object scanned then picked' },
  A13: { id: 'A13', file: 'step1-upload.mp4', kind: 'video', section: '8 Step 1', desc: 'CAD upload screen recording' },
  A14: { id: 'A14', file: 'step1-upload.mp4', kind: 'video', section: '8 Step 2', desc: 'Grasp definition screen recording' },
  A15: { id: 'A15', file: 'step1-upload.mp4', kind: 'video', section: '8 Step 3', desc: 'Live run with pose overlay' },
  A16: { id: 'A16', file: 'proof-demo.mp4', kind: 'video', section: '10 Proof', desc: 'Lab or simulation demo' },
  A17: { id: 'A17', file: 'case-assembly.webp', kind: 'still', section: '10 Proof', desc: 'Case-study thumbnail' },
  A18: { id: 'A18', file: 'case-inspection.webp', kind: 'still', section: '10 Proof', desc: 'Case-study thumbnail' },
  A19: { id: 'A19', file: 'cta-loop.mp4', kind: 'video', section: '11 CTA', desc: 'Slow background pick loop' },
  A20: { id: 'A20', file: 'brochure.pdf', kind: 'pdf', section: '12 Brochure', desc: 'Product overview' },
  A21: { id: 'A21', file: 'og-image.png', kind: 'image', section: 'SEO', desc: 'Social share image, 1200x630' },
} as const satisfies Record<string, Asset>;

export type AssetId = keyof typeof ASSETS;

const MEDIA_DIR = path.resolve(process.cwd(), 'public', 'media', 'home');

/** Public-relative URL for an asset. */
export const mediaUrl = (id: AssetId) => `/media/home/${ASSETS[id].file}`;

/** True once the real file has been dropped into /public/media/home/. */
export const hasAsset = (id: AssetId) => fs.existsSync(path.join(MEDIA_DIR, ASSETS[id].file));

/**
 * Poster frame is optional: `<name>-poster.webp` next to the video.
 * Returns undefined when absent so we never emit a 404 poster.
 */
export const posterFor = (id: AssetId) => {
  const name = ASSETS[id].file.replace(/\.[^.]+$/, '') + '-poster.webp';
  return fs.existsSync(path.join(MEDIA_DIR, name)) ? `/media/home/${name}` : undefined;
};
