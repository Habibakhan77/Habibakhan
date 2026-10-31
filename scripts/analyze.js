const fs = require('fs');
const path = require('path');

const jsContent = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

console.log('JS content length:', jsContent.length);

// Find all image / asset paths
const imgMatches = jsContent.match(/["'`]([^"'`]+\.(?:jpg|jpeg|png|webp|svg|ico|gif|avif))["'`]/gi) || [];
const uniqueImages = [...new Set(imgMatches.map(s => s.slice(1, -1)))];
console.log('Image references found:', uniqueImages.length);
console.log(uniqueImages.slice(0, 30));

// Find routes
const routeMatches = jsContent.match(/path:\s*["'`]([^"'`]+)["'`]/g) || [];
console.log('Route paths found:', [...new Set(routeMatches)]);

// Check for common strings like "products", "categories", etc.
console.log('Has products data:', jsContent.includes('products'));
