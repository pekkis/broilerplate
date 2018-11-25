const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "babelFeature",
    loaders: () => OrderedSet.of("babelLoader")
  });
