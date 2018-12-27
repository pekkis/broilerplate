const { List, Map } = require("immutable");
const { createFeature } = require("../extend");

const plugin = require("../plugins/cleanPlugin");

module.exports = config =>
  createFeature({
    name: () => "cleanDirectoriesFeature",
    plugins: () => List.of(plugin(config))
  });
