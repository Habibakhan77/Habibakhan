const fs = require('fs');
const path = require('path');
const https = require('https');

const assets = JSON.parse(fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\assets_list.json', 'utf8'));

// Also add favicon
assets.push('/favicon.ico');

const baseDir = 'C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\public';

function downloadFile(urlPath) {
  return new Promise((resolve) => {
    const fullUrl = 'https://www.ajwagadgets.com' + urlPath;
    const dest = path.join(baseDir, urlPath.replace(/\//g, path.sep));
    const destDir = path.dirname(dest);
    
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.existsSync(dest) && fs.statSync(dest).size > 0) {
      // already downloaded
      return resolve({ path: urlPath, status: 'exists' });
    }

    const file = fs.createWriteStream(dest);
    const req = https.get(fullUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => resolve({ path: urlPath, status: 'ok', size: fs.statSync(dest).size }));
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        resolve({ path: urlPath, status: 'error ' + res.statusCode });
      }
    });

    req.on('error', (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ path: urlPath, status: 'fail ' + err.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ path: urlPath, status: 'timeout' });
    });
  });
}

async function main() {
  console.log(`Starting download of ${assets.length} assets...`);
  let success = 0;
  let failed = 0;
  
  // Download in batches of 5
  for (let i = 0; i < assets.length; i += 5) {
    const batch = assets.slice(i, i + 5);
    const results = await Promise.all(batch.map(downloadFile));
    for (const r of results) {
      if (r.status === 'ok' || r.status === 'exists') {
        success++;
      } else {
        failed++;
        console.log('Failed:', r.path, r.status);
      }
    }
    process.stdout.write(`Progress: ${Math.min(i + 5, assets.length)}/${assets.length} (ok: ${success}, failed: ${failed})\r`);
  }
  console.log(`\nCompleted. Success: ${success}, Failed: ${failed}`);
}

main();
