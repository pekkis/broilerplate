const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "codeSplittingFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("vendorBundlePlugin", "metaBundlePlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
