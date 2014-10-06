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


## Reference
1. [Nunjucks: Customizing Syntax](http://mozilla.github.io/nunjucks/api.html#customizing-syntax)
