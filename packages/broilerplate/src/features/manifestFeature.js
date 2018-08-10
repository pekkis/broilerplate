const { OrderedSet } = require("immutable");
const { createFeature } = require("../extend");

module.exports = createFeature({
  name: () => "manifestFeature",
  plugins: () => OrderedSet.of("manifestPlugin")
});
