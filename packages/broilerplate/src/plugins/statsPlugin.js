const { List, Map } = require("immutable");
const Plugin = require("stats-webpack-plugin");

module.exports = {
  name: () => "statsPlugin",
  isEnabled: (env, target) => target === "client",
  defaults: (env, target, paths) =>
    List.of(
      "stats.json",
      Map({
        chunkModules: true
      })
    ),
  plugin: options => new Plugin(...options)
};
