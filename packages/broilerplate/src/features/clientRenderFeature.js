const { OrderedSet, List } = require("immutable");
const path = require("path");

module.exports = {
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
  plugins: () => OrderedSet.of("htmlPlugin"),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths) => values
};
