const { List, Map } = require("immutable");
const webpack = require("webpack");
const { createPlugin } = require("../extend");

const defaultConfig = Map({
  filter: (v, k) => {
    return k === "NODE_ENV" || k.startsWith("REACT_APP_");
  }
});

module.exports = (config = defaultConfig) =>
  createPlugin(webpack.DefinePlugin)({
    name: () => "definePlugin",
    options: env =>
      List.of(
        Map({
          __DEVELOPMENT__: env === "development",
          "process.env": Map(process.env)
            .filter(config.get("filter"))
            .map((v, k) => JSON.stringify(v))
            .toJS()
        })
      )
  });
