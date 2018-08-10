const { OrderedSet, List } = require("immutable");
const path = require("path");
const { createFeature } = require("../extend");

module.exports = createFeature({
  name: () => "clientRenderFeature",
  files: paths =>
    List.of(
      {
        source: path.join(
          __dirname,
          "../../files/clientRenderFeature/client.js"
        ),
        target: path.join(paths.get("root"), "src/client.js")
      },
      {
        source: path.join(__dirname, "../../files/clientRenderFeature/Root.js"),
        target: path.join(paths.get("root"), "src/Root.js")
      }
    ),
  plugins: () => OrderedSet.of("htmlPlugin")
});
