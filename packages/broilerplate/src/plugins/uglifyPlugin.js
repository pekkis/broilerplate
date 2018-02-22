const { List, fromJS } = require("immutable");
const UglifyPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  name: () => "uglifyPlugin",
  isEnabled: (env, target) => env === "production" && target === "client",
  defaults: (env, target, paths) =>
    List.of(
      fromJS({
        cache: true,
        parallel: true,
        uglifyOptions: {
          mangle: true,
          compress: true
        }
      })
    ),
  plugin: options => new UglifyPlugin(...options)
};
