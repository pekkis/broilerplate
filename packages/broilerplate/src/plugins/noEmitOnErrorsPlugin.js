const Plugin = require("webpack").NoEmitOnErrorsPlugin;
const { List } = require("immutable");

module.exports = {
  name: () => "noEmitOnErrorsPlugin",
  isEnabled: (env, target) => true,
  defaults: (env, target) => List.of(undefined),
  plugin: options => new Plugin(...options)
};
