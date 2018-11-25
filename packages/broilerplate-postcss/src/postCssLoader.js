const { fromJS, OrderedSet, List } = require("immutable");
const { createLoader } = require("@dr-kobros/broilerplate/lib/extend");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

const getLoaders = target => {
  let loaders = List.of(
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
  );
  return target === "server" ? loaders : loaders.unshift("style-loader");
};

module.exports = config =>
  createLoader({
    name: () => "postCssLoader",
    supportedFeatures: () => OrderedSet.of("extractCssFeature"),
    options: (env, target, paths) => {
      return fromJS({
        include: [paths.get("src")],
        test: /\.p?css$/,
        use: getLoaders(target)
      });
    }
  });
