const { List, Map } = require("immutable");
const Plugin = require("clean-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = createPlugin(Plugin)({
  name: () => "cleanPlugin",
  isEnabled: env => env === "production",
  options: (env, target, paths) =>
    List.of(
      List.of(target === "client" ? "dist" : "dist-server"),
      Map({
        root: paths.get("root")
      })
    )
});
