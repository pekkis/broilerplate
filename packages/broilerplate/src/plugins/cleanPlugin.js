const { List, Map } = require("immutable");
const Plugin = require("clean-webpack-plugin");

module.exports = {
  name: () => "cleanPlugin",
  isEnabled: (env, target) => env === "production",
  options: (env, target, paths) =>
    List.of(
      List.of(target === "client" ? "dist" : "dist-server"),
      Map({
        root: paths.get("root")
      })
    ),
  plugin: options => new Plugin(...options)
};
