const { List, Map } = require("immutable");
const Plugin = require("clean-webpack-plugin");

module.exports = {
  isEnabled: (env, target) => env === "production",
  defaults: (env, target, paths) =>
    List.of(
      List.of(target === "client" ? "dist" : "dist-server"),
      Map({
        root: paths.root
      })
    ),
  plugin: options => new Plugin(...options)
};
