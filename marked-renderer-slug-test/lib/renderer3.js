'use strict';


var format = require('util').format;

var marked = require('marked');
var slug = require('slug');

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  return format('<h%d id="%s">%s</h%d>\n', level, slug(text.toLowerCase()), text, level);
};

module.exports = renderer;
