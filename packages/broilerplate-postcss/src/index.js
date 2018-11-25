const { OrderedSet, List } = require("immutable");
const path = require("path");
const postCssLoader = require("./postCssLoader");
const { createFeature } = require("@dr-kobros/broilerplate/lib/extend");

module.exports = config =>
  createFeature({
    name: () => "postCssFeature",
    files: paths =>
      List.of({
        source: path.join(__dirname, "../files/postcss.config.js"),
        target: path.join(paths.get("root"), "postcss.config.js")
      }),
    loaders: () => OrderedSet.of(postCssLoader())
  });
