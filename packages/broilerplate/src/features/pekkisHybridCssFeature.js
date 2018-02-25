const { OrderedSet, List } = require("immutable");

module.exports = {
  name: () => "pekkisHybridCssFeature",
  files: paths => List(),
  plugins: () => OrderedSet.of("cssExtractPlugin"),
  loaders: () => OrderedSet.of("postcssLoader", "externalcssLoader"),
  overrideLoader: (loader, env, target, paths) => {
    switch (loader.name()) {
      case "babelLoader":
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

      default:
        return loader;
    }
  },
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
