const { List, Map } = require("immutable");
const {
  getFeature,
  getDefaultBaseConfig,
  getLoader,
  getPlugin,
  buildPlugin,
  buildLoader
} = require("./configure");
const pipe = require("./pipe");
const getDefaultPaths = require("./defaultPaths");
const path = require("path");

const copy = require("./copy");

const { STATUS_UNCOMPILED, STATUS_COMPILED } = require("./buildStatuses");

const empty = build => {
  return Map({
    status: STATUS_UNCOMPILED,
    paths: Map(),
    options: Map({
      debug: false
    }),
    loaders: List(),
    features: List(),
    plugins: List()
  });
};

const defaultBaseConfig = (env, target) => build => {
  return build.set(
    "base",
    getDefaultBaseConfig(env, target, build.get("paths"))
  );
};

const toJS = build => build.toJS();

const run = build => {
  const env = build.get("env");
  const target = build.get("target");
  const paths = build.get("paths");
  const options = build.get("options", Map());
  const base = build.get("base");
  const loaders = build.get("loaders");
  const plugins = build.get("plugins");

  return base
    .setIn(
      ["module", "rules"],
      loaders.map(l => buildLoader(env, target, paths, options, l))
    )
    .set(
      "plugins",
      plugins.map(p => buildPlugin(env, target, paths, options, p))
    );
};

const compile = (env, target) => build => {
  const features = build.get("features");

  const loaders = features
    .reduce(
      (loaders, f) => loaders.concat(f.loaders()),
      build.get("loaders", List())
    )
    .map(l => getLoader(l))
    .filterNot(l => build.get("removedLoaders", List()).includes(l.name()))
    .filter(l => l.isEnabled(env, target))
    .map(l => features.reduce((l, f) => f.overrideLoader(l), l));

  const plugins = features
    .reduce(
      (plugins, f) => plugins.concat(f.plugins()),
      build.get("plugins", List())
    )
    .map(p => getPlugin(p))
    .filterNot(p => build.get("removedPlugins", List()).includes(p.name()))
    .filter(p => p.isEnabled(env, target))
    .map(p => features.reduce((p, f) => f.overridePlugin(p), p));

  const base = features.reduce(
    (c, f) => f.overrideBase(c, env, target, build.get("paths")),
    build.get("base")
  );

  return build
    .set("env", env)
    .set("target", target)
    .set("base", base)
    .set("plugins", plugins)
    .set("loaders", loaders)
    .set("status", STATUS_COMPILED);
};

const override = overridesPath => build => {
  const overrides = require(overridesPath);

  const env = build.get("env");
  const target = build.get("target");
  const paths = build.get("paths");
  const base = build.get("base");
  const loaders = build.get("loaders", List());
  const plugins = build.get("plugins", List());
  const options = build.get("options", Map());

  const { overrideLoader, overridePlugin, overrideBase } = overrides;

  const overriddenLoaders = loaders.map(l =>
    overrideLoader(l, env, target, paths, options)
  );
  const overriddenPlugins = plugins.map(p =>
    overridePlugin(p, env, target, paths, options)
  );

  const overriddenBase = overrideBase(base, env, target, paths, options);

  return build
    .set("plugins", overriddenPlugins)
    .set("loaders", overriddenLoaders)
    .set("base", overriddenBase);
};

const ensureFiles = (force = false) => build => {
  const paths = build.get("paths");
  const files = build.get("features").reduce(
    (r, f) => r.concat(f.files(paths)),
    List.of(
      {
        source: path.join(__dirname, "../files/.browserslistrc"),
        target: path.join(paths.get("root"), ".browserslistrc")
      },
      {
        source: path.join(__dirname, "../files/overrides.js"),
        target: path.join(paths.get("root"), "./src/config/overrides.js")
      },
      {
        source: path.join(__dirname, "../files/.env.example"),
        target: path.join(paths.get("root"), ".env.example")
      },
      {
        source: path.join(__dirname, "../files/.env.example"),
        target: path.join(paths.get("root"), ".env")
      },
      {
        source: path.join(__dirname, "../files/git_ignore"),
        target: path.join(paths.get("root"), ".gitignore")
      }
    )
  );

  files.forEach(f => {
    const { source, target } = f;
    copy(source, target, force);
  });

  return build.update("files", List(), f => f.concat(files));
};

const defaultPaths = (env, target, dirname) => build => {
  return build.set("paths", getDefaultPaths(env, target, dirname));
};

const mergePaths = extraPaths => build => {
  return build.update("paths", Map(), paths => paths.merge(extraPaths));
};

const mergeOptions = extraOptions => build => {
  return build.update("options", Map(), options => options.merge(extraOptions));
};

const addFeatures = (...features) => pipe(...features.map(addFeature));

const addFeature = feature => build => {
  return build.update("features", features =>
    features.push(getFeature(feature))
  );
};

const removeFeatures = (...features) => pipe(...features.map(removeFeature));

const removeFeature = featureName => build => {
  return build.update("features", features =>
    features.filterNot(f => f.name() === featureName)
  );
};

const removePlugins = (...plugins) => pipe(...plugins.map(removePlugin));

const removePlugin = plugin => build => {
  return build.update("removedPlugins", List(), rp => rp.push(plugin));
};

const removeLoaders = (...loaders) => pipe(...loaders.map(removeLoader));

const removeLoader = loader => build => {
  return build.update("removedLoaders", List(), rl => rl.push(loader));
};

const defaultFeatures = build => {
  return build.set(
    "features",
    List.of(
      "babelFeature",
      "basicDevelopmentFeature",
      "cleanDirectoriesFeature",
      "environmentVariablesFeature",
      "clientRenderFeature",
      "serverRenderFeature",
      "externalCssFeature",
      "assetFeature",
      "mjsFeature",
      "uglifyFeature"
    ).map(getFeature)
  );
};

module.exports = {
  pipe,
  ensureFiles,
  defaultBaseConfig,
  empty,
  defaultFeatures,
  mergePaths,
  mergeOptions,
  defaultPaths,
  addFeature,
  addFeatures,
  removeFeatures,
  removeFeature,
  removeLoader,
  removePlugin,
  removeLoaders,
  removePlugins,
  override,
  compile,
  run,
  toJS
};
