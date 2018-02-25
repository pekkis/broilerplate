const { List, fromJS } = require("immutable");
const webpack = require("webpack");
const Plugin = webpack.optimize.CommonsChunkPlugin;

module.exports = {
  name: () => "vendorBundlePlugin",
  isEnabled: (env, target) => target === "client",
  options: (env, target, paths) =>
    List.of(
      fromJS({
        name: "vendor",
        filename: env === "production" ? "vendor.[chunkhash].js" : "vendor.js",
        minChunks: (module, count) => {
          var context = module.context;
          return context && context.indexOf("node_modules") >= 0;
        }
      })
    ),
  plugin: options => new Plugin(...options)
};
