const { OrderedSet } = require("immutable");
const baseFeature = require("../baseFeature");
const name = "extractCssFeature";

const ExtractTextPlugin = require("extract-text-webpack-plugin");

const createStyleLoader = (env, target, options) => {
  if (target === "server") {
    return options;
  }

  if (env === "development") {
    return options;
  }

  options = options.update("use", u => u.shift());
  return options.update("use", u =>
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: u.toJS()
    })
  );
};

module.exports = {
  ...baseFeature,
  name: () => name,
  plugins: () => OrderedSet.of("cssExtractPlugin"),
  overrideLoader: (loader, env, target, paths) => {
    if (!loader.supportedFeatures().includes(name)) {
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
