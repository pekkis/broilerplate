# Mini CSS Extract feature

CSS extracting with mini-css-extract-plugin

## Usage

Add feature to Broilerplate pipeline.

```js
const cssExtractFeature = require("@dr-kobros/broilerplate-mini-css-extract");

pipe(
  ...,
  addFeatures(cssExtractFeature),
  ...,
  compile(...),
  ...
);
```
