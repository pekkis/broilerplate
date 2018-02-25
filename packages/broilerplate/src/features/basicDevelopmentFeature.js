const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "basicDevelopmentFeature",
  files: paths => {
    return List();
  },

  plugins: () =>
    OrderedSet.of(
      "caseSensitivePathsPlugin",
      "watchMissingNodeModulesPlugin",
      "noEmitOnErrorsPlugin",
      "definePlugin",
      "namedModulesPlugin",
      "namedChunksPlugin",
      "statsPlugin",
      "cleanPlugin"
    ),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
