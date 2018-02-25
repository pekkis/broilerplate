const { List } = require("immutable");
const webpack = require("webpack");
const Plugin = webpack.NamedModulesPlugin;

module.exports = {
  name: () => "namedModulesPlugin",
  isEnabled: (env, target) => true,
  options: (env, target, paths) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
