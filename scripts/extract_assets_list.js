const fs = require('fs');

const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');
const css = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.css', 'utf8');
const html = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\source.html', 'utf8');

const allText = js + '\n' + css + '\n' + html;

// Match anything starting with /products/ or /brand/ or /assets/ or ending in image/font extensions
const regex = /["'`]((\/(?:products|brand|images|icons|assets)[^"'`\s>]+?\.(?:jpg|jpeg|png|webp|avif|svg|ico|gif|woff2|woff|ttf)))["'`]/gi;
const assets = new Set();
let match;
while ((match = regex.exec(allText)) !== null) {
  assets.add(match[1]);
}

console.log('Total unique assets found:', assets.size);
const assetList = Array.from(assets).sort();
fs.writeFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\assets_list.json', JSON.stringify(assetList, null, 2), 'utf8');
console.log('Saved assets_list.json');
console.log('Sample:', assetList.slice(0, 20));
