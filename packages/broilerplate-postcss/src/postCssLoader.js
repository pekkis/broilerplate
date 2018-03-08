const { fromJS, OrderedSet } = require("immutable");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

module.exports = {
  name: () => "postCssLoader",
  isEnabled: (env, target) => true,
  supportedFeatures: () => OrderedSet.of("extractCssFeature"),
  options: (env, target, paths) => {
    return fromJS({
      include: [paths.get("src")],
      test: /\.p?css$/,
      use: [
        "style-loader",
        {
          loader: getLoader(target),
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: "[name]__[local]__[hash:base64:5]"
          }
        },
        {
          loader: "postcss-loader"
        }
      ]
    });
  }
};
