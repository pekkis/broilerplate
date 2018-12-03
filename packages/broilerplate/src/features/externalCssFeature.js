const { List } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "externalCssFeature",
    loaders: () => List.of("externalCssLoader")
  });
