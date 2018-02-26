const { List, OrderedSet, Map } = require("immutable");
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
    loaders: OrderedSet(),
    features: OrderedSet(),
    plugins: OrderedSet()
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
  const base = build.get("base");
  const loaders = build.get("loaders");
  const plugins = build.get("plugins");

  return base
    .setIn(
      ["module", "rules"],
      loaders.map(l => buildLoader(env, target, paths, l))
    )
    .set("plugins", plugins.map(p => buildPlugin(env, target, paths, p)));
};

const compile = (env, target) => build => {
  const features = build.get("features");

  const loaders = features
    .reduce(
      (loaders, f) => loaders.concat(f.loaders()),
      build.get("loaders", OrderedSet())
    )
    .map(l => getLoader(l))
    .filterNot(l =>
      build.get("removedLoaders", OrderedSet()).includes(l.name())
    )
    .filter(l => l.isEnabled(env, target))
    .map(l => features.reduce((l, f) => f.overrideLoader(l), l));

  const plugins = features
    .reduce(
      (plugins, f) => plugins.concat(f.plugins()),
      build.get("plugins", OrderedSet())
    )
    .map(p => getPlugin(p))
    .filterNot(p =>
      build.get("removedPlugins", OrderedSet()).includes(p.name())
    )
    .filter(p => p.isEnabled(env, target))
    .map(p => features.reduce((p, f) => f.overridePlugin(p), p));

  const base = features.reduce(
    (c, f) =>
      f.overrideWebpackConfiguration(c, env, target, build.get("paths")),
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
  const loaders = build.get("loaders", OrderedSet());
  const plugins = build.get("plugins", OrderedSet());

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

  const overriddenBase = overrideWebpackConfiguration(base, env, target, paths);

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

const addFeature = feature => build => {
  return build.update("features", features =>
    features.add(getFeature(feature))
  );
};

const removeFeature = featureName => build => {
  return build.update("features", features =>
    features.filterNot(f => f.name() === featureName)
  );
};

const removePlugins = (...plugins) => pipe(...plugins.map(removePlugin));

const removePlugin = plugin => build => {
  return build.update("removedPlugins", OrderedSet(), rp => rp.add(plugin));
};

const removeLoaders = (...loaders) => pipe(...loaders.map(removeLoader));

const removeLoader = loader => build => {
  return build.update("removedLoaders", OrderedSet(), rl => rl.add(loader));
};

const defaultFeatures = build => {
  return build.set(
    "features",
    OrderedSet.of(
      "babelFeature",
      "basicDevelopmentFeature",
      // "basicOptimizationFeature",
      "clientRenderFeature",
      "serverRenderFeature",
      // "codeSplittingFeature",
      "pekkisHybridCssFeature",
      "assetFeature",
      "manifestFeature"
      // "uglifyMinifyFeature"
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
  defaultPaths,
  addFeature,
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
