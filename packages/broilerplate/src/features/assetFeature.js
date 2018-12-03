const { List } = require("immutable");
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
    plugins: () => List.of("copyFilesPlugin"),
    loaders: () => List.of("imageLoader", "fontLoader")
  });
