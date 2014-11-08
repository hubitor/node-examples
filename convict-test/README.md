# convict-test

Testing [convict](https://github.com/mozilla/node-convict) module.

## How Do I Even?

### index.js

The _index.js_ file loads our _config/index.js_ file and displays the `ip` and `port` variables for the specified environment:

```js
'use strict';

var cfg = require('./config/index');

console.log('[%s] %s:%d', cfg.get('env'), cfg.get('ip'), cfg.get('port'));
```

### config/index.js

The _config/index.js_ file imports the `convict` module and our _schema.json_ file. Next we load the config file for the specified environment ("production", "development", or "test"), validate the schema, and export the `config` object.

```js
'use strict';

var path = require('path');

var convict = require('convict');

var schema = require('./schema.json');

var config = convict(schema);
var configJSON = path.join(__dirname, config.get('env') + '.json');
config.loadFile(configJSON);
config.validate();

module.exports = config;
```

### config/schema.json

The _config/schema.json_ file specifies the keys in our configuration (in this case `env`, `ip`, and `port`) where each key defines documentation, formats (which are checked during validation), default values, and environment variables.

```json
{
  "env": {
    "doc": "The applicaton environment.",
    "format": [
      "production",
      "development",
      "test"
    ],
    "default": "development",
    "env": "NODE_ENV"
  },
  "ip": {
    "doc": "The IP address to bind.",
    "format": "ipaddress",
    "default": "0.0.0.0",
    "env": "IP_ADDRESS"
  },
  "port": {
    "doc": "The port to bind.",
    "format": "port",
    "default": 5000,
    "env": "PORT"
  }
}
```

### config/production.json

The _production.json_ file defines two properties, `ip` and `port`, which are used when the `process.env.NODE_ENV` is set to "production":

```json
{
  "ip": "8.8.8.1",
  "port": 4000
}
```

### config/development.json

The _development.json_ file defines a single property, `port`, which is used when the `process.env.NODE_ENV` is set to "development". In this case the `ip` property isn't defined, and uses the default value (0.0.0.0) from the schema file:

```json
{
  "port": 3000
}
```

### config/test.json

The _test.json_ file defines two properties, `ip` and `port`, which are used when the `process.env.NODE_ENV` is set to "test":

```json
{
  "ip": "127.0.0.1",
  "port": 5000
}
```

## Output

```sh
$ node index
# [development] 0.0.0.0:3000

$ NODE_ENV=production node index
# [production] 8.8.8.1:4000

$ NODE_ENV=development node index
# [development] 0.0.0.0:3000

$ NODE_ENV=test node index
# [test] 127.0.0.1:5000

$ NODE_ENV=test PORT=8000 node index
# [test] 127.0.0.1:8000
```