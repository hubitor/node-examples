'use strict';

var moment = require('moment');
var humanizeDuration = require('humanize-duration');

module.exports = function (env) {
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
};
