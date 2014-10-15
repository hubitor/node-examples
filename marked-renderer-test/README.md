# marked `Renderer()` test

The following example shows how you can create a custom renderer for the [**marked**](https://github.com/chjj/marked) Markdown library to strip out `id` attributes for header tags.

---

## <index.js>

The following example shows the default header tag (`<h1>` - `<h6>`) behavior of the **marked** library:

```js
var output = marked(data);
console.log(output);
```

### Output:

```html
<h1 id="heading-1">heading 1</h1>
<p>This is some paragraph text.</p>
<h2 id="heading-2">heading 2</h2>
<p>More text. This isn&#39;t very interesting.</p>
```

---

## [index2.js](/index2.js)

The following example shows how you can create a custom renderer to remove the `id` attribute from the header tags.

```js
var renderer = new marked.Renderer();
renderer.heading = function (text, level) {
  // Example: <h3>Heading Level 3</h3>
  return format('<h%d>%s</h%d>\n', level, text, level);
};
var output = marked(data, {
  renderer: renderer
});
console.log(output);
```

### Output:

```html
<h1>heading 1</h1>
<p>This is some paragraph text.</p>
<h2>heading 2</h2>
<p>More text. This isn&#39;t very interesting.</p>
```

---

## [index3.js](/index3.js)

The following example shows how you can factor out the custom renderer into a separate module, [_lib/marked3.js_](/lib/marked3.js):

```js
'use strict';

var fs = require('fs');

var marked = require('./lib/marked3');

fs.readFile('test.md', 'utf8', function (err, data) {
  if (err) {
    throw err;
  }

  var output = marked(data);
  console.log(output);
});
```

### [lib/marked3.js](/lib/marked3.js)

```js
'use strict';

var format = require('util').format;

var marked = require('marked');

module.exports = function (markdownString){
  var renderer = new marked.Renderer();
  renderer.heading = function (text, level) {
    // Example: <h3>Heading Level 3</h3>
    return format('<h%d>%s</h%d>\n', level, text, level);
  };
  return marked(markdownString, {
    renderer: renderer
  });
};
```

### Output: 

```html
<h1>heading 1</h1>
<p>This is some paragraph text.</p>
<h2>heading 2</h2>
<p>More text. This isn&#39;t very interesting.</p>
```
