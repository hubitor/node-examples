# nunjucks-filter-test

## Introduction

The following examples show how you can create custom filters using Nunjucks.

## Template (template.tmpl)

```html
<h1>Filters test</h1>

<dl>
  <dt><code>startDate</code>:</dt>
  <dd>{{ startDate }}</dd>

  <dt><code>startDate | <em>date</em></code>:</dt>
  <dd>{{ startDate | date }}</dd>

  <dt><code>startDate | <em>datestr</em></code>:</dt>
  <dd>{{ startDate | datestr }}</dd>

  <dt><code>startDate | <em>fromNow</em></code>:</dt>
  <dd>{{ startDate | fromNow }}</dd>

  <dt><code>startDate | <em>datediff(endDate)</em></code>:</dt>
  <dd>{{ startDate | datediff(endDate) }}</dd>

  <dt><code>minVal | <em>datediff(maxVal)</em></code>:</dt>
  <dd>{{ minVal | datediff(maxVal) }}</dd>

  <dt><code>endDate | <em>humanizeDuration</em></code>:</dt>
  <dd>{{ endDate | humanizeDuration }}</dd>

  <dt><code>startDate | <em>datediff(endDate) | humanizeDuration</em></code>:</dt>
  <dd>{{ startDate | datediff(endDate) | humanizeDuration }}</dd>
</dl>
```

## Example 1

In the following example, we see how we can create a custom `nunjucks.Environment` object and render a template using `Environment.render()` or `Template.render()`:

### index.js

In the _index.js_ file, we `require()` the "moment" and "humanize-duration" modules and define each of our custom filters in the main file.

```js
'use strict';

var nunjucks = require('nunjucks');
var moment = require('moment');
var humanizeDuration = require('humanize-duration');

// Create a custom Nunjucks environment.
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader());

// Define our custom filters.
env.addFilter('date', function (date) {
  return moment(date).format('MMM D YYYY'); // Feb 28, 2014
});

// ...

var params = {
  startDate: new Date(2014, 1, 28), // Feb 28
  endDate: new Date(2014, 3, 30), // Apr 30

  minVal: 7,
  maxVal: 19
};

// Usage 1: Render external template file using our custom environment.
var out = env.render('template.html', params);
console.log(out);


// Usage 2: Compile a template from a string and pass our custom environment.
var tmpl = nunjucks.compile('{{ startDate | date }} was {{ startDate | fromNow }}!', env);
var out2 = tmpl.render(params);
console.log(out2);
```

In the first snippet, we see how we can render an external template using `env.render()` and passing in the template name and `params` object:

```js
// Usage 1: Render external template file using our custom environment.
var out = env.render('template.html', params);
console.log(out);
```

In the second snippet, we see how we can compile and render a template string using `nunjucks.compile()` and `tmpl.render()`:

```js
// Usage 2: Compile a template from a string and pass our custom environment.
var tmpl = nunjucks.compile('{{ startDate | date }} was {{ startDate | fromNow }}!', env);
var out2 = tmpl.render(params);
console.log(out2); // Output: "Feb 28 2014 was 7 months ago!"
```

### Output

```html
<h1>Filters test</h1>

<dl>
  <dt><code>startDate</code>:</dt>
  <dd>Fri Feb 28 2014 00:00:00 GMT-0800 (PST)</dd>

  <dt><code>startDate | <em>date</em></code>:</dt>
  <dd>Feb 28 2014</dd>

  <dt><code>startDate | <em>datestr</em></code>:</dt>
  <dd>FRI FEB 28 2014 00:00:00 GMT-0800 (PST)</dd>

  <dt><code>startDate | <em>fromNow</em></code>:</dt>
  <dd>7 months ago</dd>

  <dt><code>startDate | <em>datediff(endDate)</em></code>:</dt>
  <dd>5266800000</dd>

  <dt><code>minVal | <em>datediff(maxVal)</em></code>:</dt>
  <dd>12</dd>

  <dt><code>endDate | <em>humanizeDuration</em></code>:</dt>
  <dd>44 years, 3 months, 3 weeks, 6 days, 23 hours, 30 minutes</dd>

  <dt><code>startDate | <em>datediff(endDate) | humanizeDuration</em></code>:</dt>
  <dd>2 months, 2 hours</dd>
</dl>
```

## Example 2

In the following example, we see how we can move the custom filters into an external file, _filters.js_.

### index2.js

```js
'use strict';

var nunjucks = require('nunjucks');
var filters = require('./filters2');

// Create a custom Nunjucks environment.
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader());

// Define our custom filters.
env.addFilter('date', filters.date);
env.addFilter('datestr', filters.datestr);
env.addFilter('fromNow', filters.fromNow);
env.addFilter('datediff', filters.datediff);
env.addFilter('humanizeDuration', filters.humanizeDuration);

var params = {
  startDate: new Date(2014, 1, 28), // Feb 28
  endDate: new Date(2014, 3, 30), // Apr 30

  minVal: 7,
  maxVal: 19
};

var out = env.render('template.html', params);
console.log(out);
```

### filters2.js

In the _filters2.js_ file, we export each of our custom filter functions using `exports`.

```js
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
```

## Example 3

### index3.js

In the _index3.js_ file, we require the _filters3.js_ file and pass our `env` object to the custom module.

```js
'use strict';

var nunjucks = require('nunjucks');

// Create a custom Nunjucks environment.
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader());

// Define our custom filters.
require('./filters3')(env);

var params = {
  startDate: new Date(2014, 1, 28), // Feb 28
  endDate: new Date(2014, 3, 30), // Apr 30

  minVal: 7,
  maxVal: 19
};

var out = env.render('template.html', params);
console.log(out);
```


### filters3.js

In the _filters3.js_ file, we export a function which takes a single argument, `env`, and we attach our custom filters.

```js
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
```
