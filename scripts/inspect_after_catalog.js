const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const start = 297824;
console.log(js.slice(start, start + 4000));
