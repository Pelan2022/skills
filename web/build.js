// Build web/index.html: render both markdown sources to HTML and inline them.
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');

const root = path.resolve(__dirname, '..');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');

let sk = read('skoleni/promptovani-8h-skoleni.md');
const rs = read('research/promptovani-2026.md');

sk = sk.replace(/<span style="[^"]*">(.*?)<\/span>/g, '<span class="injection">$1</span>')
       .replace(/<example>/g, '&lt;example&gt;')
       .replace(/<\/example>/g, '&lt;/example&gt;');

const html = (md) => marked.parse(md, { gfm: true });
const out = read('web/template.html')
  .replace('__SKOLENI__', () => html(sk))
  .replace('__RESEARCH__', () => html(rs));

fs.writeFileSync(path.join(__dirname, 'index.html'), out);
console.log('ok', out.length);
