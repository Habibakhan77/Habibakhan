const fs = require('fs');
const js = fs.readFileSync('C:\\Users\\SALMAN PC\\.gemini\\antigravity\\scratch\\ajwagadgets\\index.js', 'utf8');

function findFunc(name) {
  const patterns = [
    `function ${name}(`,
    `function ${name} `,
    `var ${name}=`,
    `const ${name}=`,
    `let ${name}=`
  ];
  for (const p of patterns) {
    const idx = js.lastIndexOf(p, 440000);
    if (idx !== -1) {
      console.log(`Found ${p} at ${idx}:`);
      console.log(js.slice(idx, idx + 400));
      return;
    }
  }
  console.log(`Could not find ${name}`);
}

const comps = ['Ls', 'Bs', 'Hs', 'Ws', 'Ks', '$s', 'ec', 'tc', 'Vs', 'ns', 'Go', 'rs', 'Fn', 'sa'];
for (const c of comps) {
  findFunc(c);
}
