const svelte = require('svelte/compiler');
const fs = require('fs');

const filename = 'src/MultiCarousel.html';
const code = fs.readFileSync(filename, 'utf8');

const result = svelte.compile(code, {
  filename,
  css: false,
});

fs.writeFileSync('lib/MultiCarousel.js', result.js.code);
fs.writeFileSync('lib/MultiCarousel.css', result.css.code);
