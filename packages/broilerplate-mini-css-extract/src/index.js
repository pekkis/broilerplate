const { OrderedSet, Map, List } = require("immutable");
const baseFeature = require("@dr-kobros/broilerplate/lib/baseFeature");
const Plugin = require("mini-css-extract-plugin");

const plugin = {
  name: () => "miniCssExtractPlugin",
  isEnabled: (env, target) => env === "production",
  options: (env, target, paths) =>
    List.of(
      Map({
        filename: "[name].[chunkhash].css",
        chunkFilename: "[id].[chunkhash].css"
      })
    ),
  plugin: options => new Plugin(...options)
};

const createStyleLoader = (env, target, options) => {
  if (target === "server") {
    return options;
  }

  if (env === "development") {
    return options;
  }

  options = options.update("use", u => u.shift());
  return options.update("use", u => u.unshift(Plugin.loader));
};

module.exports = {
  ...baseFeature,
  name: () => "miniCssExtractCssFeature",
  plugins: () => OrderedSet.of(plugin),
  overrideLoader: (loader, env, target, paths) => {
    if (!loader.supportedFeatures().includes("extractCssFeature")) {
      return loader;
    }

    return {
      ...loader,
      options: (env, target, path, options) =>
        createStyleLoader(
          env,
          target,
          loader.options(env, target, path, options)
        )
    };
  }
};
