# nunjucks-tokens

The following example shows how you can use custom block, comment, and variable tokens by creating a custom configuration and defining the `blockStart`, `blockEnd`, `commentStart`, `commentEnd`, `variableStart`, and `variableEnd` tags, as seen in the following snippet:

```js
nunjucks.configure('views', {
  autoescape: true,
  tags: {
    blockStart: '<%',
    blockEnd: '%>',
    commentStart: '<#',
    commentEnd: '#>',
    variableStart: '<$',
    variableEnd: '$>'
  }
});
```

## Input

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title><$ title $></title>
</head>
<body>

  <div class="container">
    <% include "nav.html" %>

    <% block header %>
      <p>This is the default content, {{ name }}.</p>
    <% endblock %>
  </div>

</body>
</html>
```

If you render the previous template ([index.html](/nunjucks-token/index.html)) with the following JavaScript snippet you'd get the following output:

```js
var out = nunjucks.render('index.html', {
  title: 'Nunjucks Sample',
  name: 'Robbie'
});
```

## Output

```html
<!DOCTYPE html>
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

    <p>This is the default content, {{ name }}.</p>
  </div>

</body>
</html>
```

Note how the `{{ name }}` remains unprocessed since it isn't using the custom `<$` and `$>` variable delimiters (allowing us to process some variables using Nunjucks and leave some variables to be processed by Angular.


## Reference
1. [Nunjucks: Customizing Syntax](http://mozilla.github.io/nunjucks/api.html#customizing-syntax)
