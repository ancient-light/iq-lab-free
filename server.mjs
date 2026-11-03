import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
const root = new URL('./dist/', import.meta.url);
const allowed = new Set(['index.html', 'style.css', 'app.mjs', 'questions.mjs', 'diagrams.mjs', 'screenshot-assets.mjs']);
const types = { html: 'text/html; charset=utf-8', css: 'text/css; charset=utf-8', mjs: 'text/javascript; charset=utf-8', png: 'image/png' };
const port = Number(process.env.PORT || 4179);
createServer(async (req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;
  const file = pathname === '/' || pathname === '/iq-test' || pathname === '/iq-test/' ? 'index.html' : pathname.replace(/^\/(?:iq-test\/)?/, '');
  if (!allowed.has(file) && !/^assets\/question-(?:0[4-9]|1[0-9]|20)\.png$/.test(file)) { res.writeHead(404); res.end('Not found'); return; }
  try { const body = await readFile(new URL(file, root)); res.writeHead(200, { 'Content-Type': types[file.split('.').at(-1)], 'Cache-Control': 'no-store' }); res.end(body); }
  catch { res.writeHead(500); res.end('Unable to load page'); }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
