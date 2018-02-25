const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "babelMinifyFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("babelMinifyPlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) =>
    values.set("devtool", "none")
};
