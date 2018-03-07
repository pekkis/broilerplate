const { OrderedSet, List } = require("immutable");
const path = require("path");
const postCssLoader = require("./postCssLoader");
const baseFeature = require("@dr-kobros/broilerplate/lib/baseFeature");

module.exports = {
  ...baseFeature,
  name: () => "postCssFeature",
  files: paths =>
    List.of({
      source: path.join(__dirname, "../files/postcss.config.js"),
      target: path.join(paths.get("root"), "postcss.config.js")
    }),
  plugins: () => OrderedSet.of("cssExtractPlugin"),
  loaders: () => OrderedSet.of(postCssLoader)
};
