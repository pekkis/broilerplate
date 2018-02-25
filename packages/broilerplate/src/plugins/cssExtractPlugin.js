const { List } = require("immutable");
const Plugin = require("extract-text-webpack-plugin");

module.exports = {
  name: () => "cssExtractPlugin",
  isEnabled: (env, target) => env === "production",
  options: (env, target, paths) => List.of("styles.[contenthash].css"),
  plugin: options => new Plugin(...options)
};
