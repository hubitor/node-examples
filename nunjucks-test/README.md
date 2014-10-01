# nunjucks test

## Getting started

```sh
$ git clone ...
$ cd node-examples/nunjucks-test
$ npm install
$ npm start # aka `node index`
```

## Files:

```
.
├── index.js
├── node_modules
│   └── (...)
├── package.json
└── views
    ├── child.html
    ├── index.html
    ├── layout.html
    └── nav.html
```

### index.js

The following example shows how you can load and parse templates in Node.js using [Nunjucks](https://mozilla.github.io/nunjucks/).

```js
'use strict';

var readFile = require("fs").readFileSync;
var nunjucks = require('nunjucks');

nunjucks.configure('views', {
  autoescape: true
});

var out = nunjucks.render('index.html', {
  title: 'Nunjucks Sample',
  name: 'Robbie',
  active: true,
  now: Date.now(),
  body: readFile('views/child.html')
});

console.log('Compiled template is:');
console.log('"%s"', out);
```

First, we configure the `nunjucks` object and configure the "views" environment to [auto-escape variables](https://mozilla.github.io/nunjucks/templating.html#autoescaping) using the `autoescape` option which controls if output with dangerous characters are escaped automatically (default is `false`).

Next, we render the ["views/index.html"]() template into a variable, passing in `title`, `name`, `active`, `now`, and `body` variables. The `body` variable contains the raw HTML contents of the ["views/child.html"]() file.

Finally, we log the contents of the compiled template into the console.

### views/index.html

The "views/index.html" file is our main template and [`extends`](https://mozilla.github.io/nunjucks/templating.html#extends) the ["views/layout.html"]() template. It also uses the [`block`](https://mozilla.github.io/nunjucks/templating.html#block) tag to define three replaceable blocks of content:

- "body" &mdash; Renders the contents of the `{{body}}` variable and turns off auto-escaping using the [`safe`](https://mozilla.github.io/nunjucks/templating.html#autoescaping) filter.
- "left" and "right" &mdash; Renders a few variables.

```html
{% extends "layout.html" %}

{% block body %}
  {{ body | safe }}
{% endblock %}

{% block left %}
  <p>This is the left side, {{ name }}!</p>
  <p>active? {{ active }}</p>
{% endblock %}

{% block right %}
  <p>{{ name }}, this is the right side!</p>
  <p>Current epoch time is {{ now }}.</p>
{% endblock %}
```

### views/layout.html

The "views/layout.html" file is the root template and defines the general structure of our HTML document. In this template we use the [`include`](https://mozilla.github.io/nunjucks/templating.html#include) tag to include the ["views/nav.html"]() file into the template.

Next we define the "header", "body", "left", and "right" blocks.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>{{ title }}</title>
</head>
<body>

  <div class="container">
    {% include "nav.html" %}

    {% block header %}
      <p>This is the default content, {{ name }}.</p>
    {% endblock %}

    {% block body %}
    {% endblock %}

    <hr/>

    <section class="left">
      {% block left %}{% endblock %}
    </section>

    <section class="right">
      {% block right %}
        <p>This is more content</p>
      {% endblock %}
    </section>
  </div>

</body>
</html>
```

### views/nav.html

Included via the `{% include "nav.html" %}` tag in ["views/layout.html"]().

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="https://twitter.com/pdehaan">@pdehaan</a></li>
  </ul>
</nav>
```

### views/child.html

Included via `readFile('views/child.html')` in the ["/index.js"]() file.

```html
<section>
  <p>This is a dynamically loaded thing.</p>
  <article>
    <ul>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </ul>
  </article>
</section>
```

## Output (pretty formatted)

```html
<!doctype html>
<html lang="en">
  <head>
    <title>Nunjucks Sample</title>
  </head>
  <body>
    <div class="container">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="https://twitter.com/pdehaan">@pdehaan</a></li>
        </ul>
      </nav>
      <p>This is the default content, Robbie.</p>
      <section>
        <p>This is a dynamically loaded thing.</p>
        <article>
          <ul>
            <li>One</li>
            <li>Two</li>
            <li>Three</li>
          </ul>
        </article>
      </section>
      <hr/>
      <section class="left">
        <p>This is the left side, Robbie!</p>
        <p>active? true</p>
      </section>
      <section class="right">
        <p>Robbie, this is the right side!</p>
        <p>Current epoch time is 1412202338683.</p>
      </section>
    </div>
  </body>
</html>
```




