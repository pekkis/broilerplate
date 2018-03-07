const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "externalCssFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("cssExtractPlugin"),
  loaders: () => OrderedSet.of("externalcssLoader"),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths) => values
};
