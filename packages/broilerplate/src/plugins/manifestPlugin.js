const Plugin = require("webpack-manifest-plugin");
const { List } = require("immutable");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(Plugin)({
    name: () => "manifestPlugin",
    isEnabled: (env, target) => target === "client",
    options: () => List.of(config)
  });
