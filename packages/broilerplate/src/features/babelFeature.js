const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = createFeature({
  name: () => "babelFeature",
  loaders: () => OrderedSet.of("babelLoader")
});
