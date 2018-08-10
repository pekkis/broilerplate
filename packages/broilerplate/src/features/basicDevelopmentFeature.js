const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = createFeature({
  name: () => "basicDevelopmentFeature",
  plugins: () =>
    OrderedSet.of(
      "caseSensitivePathsPlugin",
      "definePlugin",
      "statsPlugin",
      "cleanPlugin"
    )
});
