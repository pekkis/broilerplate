const { List, Map } = require("immutable");
const Plugin = require("stats-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = createPlugin(Plugin)({
  name: () => "statsPlugin",
  isEnabled: (env, target) => target === "client",
  options: () =>
    List.of(
      "stats.json",
      Map({
        chunkModules: true
      })
    )
});
