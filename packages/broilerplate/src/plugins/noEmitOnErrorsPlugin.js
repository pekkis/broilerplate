const Plugin = require("webpack").NoEmitOnErrorsPlugin;
const { List } = require("immutable");

module.exports = {
  name: () => "noEmitOnErrorsPlugin",
  isEnabled: (env, target) => true,
  options: (env, target) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
