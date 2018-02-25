const Plugin = require("webpack-manifest-plugin");
const { List, Map } = require("immutable");

module.exports = {
  name: () => "manifestPlugin",
  isEnabled: (env, target) => target === "client",
  options: (env, target) =>
    List.of(
      Map({
        fileName: "manifest.json"
      })
    ),
  plugin: options => new Plugin(...options)
};
