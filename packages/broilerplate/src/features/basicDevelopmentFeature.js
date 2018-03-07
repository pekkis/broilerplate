const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "basicDevelopmentFeature",
  files: paths => {
    return List();
  },

  plugins: () =>
    OrderedSet.of(
      "caseSensitivePathsPlugin",
      // "watchMissingNodeModulesPlugin",
      "definePlugin",
      // "namedChunksPlugin",
      "statsPlugin",
      "cleanPlugin"
    ),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths) => values
};
