'use strict';

var fs = require('fs');

var marked = require('./lib/marked3');

fs.readFile('test.md', 'utf8', function (err, data) {
  if (err) {
    throw err;
  }

  var output = marked(data);
  console.log(output);
});
