const { OrderedSet, List } = require("immutable");
const {
  configureLoader,
  isLoaderEnabled,
  configurePlugin,
  getFeatures,
  getFeature,
  isPluginEnabled,
  buildPlugin,
  buildLoader,
  getPlugin,
  getLoader,
  baseConfig
} = require("./configure");

const path = require("path");
const fs = require("fs-extra");

const createStyleLoader = require("./createStyleLoader");
const defaultPaths = require("./defaultPaths");

const broilerplate = paths => {
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
  ).map(getFeature);

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
      _features = _features.add(getFeature(feature));
      return broilerplate;
    },

    removeFeature: feature => {
      _features = _features.filterNot(f => f === feature);
      return broilerplate;
    },

    getFeatures: () => _features,

    init: (force = false) => {
      const files = broilerplate.getFeatures().reduce(
        (r, f) => r.concat(f.files(paths)),
        List.of(
          {
            source: path.join(__dirname, "files/.browserslistrc"),
            target: path.join(paths.root, ".browserslistrc")
          },
          {
            source: path.join(__dirname, "files/overrides.js"),
            target: path.join(paths.root, "src/config/overrides.js")
          }
        )
      );

      console.log("f", files.toJS());

      files.forEach(f => {
        const { source, target } = f;
        fs.ensureDirSync(path.dirname(target));

        console.log("tussihovi");
        fs.copySync(source, target);

        console.log("tussihovi");
      });

      return broilerplate;
    },

    build: (env, target) => {
      const features = getFeatures(env, target, paths, _features);

      const loaders = features
        .reduce((loaders, f) => loaders.concat(f.loaders()), _loaders)
        .map(l => getLoader(l))
        .filterNot(l => removedLoaders.includes(l.name()))
        .map(l => features.reduce((l, f) => f.overrideLoader(l), l));

      const plugins = features
        .reduce((plugins, f) => plugins.concat(f.plugins()), _plugins)
        .map(p => getPlugin(p))
        .filterNot(p => removedPlugins.includes(p.name()))
        .map(p => features.reduce((p, f) => f.overridePlugin(p), p));

      const base = features.reduce(
        (c, f) => f.overrideWebpackConfiguration(c, env, target, paths),
        baseConfig(env, target, paths)
      );

      return {
        env,
        target,
        features,
        loaders,
        plugins,
        base
      };
    },

    override: (build, overrides) => {
      const { env, target, features, loaders, plugins, base } = build;

      const {
        overrideLoader,
        overridePlugin,
        overrideWebpackConfiguration
      } = overrides;

      const overriddenLoaders = loaders.map(l =>
        overrideLoader(l, env, target, paths)
      );
      const overriddenPlugins = plugins.map(p =>
        overridePlugin(p, env, target, paths)
      );

      const overriddenBase = overrideWebpackConfiguration(
        base,
        env,
        target,
        paths
      );

      return {
        env,
        target,
        features,
        plugins: overriddenPlugins,
        loaders: overriddenLoaders,
        base: overriddenBase
      };
    },

    run: build => {
      const { plugins, base, loaders, env, target } = build;

      console.log(base, "beis");

      return base
        .setIn(
          ["module", "rules"],
          loaders.map(l => buildLoader(env, target, paths, l))
        )
        .set("plugins", plugins.map(p => buildPlugin(env, target, paths, p)));
    }
  };

  return broilerplate;
};

module.exports = {
  broilerplate,
  createStyleLoader,
  defaultPaths
};
