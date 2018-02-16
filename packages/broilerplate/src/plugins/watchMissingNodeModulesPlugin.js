const { List } = require("immutable");
const Plugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");

module.exports = {
  name: () => "watchMissingNodeModulesPlugin",
  isEnabled: (env, target) => env === "development",
  defaults: (env, target, paths) => List.of(paths.modules),
  plugin: options => new Plugin(options)
};
