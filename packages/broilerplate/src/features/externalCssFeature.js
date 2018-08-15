const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = createFeature({
  name: () => "externalCssFeature",
  loaders: () => OrderedSet.of("externalCssLoader")
});
