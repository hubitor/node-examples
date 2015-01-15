'use strict';

var EmbedlyWorker = require('./lib/embedlyworker');

EmbedlyWorker.perform('https://github.com/mozilla/chronicle', EmbedlyWorker.EXTRACT, function (err, results) {
  if (err) {
    // Remove from queue?
    return console.error(err);
  }
  // Insert results into Redis?
  console.log(JSON.stringify(results, null, 2));
});
