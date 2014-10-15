'use strict';

var readFile = require('fs').readFileSync;
var format = require('util').format;

var marked = require('marked');
var slug = require('slug');

var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  return format('<h%d id="%s">%s</h%d>\n', level, slug(text.toLowerCase()), text, level);
};
var markdownString = readFile('./test.md', 'utf-8');
var output = marked(markdownString, {renderer: renderer});

console.log(output);

/**
 * <h1 id="locale-slug-test-in-for-marked-npm-module">Locale slug test in for marked npm module</h1>
 * <h2 id="introduction">Introduction</h2>
 * <p>(en-US)</p>
 * <h2 id="">ভূমিকা</h2>
 * <p>(bn-BD)</p>
 * <h2 id="vvedenie">Введение</h2>
 * <p>(ru)</p>
 * <hr>
 */
