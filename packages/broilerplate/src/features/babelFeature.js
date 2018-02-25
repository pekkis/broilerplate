const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "babelFeature",
  files: paths => List(),
  plugins: () => OrderedSet(),
  loaders: () => OrderedSet.of("babelLoader"),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
