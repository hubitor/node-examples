'use strict';

var fs = require('fs');
var path = require('path');

var convict = require('convict');

var schema = require('./schema.json');

var config = convict(schema);
var configJSON = path.join(__dirname, config.get('env') + '.json');
if (!fs.existsSync(configJSON)) {
  console.log('Cannot find file: %s', configJSON);
} else {
  config.loadFile(configJSON);
  config.validate();
}

module.exports = config;
