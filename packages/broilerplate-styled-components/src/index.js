const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "styledComponentsFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of(),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => {
    if (loader.name() !== "babelLoader") {
      return loader;
    }

    return {
      ...loader,
      options: (env, target, paths) =>
        loader
          .options(env, target, paths)
          .updateIn(["use", 0, "options", "plugins"], p =>
            p.push([
              "babel-plugin-styled-components",
              {
                ssr: true
              }
            ])
          )
    };
  },
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
