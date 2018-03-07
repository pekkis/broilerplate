const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "basicOptimizationFeature",
  files: paths => List(),
  plugins: () =>
    OrderedSet.of("occurrenceOrderPlugin", "moduleConcatenationPlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths) => values
};
