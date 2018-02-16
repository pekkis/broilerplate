const ExtractTextPlugin = require("extract-text-webpack-plugin");

const createStyleLoader = (env, target, options) => {
  if (target === "server") {
    return options;
  }

  if (env === "development") {
    return options.update("use", u => u.unshift("style-loader"));
  }

  return options.update("use", u =>
    ExtractTextPlugin.extract({
      fallback: "style-loader",
      use: u.toJS()
    })
  );
};

module.exports = createStyleLoader;
