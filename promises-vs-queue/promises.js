'use strict';

var Promise = require('promise');

var idx;
var len = 20;

var START_MS = Date.now();

for (idx = 0; idx < len; idx += 1) {
  getThatThing('str ' + idx).then(function (str) {
    console.log(str);
  }, function (err) {
    console.error(err);
  });
}

function getThatThing(str) {
  return new Promise(function (resolve, reject) {
    var obj = {
      str: 'Resolving \"' + str + '\"',
      ms: Date.now() - START_MS
    };
    setTimeout(function () {
      resolve(obj);
    }, 1500);
  });
}
