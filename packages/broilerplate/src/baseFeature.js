const { OrderedSet, List } = require("immutable");

const feature = {
  files: paths => List(),
  plugins: () => OrderedSet(),
  loaders: () => OrderedSet(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths) => values
};

module.exports = feature;
