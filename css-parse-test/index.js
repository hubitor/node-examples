'use strict';

var fs = require('fs');
var css = require('css'); // npm i css -S

var CSS_PATH = './styles/en_US.css';

fs.readFile(CSS_PATH, 'utf8', function (err, data) {
  if (err) {
    throw err;
  }

  var parseRules = function (arr) {
    return arr.filter(function (rule) {
      if (rule.type === 'media') {
        parseRules(rule.rules);
      }
      return (rule.type === 'rule');
    }).map(function (rule) {
      return rule.selectors.toString();
    }).filter(function (ruleStr) {
      var selectorRE = /^[a-z\d\s\[\]\-#+=>~:.,"*^]+$/i;
      return !selectorRE.test(ruleStr);
    }).forEach(function (ruleStr, idx) {
      console.log('%d. %s', idx, ruleStr);
    });
  };

  parseRules(css.parse(data).stylesheet.rules);
});
