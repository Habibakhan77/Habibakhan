const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const brandIdx = js.indexOf('{slug:`ronin`');
console.log(js.slice(brandIdx - 500, brandIdx + 200));
