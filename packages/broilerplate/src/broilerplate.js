const { OrderedSet, List } = require("immutable");
const {
  configureLoader,
  isLoaderEnabled,
  configurePlugin,
  getFeatures,
  isPluginEnabled,
  configureWebpack
} = require("./configure");

const createStyleLoader = require("./createStyleLoader");
const defaultPaths = require("./defaultPaths");

const broilerplate = (env, target, paths, overrides) => {
  let features = OrderedSet.of(
    "babelFeature",
    // "babelMinifyFeature",
    "basicDevelopmentFeature",
    "basicOptimizationFeature",
    "clientRenderFeature",
    "serverRenderFeature",
    "codeSplittingFeature",
    "pekkisHybridCssFeature",
    "assetFeature",
    "manifestFeature"
  );

  let loaders = OrderedSet.of();
  let plugins = OrderedSet.of();

  let removedLoaders = OrderedSet.of();
  let removedPlugins = OrderedSet.of();

  const broilerplate = {
    removePlugin: plugin => {
      removedPlugins = removedPlugins.add(plugin);
      return broilerplate;
    },

    removeLoader: loader => {
      removedLoaders = removedLoaders.add(loader);
      return broilerplate;
    },

    addFeature: feature => {
      features = features.add(feature);
      return broilerplate;
    },

    removeFeature: feature => {
      features = features.filterNot(f => f === feature);
      return broilerplate;
    },

    run: () => {
      const {
        overrideLoader,
        overridePlugin,
        overrideWebpackConfiguration
      } = overrides;

      features = getFeatures(env, target, paths, features);

      loaders = features
        .reduce((loaders, f) => loaders.concat(f.loaders()), loaders)
        .subtract(removedLoaders);

      plugins = features
        .reduce((plugins, f) => plugins.concat(f.plugins()), plugins)
        .subtract(removedPlugins);

      const overrideForLoaders = List.of(
        overrideLoader,
        (values, env, target, paths, name) =>
          features.reduce(
            (r, f) => f.overrideLoader(r, env, target, paths, name),
            values
          )
      );

      const overrideForPlugins = List.of(
        overridePlugin,
        (values, env, target, paths, name) =>
          features.reduce(
            (r, f) => f.overridePlugin(r, env, target, paths, name),
            values
          )
      );

      const overrideForWebpack = List.of(
        overrideWebpackConfiguration,
        (values, env, target, paths, name) =>
          features.reduce(
            (r, f) =>
              f.overrideWebpackConfiguration(r, env, target, paths, name),
            values
          )
      );

      const runLoaders = loaders
        .filter(l => isLoaderEnabled(env, target, l))
        .map(l => configureLoader(env, target, paths, l, overrideForLoaders))
        .map(config => config.toJS());

      const runPlugins = plugins
        .filter(p => isPluginEnabled(env, target, p))
        .map(p => configurePlugin(env, target, paths, p, overrideForPlugins));

      const config = overrideForWebpack.reduce(
        (v, o) => o(v, env, target, paths),
        configureWebpack(env, target, paths, runLoaders, runPlugins)
      );

      /*
      const config = overrideWebpackConfiguration(
        env,
        target,
        paths,
        configureWebpack(env, target, paths, runLoaders, runPlugins)
      );
      */

      return config.toJS();
    }
  };

  return broilerplate;
};

module.exports = {
  broilerplate,
  createStyleLoader,
  defaultPaths
};
