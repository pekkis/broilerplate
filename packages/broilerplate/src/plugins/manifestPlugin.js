const Plugin = require("webpack-manifest-plugin");
const { List, Map } = require("immutable");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(Plugin)({
    name: () => "manifestPlugin",
    isEnabled: (env, target) => target === "client",
    options: () =>
      List.of(
        Map({
          fileName: "manifest.json"
        })
      )
  });
