const { OrderedSet, Map, List } = require("immutable");
const {
  createFeature,
  createPlugin
} = require("@dr-kobros/broilerplate/lib/extend");

const Plugin = require("mini-css-extract-plugin");

const plugin = createPlugin(Plugin)({
  name: () => "miniCssExtractPlugin",
  isEnabled: env => env === "production",
  options: () =>
    List.of(
      Map({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].[contenthash].css"
      })
    )
});

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

module.exports = createFeature({
  name: () => "miniCssExtractCssFeature",
  plugins: () => OrderedSet.of(plugin),
  overrideLoader: loader => {
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
});
