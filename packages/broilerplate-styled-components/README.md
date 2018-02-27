# PostCSS for Broilerplate

Adds a PostCSS feature to Broilerplate.

## Usage

Add feature to Broilerplate pipeline in pre-compilation phase.

```js

const postCSSFeature = require("@dr-kobros/broilerplate-postcss");

pipe(
  ...,
  postCSSFeature,
  ...,
  compile(...),
  ...
);

```
