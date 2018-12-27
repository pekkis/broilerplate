const { List, Map } = require("immutable");
const { createFeature } = require("../extend");

const plugin = require("../plugins/definePlugin");

const defaultConfig = Map({
  filter: (v, k) => {
    return k === "NODE_ENV" || k.startsWith("REACT_APP_");
  }
});

module.exports = (config = defaultConfig) =>
  createFeature({
    name: () => "environmentVariablesFeature",
    plugins: () => List.of(plugin(config))
  });
