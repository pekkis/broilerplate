const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");
const terserPlugin = require("../plugins/terserPlugin");

module.exports = config =>
  createFeature({
    name: () => "uglifyFeature",
    plugins: () => OrderedSet.of(terserPlugin(config))
  });
