const { OrderedSet, List } = require("immutable");

const createLoader = loader => {
  return {
    isEnabled: (env, target) => true,
    supportedFeatures: () => OrderedSet.of(),
    ...loader
  };
};

const createFeature = feature => {
  return {
    files: paths => List.of(),
    plugins: () => OrderedSet.of(),
    loaders: () => OrderedSet.of(),
    overrideLoader: loader => loader,
    overridePlugin: plugin => plugin,
    overrideBase: base => base,
    ...feature
  };
};

const createPlugin = WebpackPlugin => plugin => {
  return {
    isEnabled: () => true,
    options: () => List.of(undefined),
    ...plugin,
    plugin: options => new WebpackPlugin(...options)
  };
};

module.exports = {
  createLoader,
  createFeature,
  createPlugin
};
