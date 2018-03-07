const { OrderedSet, List, Map } = require("immutable");
const path = require("path");
const ServiceWorkerWebpackPlugin = require("@dr-kobros/serviceworker-webpack-plugin");
const baseFeature = require("@dr-kobros/broilerplate/lib/baseFeature");

module.exports = {
  ...baseFeature,
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
      options: (env, target, paths) =>
        List.of(
          Map({
            entry: "sw.js"
          })
        ),
      plugin: options => new ServiceWorkerWebpackPlugin(...options)
    })
};
