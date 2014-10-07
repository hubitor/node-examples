# css-parse-test

The following example shows how you can write a simple linter to check CSS rule names contain a certain set of characters using the [css](https://github.com/reworkcss/css) module.

## Setup

```sh
$ git clone git@github.com:pdehaan/node-examples.git
$ cd node-examples/css-parse-test
$ npm install
$ npm start
```

## Introduction

The CSS rule names are checked against the following Regular Expression:
```regex
/^[a-z\d\s\[\]\-#+=>~:.,"*^]+$/i
```

This checks for one or more letters (case insensitive), digits, whitespace, `[`, `]`, `-`, `#`, `+`, `=`, `>`, `~`, `:`, `.`, `,`, `"`, `*`, and `^` characters, and will list out any rule names that do not match this pattern.

## Sample output

```sh
$ npm start

> css-parse-test@1.0.0 start ./node-examples/css-parse-test
> node index

0. .user_div
```