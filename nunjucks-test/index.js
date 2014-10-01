'use strict';

var readFile = require("fs").readFileSync;
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true
});

var out = nunjucks.render('index.html', {
  title: 'Nunjucks Sample',
  name: 'Robbie',
  active: true,
  now: Date.now(),
  body: readFile('views/child.html')
});

console.log('Compiled template is:');
console.log('"%s"', out);
