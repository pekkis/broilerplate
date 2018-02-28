const { OrderedSet, List } = require("immutable");
const path = require("path");
const ServiceWorkerWebpackPlugin = require("@dr-kobros/serviceworker-webpack-plugin")
  .default;

module.exports = {
  name: () => "serviceWorkerFeature",
  files: paths =>
    List.of({
      source: path.join(__dirname, "../files/sw.js"),
      target: path.join(paths.get("root"), "src/sw.js")
    }),
  plugins: () =>
    OrderedSet.of({
      name: () => "serviceWorkerPlugin",
      isEnabled: (env, target) => target === "client",
      defaults: (env, target, paths) =>
        List.of(
          Map({
            entry: "sw.js"
          })
        ),
      plugin: options => new ServiceWorkerWebpackPlugin(...options)
    }),
  loaders: () => OrderedSet.of(),
  overrideLoader: (loader, env, target, paths) => loader,
  overridePlugin: (plugin, env, target, paths) => plugin,
  overrideWebpackConfiguration: (values, env, target, paths) => values
};
