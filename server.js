const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5173;
const ROOT = __dirname;
const PUBLIC = path.join(ROOT, 'public');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/') reqPath = '/index.html';

  // Candidate paths
  const publicPath = path.join(PUBLIC, reqPath);
  const rootPath = path.join(ROOT, reqPath);

  let targetPath = null;
  if (fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    targetPath = publicPath;
  } else if (fs.existsSync(rootPath) && fs.statSync(rootPath).isFile()) {
    targetPath = rootPath;
  } else {
    // Check if it's an asset or page route - SPA fallback
    const ext = path.extname(reqPath);
    if (!ext || ext === '.html') {
      const indexHtml = path.join(ROOT, 'index.html');
      if (fs.existsSync(indexHtml)) {
        targetPath = indexHtml;
      }
    }
  }

  if (targetPath) {
    const ext = path.extname(targetPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(targetPath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found: ' + reqPath);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
