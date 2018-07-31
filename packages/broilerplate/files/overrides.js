const loaderOverrides = {
  babelLoader: (loader, env, target, paths, options) => {
    return loader;
  }
};

const pluginOverrides = {
  htmlPlugin: (plugin, env, target, paths, options) => {
    return plugin;
  }
};

const overrideLoader = (loader, env, target, paths, options) => {
  return loaderOverrides[loader.name()]
    ? loaderOverrides[loader.name()](loader, env, target, paths, options)
    : loader;
};

const overridePlugin = (plugin, env, target, paths, options) => {
  return pluginOverrides[plugin.name()]
    ? pluginOverrides[plugin.name()](plugin, env, target, paths, options)
    : plugin;
};

const overrideBase = (base, env, target, paths, options) => {
  return base;
};

module.exports = {
  overrideLoader,
  overridePlugin,
  overrideBase
};
