const Plugin = require("case-sensitive-paths-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(Plugin)({
    name: () => "caseSensitivePathsPlugin",
    isEnabled: (env, target) => env === "development"
  });
