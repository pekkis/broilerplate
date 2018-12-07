const { List, Map } = require("immutable");
const { createFeature } = require("../extend");

const plugin = require("../plugins/manifestPlugin");

const defaultConfig = Map({
  fileName: "manifest.json"
});

module.exports = (config = Map()) =>
  createFeature({
    name: () => "manifestFeature",
    plugins: () => List.of(plugin(defaultConfig.merge(config)))
  });
