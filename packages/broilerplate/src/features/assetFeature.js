const { OrderedSet, List } = require("immutable");
const path = require("path");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "assetFeature",
    files: paths =>
      List.of({
        source: path.join(__dirname, "../../files/assetFeature"),
        target: path.join(paths.get("root"), "src/assets")
      }),
    plugins: () => OrderedSet.of("copyFilesPlugin"),
    loaders: () => OrderedSet.of("imageLoader", "fontLoader")
  });
