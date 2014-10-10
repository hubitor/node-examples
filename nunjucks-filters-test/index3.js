'use strict';

var nunjucks = require('nunjucks');

// Create a custom Nunjucks environment.
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader());

// Define our custom filters.
require('./filters3')(env);

var params = {
  startDate: new Date(2014, 1, 28), // Feb 28
  endDate: new Date(2014, 3, 30), // Apr 30

  minVal: 7,
  maxVal: 19
};

var out = env.render('template.html', params);
console.log(out);
