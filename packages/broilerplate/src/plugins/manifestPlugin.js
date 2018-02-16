const Plugin = require("webpack-manifest-plugin");
const { List, Map } = require("immutable");

module.exports = {
  isEnabled: (env, target) => target === "client",
  defaults: (env, target) =>
    List.of(
      Map({
        fileName: "manifest.json"
      })
    ),
  plugin: options => new Plugin(...options)
};
