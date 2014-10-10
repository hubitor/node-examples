'use strict';

var moment = require('moment');
var humanizeDuration = require('humanize-duration');


module.exports = {
  date: function (date) {
    return moment(date).format('MMM D, YYYY'); // Feb 28, 2014
  },
  datestr: function (date) {
    return date.toString().toUpperCase();
  },
  fromNow: function (date) {
    return moment(date).fromNow();
  },
  datediff: function (startDate, endDate) {
    return endDate - startDate;
  },
  humanizeDuration: function (date) {
    date = Math.round(date / 1000) * 1000;
    return humanizeDuration(date);
  }
};
