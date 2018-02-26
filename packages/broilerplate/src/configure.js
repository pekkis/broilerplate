const path = require("path");
const isString = require("lodash.isstring");
const isFunction = require("lodash.isfunction");
const { fromJS, List } = require("immutable");

const defaultPlugin = {
  options: () => List.of(undefined),
  plugin: () => {
    throw new Error("Can not instantiate plugin");
  },
  isEnabled: () => true
};

const getFeatures = (env, target, paths, specs) => {
  // TODO: recursive adding of features by feature?
  return specs.map(s => getFeature(s));
};

const getObjectFromSpec = directory => spec => {
  if (isString(spec)) {
    return require(path.resolve(__dirname, directory, spec));
  }

  return spec;
};

const getLoader = getObjectFromSpec("loaders");
const getFeature = getObjectFromSpec("features");

const getPlugin = (...specs) => {
  if (specs.length > 1 || isFunction(specs[0])) {
    const [plugin, isEnabled, options] = specs;
    return {
      plugin: plugin || defaultPlugin.plugin,
      isEnabled: isEnabled || defaultPlugin.isEnabled,
      options: options || defaultPlugin.options
    };
  }

  const [spec] = specs;

  if (isString(spec)) {
    const plugin = require(path.resolve(__dirname, "plugins", spec));
    return {
      ...defaultPlugin,
      ...plugin
    };
  }

  return {
    ...defaultPlugin,
    ...spec
  };
};

const buildLoader = (env, target, paths, loader) => {
  return loader.post
    ? loader.post(env, target, loader.options(env, target, paths))
    : loader.options(env, target, paths);
};

const buildPlugin = (env, target, paths, plugin) => {
  return plugin.plugin(plugin.options(env, target, paths).toJS());
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
      extensions: [".js", ".jsx"]
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
