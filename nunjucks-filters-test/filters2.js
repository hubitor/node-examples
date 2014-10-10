'use strict';

var moment = require('moment');
var humanizeDuration = require('humanize-duration');

exports.date = function (date) {
  return moment(date).format('MMM D, YYYY'); // Feb 28, 2014
};
exports.datestr = function (date) {
  return date.toString().toUpperCase();
};
exports.fromNow = function (date) {
  return moment(date).fromNow();
};
exports.datediff = function (startDate, endDate) {
  return endDate - startDate;
};
exports.humanizeDuration = function (date) {
  date = Math.round(date / 1000) * 1000;
  return humanizeDuration(date);
};
