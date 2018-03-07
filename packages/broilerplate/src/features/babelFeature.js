const baseFeature = require("../baseFeature");
const { OrderedSet } = require("immutable");

module.exports = {
  ...baseFeature,
  name: () => "babelFeature",
  loaders: () => OrderedSet.of("babelLoader")
};
