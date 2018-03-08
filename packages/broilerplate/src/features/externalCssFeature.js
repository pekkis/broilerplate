const { OrderedSet, List } = require("immutable");
const baseFeature = require("../baseFeature");

module.exports = {
  ...baseFeature,
  name: () => "externalCssFeature",
  loaders: () => OrderedSet.of("externalcssLoader")
};
