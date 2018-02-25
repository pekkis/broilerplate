const { OrderedSet, List } = require("immutable");
// const nodeExternals = require("webpack-node-externals");

module.exports = {
  name: () => "serverRenderFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of(),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths, key) => {
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
