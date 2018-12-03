const { fromJS, List } = require("immutable");
const { createLoader } = require("../extend");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

const getLoaders = target => {
  let loaders = List.of({
    loader: getLoader(target),
    options: {
      modules: false,
      importLoaders: 2
    }
  });
  return target === "server" ? loaders : loaders.unshift("style-loader");
};

module.exports = config =>
  createLoader({
    name: () => "externalCssLoader",
    supportedFeatures: () => List.of("extractCssFeature"),
    options: (env, target, paths) => {
      return fromJS({
        test: /\.css$/,
        include: [paths.get("modules")],
        use: getLoaders(target)
      });
    }
  });
