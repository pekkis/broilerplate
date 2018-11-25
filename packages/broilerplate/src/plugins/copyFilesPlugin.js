const { List, fromJS } = require("immutable");
const Plugin = require("copy-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(Plugin)({
    name: () => "copyFilesPlugin",
    isEnabled: (env, target) => target === "client",
    options: () => List.of(fromJS([{ from: "assets/web", flatten: false }]))
  });
