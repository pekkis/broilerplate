const { fromJS } = require("immutable");
const { createLoader } = require("../extend");
const babelOptions = require("./babelOptions");

module.exports = config =>
  createLoader({
    name: () => "babelLoader",
    options: (env, target, paths, options) => {
      return fromJS({
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: babelOptions(env, target, paths, options)
          }
        ],
        exclude: [paths.get("modules")]
      });
    }
  });
