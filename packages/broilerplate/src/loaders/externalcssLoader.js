const { fromJS, OrderedSet, List } = require("immutable");

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

module.exports = {
  name: () => "externalCssLoader",
  supportedFeatures: () => OrderedSet.of("extractCssFeature"),
  isEnabled: (env, target) => true,
  options: (env, target, paths) => {
    return fromJS({
      test: /\.css$/,
      include: [paths.get("modules")],
      use: getLoaders(target)
    });
  }
};
