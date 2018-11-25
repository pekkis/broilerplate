const { List } = require("immutable");
const Plugin = require("react-dev-utils/WatchMissingNodeModulesPlugin");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(Plugin)({
    name: () => "watchMissingNodeModulesPlugin",
    isEnabled: (env, target) => env === "development",
    options: (env, target, paths) => List.of(paths.get("modules"))
  });
