const { OrderedSet, List, Map } = require("immutable");
const path = require("path");
const ServiceWorkerWebpackPlugin = require("@dr-kobros/serviceworker-webpack-plugin");
const {
  createFeature,
  createPlugin
} = require("@dr-kobros/broilerplate/lib/extend");

const plugin = createPlugin(ServiceWorkerWebpackPlugin)({
  name: () => "serviceWorkerPlugin",
  isEnabled: (env, target) => target === "client",
  options: () =>
    List.of(
      Map({
        entry: "sw.js"
      })
    )
});

module.exports = config =>
  createFeature({
    name: () => "serviceWorkerFeature",
    files: paths =>
      List.of({
        source: path.join(__dirname, "../files/sw.js"),
        target: path.join(paths.get("root"), "src/sw.js")
      }),
    plugins: () => OrderedSet.of(plugin)
  });
