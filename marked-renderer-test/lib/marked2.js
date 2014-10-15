'use strict';

var format = require('util').format;

var marked = require('marked');

module.exports = function (markdownString){
  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    // Example: <h3>Heading Level 3</h3>
    return format('<h%d>%s</h%d>', level, text, level);
  };
  return marked(markdownString, {
    renderer: renderer
  });
};
