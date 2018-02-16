const { List, Map } = require("immutable");
const Plugin = require("webpack").optimize.UglifyJsPlugin;

module.exports = {
  name: () => "uglifyPlugin",
  isEnabled: (env, target) => env === "production" && target === "client",
  defaults: (env, target, paths) =>
    List.of(
      Map({
        mangle: false,
        compress: {
          dead_code: true,
          unsafe: false,
          unused: false,
          hoist_vars: false,
          side_effects: false,
          global_defs: {}
        }
      })
    ),
  plugin: options => Plugin(...options)
};
