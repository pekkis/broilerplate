#!/usr/bin/env node

"use strict";

const { List } = require("immutable");
const path = require("path");
const copy = require("@dr-kobros/broilerplate/lib/copy");

const rootDir = process.env.PWD;

const files = List.of(
  {
    source: path.join(__dirname, "../files/.broilerplate.js"),
    target: path.join(rootDir, ".broilerplate.js")
  },
  {
    source: path.join(__dirname, "../files/webpack.config.babel.js"),
    target: path.join(rootDir, "webpack.config.babel.js")
  }
);

files.forEach(file => {
  const { source, target } = file;
  copy(source, target, false);
});

console.log(
  "Broilerplate is ready for use. Tune .broilerplate.js and run the start script for the first time to get the rest of your files."
);
