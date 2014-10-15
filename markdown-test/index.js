'use strict';

var fs = require('fs');

var markdown = require('markdown').markdown;

var output = markdown.toHTML(getFile('./test.md'), "Maruku");

console.log(output);

function getFile(src) {
  return fs.readFileSync(src, 'utf-8');
}
