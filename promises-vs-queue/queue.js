'use strict';

var queue = require('async').queue;

var idx;
var len = 20;
var tasks = [];
var results = [];

var START_MS = Date.now();

for (idx = 0; idx < len; idx += 1) {
  tasks.push({
    idx: idx,
    str: 'str ' + idx
  });
}

console.log(tasks.length); // 20

var q = queue(function (task, callback) {
  setTimeout(function () {
    task.ms = Date.now() - START_MS;
    results.push(task);
    callback();
  }, 500);
}, 2);

q.drain = function() {
  console.log(results);
};

q.push(tasks, function (err) {
  if (err) {
    return console.error(err);
  }
});
