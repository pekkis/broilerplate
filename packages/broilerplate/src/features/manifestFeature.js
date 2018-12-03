const { List } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "manifestFeature",
    plugins: () => List.of("manifestPlugin")
  });
