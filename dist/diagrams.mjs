import { screenshotAssets } from './screenshot-assets.mjs';
// The first three diagrams are vectors. Remaining diagrams use unmodified user screenshots, clipped only by SVG viewports.
const svg = (body, viewBox, label) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" role="img" aria-label="${label}">${body}</svg>`;
const tile = (x, y, missing = false) => `<rect x="${x}" y="${y}" width="80" height="80" rx="8" fill="${missing ? '#247f9d' : '#e3f1f7'}"/>`;
const number = (x, y, value, missing = false) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-family="Arial,sans-serif" font-size="${missing ? 34 : 21}" font-weight="700" fill="${missing ? '#fff' : '#4b5b71'}">${value}</text>`;
const triangle = (x, y) => `<path d="M${x} ${y} l-14 24 h28 Z" fill="#55a4bf"/>`;
export function renderArrow(direction, outlined = false) {
  const angle = { up: 0, right: 90, down: 180, left: 270 }[direction];
  return svg(`<path d="M32 5 18 24h9v35h10V24h9Z" transform="rotate(${angle} 32 32)" fill="${outlined ? 'none' : '#55a4bf'}" stroke="${outlined ? '#4b5b71' : 'none'}" stroke-width="2" stroke-linejoin="round"/>`, '0 0 64 64', `${outlined ? 'Outlined' : 'Filled'} arrow pointing ${direction}`);
}
function arrowInTile(x, y, direction, outlined) {
  return `<svg x="${x + 8}" y="${y + 8}" width="64" height="64" viewBox="0 0 64 64">${renderArrow(direction, outlined)}</svg>`;
}
export function renderDiagram(name) {
  if (name.startsWith('screenshot-')) return renderScreenshot(Number(name.split('-')[1]));
  if (name === 'triangle-values') {
    return svg(`${tile(0,0)}${tile(92,0)}${tile(184,0)}${tile(0,92)}${tile(92,92)}${tile(184,92,true)}${triangle(40,40)}${triangle(118,16)}${triangle(132,40)}${triangle(210,16)}${triangle(238,16)}${triangle(224,40)}${number(40,132,'3')}${number(132,132,'6')}${number(224,132,'?',true)}`, '0 0 264 172', 'Two rows of three squares. Top row: one triangle, two triangles, three triangles. Bottom row: 3, 6, question mark.');
  }
  if (name === 'alternating-arrows') {
    return svg(`${tile(0,0)}${tile(92,0)}${tile(184,0)}${tile(0,92)}${tile(92,92)}${tile(184,92,true)}${arrowInTile(0,0,'right',false)}${arrowInTile(92,0,'up',true)}${arrowInTile(184,0,'right',false)}${arrowInTile(0,92,'up',true)}${arrowInTile(92,92,'right',false)}${number(224,132,'?',true)}`, '0 0 264 172', 'Two rows of three squares. Top row: filled right arrow, outlined up arrow, filled right arrow. Bottom row: outlined up arrow, filled right arrow, question mark.');
  }
  if (name === 'count-triangles') {
    return svg('<rect width="264" height="172" rx="8" fill="#e3f1f7"/><path d="M59 21H207L133 150Z" fill="none" stroke="#4b5b71" stroke-width="2" stroke-linejoin="round"/><path d="M59 21 170 86 133 21 96 86H170" fill="none" stroke="#4b5b71" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>', '0 0 264 172', 'A downward triangle with a horizontal top edge. Its three side midpoints are joined into an inner triangle, and a diagonal runs from the top-left vertex to the right-side midpoint. Count triangles of every size.');
  }
  return '';
}

function renderScreenshot(question, optionIndex) {
  const asset = screenshotAssets[question];
  if (!asset) return '';
  const crop = optionIndex === undefined ? asset.crop : asset.options?.[optionIndex];
  if (!crop) return '';
  const label = optionIndex === undefined ? `Question ${question} diagram from the supplied screenshot` : `Option ${'ABCD'[optionIndex]} diagram`;
  return `<svg class="screenshot-window ${optionIndex === undefined ? 'diagram-window' : 'option-window'}" xmlns="http://www.w3.org/2000/svg" viewBox="${crop.join(' ')}" width="${crop[2]}" height="${crop[3]}" style="max-width:100%;height:auto;overflow:hidden" role="img" aria-label="${label}"><image href="${asset.src}" x="0" y="0" width="${asset.width}" height="${asset.height}"/></svg>`;
}
export function renderVisualOption(q, i) {
  if (q.visual?.startsWith('screenshot-')) return renderScreenshot(Number(q.visual.split('-')[1]), i);
  if (q.optionVisuals) return renderArrow(q.optionVisuals[i].direction, q.optionVisuals[i].outlined);
  return '';
}
