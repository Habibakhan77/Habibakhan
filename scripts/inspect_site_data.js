const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const interlinkIdx = js.indexOf('{_comment:`Ajwa Mobile');
console.log('Catalog starts around:', interlinkIdx);

// Let's see what is before _comment
console.log('Before catalog:\n', js.slice(interlinkIdx - 1500, interlinkIdx));
