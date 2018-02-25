const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "uglifyMinifyFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("uglifyPlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
