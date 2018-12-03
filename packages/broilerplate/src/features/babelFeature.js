const { List } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "babelFeature",
    loaders: () => List.of("babelLoader")
  });
