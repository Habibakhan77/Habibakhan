const fs = require('fs');

const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

// Let's find all route definitions and component names
const routesIdx = js.indexOf('path:`/`');
console.log('Routes snippet:\n', js.substring(routesIdx - 200, routesIdx + 1200));
