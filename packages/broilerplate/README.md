# Broilerplate

## What?

A Webpack / React boilerplate.

## Why?

* I want an upgradeable, reusable broilerplate.
* I don't want to use create-react-app because it doesn't give me what I need and I don't want to eject.

## How?

Check [my training project](https://github.com/pekkis/hardcore-react-training) for now. Details will come.
Just experimenting with this to see whether it could work!

```javascript

import broilerplate from '@dr-kobros/broilerplate';
import overrides from "./somewhere";

const env = "development";
const target = "client";

const paths = {
  root: path.resolve(__dirname),
  src: path.resolve(__dirname, "./src"),
  build: path.resolve(__dirname, "./dist"),
  modules: path.resolve(__dirname, "./node_modules"),
  test: path.resolve(__dirname, "./test")
};

module.exports = broilerplate(env, target, paths, overrides).run();
