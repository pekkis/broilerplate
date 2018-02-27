const { OrderedSet, List } = require("immutable");
const path = require("path");
const postCssLoader = require("./postCssLoader");

module.exports = {
  name: () => "postCssFeature",
  files: paths =>
    List.of({
      source: path.join(__dirname, "../files/postcss.config.js"),
      target: path.join(paths.get("root"), "postcss.config.js")
    }),
  plugins: () => OrderedSet.of("cssExtractPlugin"),
  loaders: () => OrderedSet.of(postCssLoader),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
