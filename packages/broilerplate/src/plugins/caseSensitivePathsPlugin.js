const Plugin = require("case-sensitive-paths-webpack-plugin");
const { List } = require("immutable");

module.exports = {
  name: () => "caseSensitivePathsPlugin",
  isEnabled: (env, target) => env === "development",
  options: (env, target) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
