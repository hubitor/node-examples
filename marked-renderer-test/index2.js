'use strict';

var fs = require('fs');
var format = require('util').format;

var marked = require('marked');

fs.readFile('test.md', 'utf8', function (err, data) {
  if (err) {
    throw err;
  }

  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    // Example: <h3>Heading Level 3</h3>
    return format('<h%d>%s</h%d>\n', level, text, level);
  };
  var output = marked(data, {
    renderer: renderer
  });
  console.log(output);
});
