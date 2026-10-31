const fs = require('fs');

const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

// Search for product definitions or array of products
// Usually something like const products = [...] or similar
const match = js.match(/\[\s*\{\s*id\s*:/);
console.log('Match [{id: ?', !!match);

// Let's search for "Mist_Pro" or "R_7125" or similar to find the product array
const idx = js.indexOf('Mist_Pro');
if (idx !== -1) {
  console.log('Found Mist_Pro at', idx);
  console.log(js.substring(idx - 200, idx + 400));
}
