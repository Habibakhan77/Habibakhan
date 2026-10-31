const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

// Find where the brands array starts
const brandIdx = js.indexOf('Ronin');
// let's scan backwards
for (let i = brandIdx; i >= brandIdx - 30000; i--) {
  if (js.slice(i, i + 8) === 'brands=[' || js.slice(i, i + 7) === 'brands=' || js.slice(i, i + 9) === 'BRANDS=[' || js.slice(i, i + 14) === 'brandCatalog=' || js.slice(i, i + 10) === 'catalog=[' || js.slice(i, i + 7) === '=brand' || js.slice(i, i + 8) === '=[{slug:') {
    console.log('Found pattern at', i, js.slice(i - 20, i + 50));
  }
}
