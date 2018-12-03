const path = require("path");
const fs = require("fs");
const { fromJS } = require("immutable");
const { createLoader } = require("../extend");

const getBrowsers = root => {
  const browserFile = fs.readFileSync(path.resolve(root, ".browserslistrc"), {
    encoding: "utf-8"
  });
  return browserFile
    .split("\n")
    .map(b => b.trim())
    .filter(b => b);
};

const getTargets = (env, target, paths) => {
  if (target === "client") {
    return {
      browsers: getBrowsers(paths.get("root"))
    };
  }

  return {
    node: "current"
  };
};

module.exports = config =>
  createLoader({
    name: () => "babelLoader",
    options: (env, target, paths, options) => {
      return fromJS({
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              babelrc: false,
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: options.get("debug", false),
                    useBuiltIns: "usage",
                    targets: getTargets(env, target, paths),
                    modules: false
                  }
                ]
              ],
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-transform-flow-strip-types",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-transform-react-jsx"
              ]
            }
          }
        ],
        exclude: [paths.get("modules")]
      });
    }
  });
