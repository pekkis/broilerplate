const { List, Map } = require("immutable");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(CleanWebpackPlugin)({
    name: () => "cleanPlugin",
    isEnabled: env => env === "production",
    options: (env, target, paths) => List.of(Map({}))
  });
