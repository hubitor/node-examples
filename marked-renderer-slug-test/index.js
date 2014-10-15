'use strict';

var readFile = require('fs').readFileSync;

var marked = require('marked');

var markdownString = readFile('./test.md', 'utf-8');
var output = marked(markdownString);

console.log(output);

/**
 * <h1 id="locale-slug-test-in-for-marked-npm-module">Locale slug test in for marked npm module</h1>
 * <h2 id="introduction">Introduction</h2>
 * <p>(en-US)</p>
 * <h2 id="-">ভূমিকা</h2>
 * <p>(bn-BD)</p>
 * <h2 id="-">Введение</h2>
 * <p>(ru)</p>
 * <hr>
 */
