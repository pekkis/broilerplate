const { List, Map } = require("immutable");
const { createPlugin } = require("../extend");
const Plugin = require("terser-webpack-plugin");

const defaultOptions = Map({ parallel: true, cache: true });

const terserPlugin = (options = defaultOptions) =>
  createPlugin(Plugin)({
    name: () => "terserPlugin",
    isEnabled: env => env === "production",
    options: () => List.of(defaultOptions.merge(options))
  });

module.exports = terserPlugin;
