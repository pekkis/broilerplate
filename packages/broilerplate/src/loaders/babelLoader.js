const path = require("path");
const fs = require("fs");
const { fromJS } = require("immutable");

const getBrowsers = root => {
  const browserFile = fs.readFileSync(path.resolve(root, ".browserslistrc"), {
    encoding: "utf-8"
  });
  return browserFile.split("\n").map(b => b.trim()).filter(b => b);
};

const getTargets = (env, target, paths) => {
  if (target === "client") {
    return {
      browsers: getBrowsers(paths.root)
    };
  }

  return {
    node: "current"
  };
};

module.exports = {
  name: () => "babelLoader",
  isEnabled: (env, target) => true,
  options: (env, target, paths) => {
    console.log(env, target, paths, "pooopppa");

    return fromJS({
      test: /\.jsx?$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            babelrc: false,
            presets: [
              [
                "env",
                {
                  debug: false, // env === "development",
                  useBuiltIns: "entry",
                  targets: getTargets(env, target, paths),
                  modules: false
                }
              ]
            ],
            plugins: [
              "syntax-dynamic-import",
              "babel-plugin-transform-flow-strip-types",
              "babel-plugin-transform-class-properties",
              "babel-plugin-transform-object-rest-spread",
              "babel-plugin-transform-decorators",
              "babel-plugin-transform-react-jsx"
            ]
          }
        }
      ],
      exclude: [paths.modules]
    });
  }
};
