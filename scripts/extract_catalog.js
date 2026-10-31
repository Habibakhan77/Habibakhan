const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

const start = js.indexOf('Ki={_comment');
console.log('Start of Ki:', start);

// Let's find where Ki ends by bracket balancing
let depth = 0;
let inString = null;
let end = -1;
for (let i = start + 3; i < js.length; i++) {
  const ch = js[i];
  if (inString) {
    if (ch === '\\') {
      i++;
    } else if (ch === inString) {
      inString = null;
    }
  } else {
    if (ch === '"' || ch === "'" || ch === '`') {
      inString = ch;
    } else if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
}

console.log('End of Ki:', end);
const catalogStr = js.slice(start, end);
fs.writeFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\catalog_raw.js', catalogStr, 'utf8');
console.log('Wrote catalog_raw.js, length:', catalogStr.length);

// Also let's see what comes right after Ki
console.log('After Ki:\n', js.slice(end, end + 1000));
