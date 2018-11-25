const { List, Map } = require("immutable");
const webpack = require("webpack");
const { getEnvironmentVariables } = require("../env");
const { createPlugin } = require("../extend");

module.exports = config =>
  createPlugin(webpack.DefinePlugin)({
    name: () => "definePlugin",
    options: env =>
      List.of(
        Map({
          __DEVELOPMENT__: env === "development",
          "process.env": getEnvironmentVariables()
        })
      )
  });
