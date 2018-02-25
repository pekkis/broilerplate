const { List } = require("immutable");
const webpack = require("webpack");
const Plugin = webpack.optimize.OccurrenceOrderPlugin;

module.exports = {
  name: () => "occurrenceOrderPlugin",
  isEnabled: (env, target) => true,
  options: (env, target, paths) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
