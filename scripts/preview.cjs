const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4'};
const server = http.createServer((req,res) => {
  let file;
  try { file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url,'http://localhost').pathname)); }
  catch { res.writeHead(400).end(); return; }
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end(); return; }
  const size = fs.statSync(file).size;
  const headers = {'Content-Type':mime[path.extname(file)] || 'application/octet-stream','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
  const range = req.headers.range && /^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
  let start = 0, end = size - 1;
  if (range) {
    start = Number(range[1]); end = range[2] ? Math.min(Number(range[2]),size-1) : size-1;
    if (start > end || start >= size) { res.writeHead(416,{'Content-Range':`bytes */${size}`}).end(); return; }
    headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
  }
  headers['Content-Length'] = end-start+1;
  res.writeHead(range ? 206 : 200, headers);
  if (req.method === 'HEAD') res.end(); else fs.createReadStream(file,{start,end}).pipe(res);
});
server.listen(8765,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8765'));
