const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "manifestFeature",
    plugins: () => OrderedSet.of("manifestPlugin")
  });
