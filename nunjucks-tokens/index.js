'use strict';

var nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true,
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    commentStart: '<#',
    commentEnd: '#>',
    variableStart: '<$',
    variableEnd: '$>'
  }
});

var out = nunjucks.render('index.html', {
  title: 'Nunjucks Sample',
  name: 'Robbie'
});

console.log('Compiled template is:');
console.log('"%s"', out);
