'use strict';

var nunjucks = require('nunjucks');
var moment = require('moment');
var humanizeDuration = require('humanize-duration');

// Create a custom Nunjucks environment.
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader());

// Define our custom filters.
env.addFilter('date', function (date) {
  return moment(date).format('MMM D YYYY'); // Feb 28, 2014
});
env.addFilter('datestr', function (date) {
  return date.toString().toUpperCase();
});
env.addFilter('fromNow', function (date) {
  return moment(date).fromNow();
});
env.addFilter('datediff', function (startDate, endDate) {
  return endDate - startDate;
});
env.addFilter('humanizeDuration', function (date) {
  date = Math.round(date / 1000) * 1000;
  return humanizeDuration(date);
});

var params = {
  startDate: new Date(2014, 1, 28), // Feb 28
  endDate: new Date(2014, 3, 30), // Apr 30

  minVal: 7,
  maxVal: 19
};

// Usage 1: Render external template file using our custom environment.
var out = env.render('template.html', params);
console.log(out);


// Usage 2: Compile a template from a string and pass our custom environment.
var tmpl = nunjucks.compile('{{ startDate | date }} was {{ startDate | fromNow }}!', env);
var out2 = tmpl.render(params);
console.log(out2);
