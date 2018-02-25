const { List } = require("immutable");
const webpack = require("webpack");
const Plugin = webpack.HashedModuleIdsPlugin;

module.exports = {
  name: () => "hashedModulesPlugin",
  isEnabled: (env, target) => true,
  options: (env, target, paths) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
