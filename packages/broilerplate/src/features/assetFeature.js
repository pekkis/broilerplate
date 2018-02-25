const { OrderedSet, List } = require("immutable");
const path = require("path");

module.exports = {
  name: () => "assetFeature",
  files: paths =>
    List.of({
      source: path.join(__dirname, "../../files/assetFeature"),
      target: path.join(paths.get("root"), "src/assets")
    }),
  plugins: () => OrderedSet.of("copyFilesPlugin"),
  loaders: () => OrderedSet.of("imageLoader", "fontLoader"),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
