const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const interlinkIdx = js.indexOf('{slug:`interlink`');
console.log('interlinkIdx:', interlinkIdx);
if (interlinkIdx !== -1) {
  console.log(js.slice(interlinkIdx - 300, interlinkIdx + 200));
}
