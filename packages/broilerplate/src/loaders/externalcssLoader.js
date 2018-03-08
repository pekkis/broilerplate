const { fromJS, OrderedSet } = require("immutable");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

module.exports = {
  name: () => "externalCssLoader",
  supportedFeatures: () => OrderedSet.of("extractCssFeature"),
  isEnabled: (env, target) => true,
  options: (env, target, paths) => {
    return fromJS({
      test: /\.css$/,
      include: [paths.get("modules")],
      use: [
        "style-loader",
        {
          loader: getLoader(target),
          options: {
            modules: false,
            importLoaders: 2
          }
        }
      ]
    });
  }
};
