const path = require("path");
const isString = require("lodash/isString");
const isArray = require("lodash/isArray");
const { fromJS } = require("immutable");

const getFeatures = (env, target, paths, specs) => {
  // TODO: recursive adding of features by feature?
  return specs.map(s => getFeature(s));
};

const getObjectFromSpec = directory => spec => {
  if (isString(spec)) {
    const func = require(path.resolve(__dirname, directory, spec));
    return func();
  }

  if (isArray(spec)) {
    const func = require(path.resolve(__dirname, directory, spec[0]));
    return func(spec[1]);
  }

  return spec;
};

const getLoader = getObjectFromSpec("loaders");
const getFeature = getObjectFromSpec("features");
const getPlugin = getObjectFromSpec("plugins");

const buildLoader = (env, target, paths, options, loader) => {
  const opts = loader.options(env, target, paths, options);
  return loader.post ? loader.post(env, target, opts) : opts;
};

const buildPlugin = (env, target, paths, options, plugin) => {
  const opts = plugin.options(env, target, paths, options).toJS();
  return plugin.plugin(opts);
};

const getEntry = (env, target) => {
  return target === "client" ? "./client.js" : "./server.js";
};

const getFilename = (env, target) => {
  if (env === "development" || target === "server") {
    return "[name].js";
  }

  return "[name].[chunkhash].js";
};

const getDefaultBaseConfig = (env, target, paths) => {
  let baseConfig = fromJS({
    mode: env,

    // devtool: env === "development" ? "#eval-source-map" : "source-map",
    context: paths.get("src"),
    module: {
      rules: []
    },
    externals: [],
    resolve: {
      modules: [paths.get("src"), paths.get("modules")],
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    entry: {
      [target]: [getEntry(env, target)]
    },

    output: {
      path: paths.get("build"),
      publicPath: "/",
      filename: getFilename(env, target),
      devtoolModuleFilenameTemplate: "/[absolute-resource-path]"
    },

    optimization: {},

    plugins: []
  });

  if (target !== "server") {
    return baseConfig.setIn(
      ["optimization", "splitChunks"],
      fromJS({
        cacheGroups: {
          commons: {
            chunks: "initial",
            minChunks: 2,
            maxInitialRequests: 5, // The default limit is too small to showcase the effect
            minSize: 0 // This is example is too small to create commons chunks
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      })
    );
  }

  return baseConfig
    .setIn(["optimization", "minimize"], false)
    .set("target", "node")
    .setIn(["output", "library"], "app")
    .setIn(["output", "libraryTarget"], "commonjs2");
};

module.exports = {
  getFeatures,
  getPlugin,
  getFeature,
  getLoader,
  getDefaultBaseConfig,
  buildLoader,
  buildPlugin
};
