const { List } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "basicOptimizationFeature",
    plugins: () => List.of("occurrenceOrderPlugin", "moduleConcatenationPlugin")
  });
