const { List } = require("immutable");
const path = require("path");
const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "serverRenderFeature",
    files: paths =>
      List.of(
        {
          source: path.join(
            __dirname,
            "../../files/serverRenderFeature/index.js"
          ),
          target: path.join(paths.get("root"), "src/index.js")
        },
        {
          source: path.join(
            __dirname,
            "../../files/serverRenderFeature/server.js"
          ),
          target: path.join(paths.get("root"), "src/server.js")
        },
        {
          source: path.join(
            __dirname,
            "../../files/serverRenderFeature/template.js"
          ),
          target: path.join(paths.get("root"), "src/config/template.js")
        }
      )
  });
