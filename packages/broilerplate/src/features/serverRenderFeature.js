const { OrderedSet, List } = require("immutable");
const path = require("path");

// const nodeExternals = require("webpack-node-externals");

module.exports = {
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
    ),
  plugins: () => OrderedSet.of(),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideBase: (values, env, target, paths, key) => {
    return values;
    // TODO: why dis not work with font-awesome (dep of dep, maybe)
    /*
    if (target === "client") {
      return values;
    }
    return values.update("externals", e =>
      e.push(
        nodeExternals({
          whitelist: [/\.(?!(?:jsx?|json)$).{1,5}$/i]
        })
      )
    );
    */
  }
};
