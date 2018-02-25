const { List, fromJS } = require("immutable");
const Plugin = require("copy-webpack-plugin");

module.exports = {
  name: () => "copyFilesPlugin",
  isEnabled: (env, target) => target === "client",
  options: (env, target, paths) =>
    List.of(fromJS([{ from: "assets/web", flatten: false }])),
  plugin: options => new Plugin(...options)
};
