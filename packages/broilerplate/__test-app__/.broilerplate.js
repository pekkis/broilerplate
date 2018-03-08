const path = require("path");
const util = require("util");

const {
  pipe,
  empty,
  ensureFiles,
  defaultFeatures,
  addFeatures,
  mergePaths,
  mergeOptions,
  defaultPaths,
  removeFeature,
  defaultBaseConfig,
  compile,
  override,
  run,
  toJS
} = require("../src/broilerplate");
const nodeExternals = require("../src/features/nodeExternalsFeature");
const extractCss = require("../src/features/extractCssFeature");

const dotenv = require("dotenv");
dotenv.config();

const { Map } = require("immutable");

module.exports = target => {
  const env = process.env.NODE_ENV;

  const config = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    mergeOptions(
      Map({
        debug: false
      })
    ),
    mergePaths(
      Map({
        modules: path.resolve(__dirname, "../node_modules")
      })
    ),
    defaultBaseConfig(env, target),
    defaultFeatures,
    addFeatures(
      extractCss,
      "babelPolyfillFeature",
      nodeExternals({
        whitelist: [/^font-awesome/, /^react-fa/]
      })
    ),
    ensureFiles(false),
    compile(env, target),
    override(path.join(__dirname, "./src/config/overrides")),
    run,
    toJS
  )(Map());

  console.log("config", util.inspect(config, { depth: 666 }));
  // process.exit();

  return config;
};
