const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "manifestFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("manifestPlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
