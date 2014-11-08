'use strict';

var cfg = require('./config/index');

console.log('[%s] %s:%d', cfg.get('env'), cfg.get('ip'), cfg.get('port'));
