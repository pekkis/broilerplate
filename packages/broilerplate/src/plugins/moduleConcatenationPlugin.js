const Plugin = require("webpack").optimize.ModuleConcatenationPlugin;
const { List } = require("immutable");

module.exports = {
  name: () => "moduleConcatenationPlugin",
  isEnabled: (env, target) => env === "production",
  options: (env, target) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
