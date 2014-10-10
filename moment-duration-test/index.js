'use strict';

var moment = require('moment');

var startDate = new Date(2014, 1, 28); // Feb 28, 2014
var endDate = new Date(2014, 3, 30); // Apr 30, 2104

var diff = endDate - startDate; // milliseconds

var duration = moment.duration(diff);
var humanDuration = moment.duration(diff).humanize();

console.log('duration: %s', duration); // duration: P2MT23H
console.log('humanize: %s', humanDuration); // humanize: 2 months


var date1 = new Date(2014, 3, 28, 1, 18, 39); // Mon Apr 28 2014 01:18:39 GMT-0700 (PDT)
var date2 = new Date(2014, 3, 30, 19, 32, 8); // Wed Apr 30 2014 19:32:08 GMT-0700 (PDT)

var diff2 = date2 - date1;

console.log(moment.duration(diff2).humanize()); // 3 days
console.log(moment.duration(-diff2).humanize()); // 3 days
console.log(moment.duration(diff2).humanize(true)); // in 3 days
console.log(moment.duration(-diff2).humanize(true)); // 3 days ago
