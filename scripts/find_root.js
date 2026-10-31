const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const brandIdx = js.indexOf('{slug:`ronin`');
console.log('brandIdx:', brandIdx);
if (brandIdx !== -1) {
  // Let's find earlier {slug:
  let pos = brandIdx;
  while (pos > 0) {
    const prev = js.lastIndexOf('{slug:', pos - 1);
    if (prev === -1 || (pos - prev > 10000 && !js.slice(prev, pos).includes('products:['))) {
      console.log('Root array start near:', prev, js.slice(prev - 50, prev + 100));
      break;
    }
    pos = prev;
  }
}
