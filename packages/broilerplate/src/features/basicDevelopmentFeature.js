const { List } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "basicDevelopmentFeature",
    plugins: () => List.of("caseSensitivePathsPlugin", "statsPlugin")
  });
