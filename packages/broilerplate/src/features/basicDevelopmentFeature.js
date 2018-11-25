const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "basicDevelopmentFeature",
    plugins: () =>
      OrderedSet.of(
        "caseSensitivePathsPlugin",
        "definePlugin",
        "statsPlugin",
        "cleanPlugin"
      )
  });
