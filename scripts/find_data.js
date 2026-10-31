const fs = require('fs');

const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

// Let's find all occurrences of brands, categories, products
// Let's search around index 260000 to 300000
const start = 250000;
const end = 310000;
const slice = js.substring(start, end);

// Let's find variable declarations or exports near here
console.log('Search for brand definitions:');
const brandIdx = js.indexOf('Ronin');
console.log('First Ronin at', brandIdx);
console.log(js.substring(brandIdx - 100, brandIdx + 200));
