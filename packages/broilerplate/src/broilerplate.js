const { OrderedSet, List } = require("immutable");
const {
  configureLoader,
  isLoaderEnabled,
  configurePlugin,
  getFeatures,
  isPluginEnabled,
  configureWebpack,
  getPlugin,
  getLoader
} = require("./configure");

const createStyleLoader = require("./createStyleLoader");
const defaultPaths = require("./defaultPaths");

const broilerplate = (env, target, paths, overrides) => {
  let _features = OrderedSet.of(
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

  let _loaders = OrderedSet.of();
  let _plugins = OrderedSet.of();

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
      _features = _features.add(feature);
      return broilerplate;
    },

    removeFeature: feature => {
      _features = _features.filterNot(f => f === feature);
      return broilerplate;
    },

    build: () => {
      const features = getFeatures(env, target, paths, _features);

      const loaders = features
        .reduce((loaders, f) => loaders.concat(f.loaders()), _loaders)
        .map(l => getLoader(l))
        .filterNot(l => removedLoaders.includes(l.name()));

      const plugins = features
        .reduce((plugins, f) => plugins.concat(f.plugins()), _plugins)
        .map(p => getPlugin(p))
        .filterNot(p => removedPlugins.includes(p.name()));

      return {
        features,
        loaders,
        plugins
      };
    },

    run: () => {
      const { features, loaders, plugins } = broilerplate.build();

      const {
        overrideLoader,
        overridePlugin,
        overrideWebpackConfiguration
      } = overrides;

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
