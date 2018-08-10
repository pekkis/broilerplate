const { List, fromJS } = require("immutable");
const Plugin = require("html-webpack-plugin");
const { createPlugin } = require("../extend");

module.exports = createPlugin(Plugin)({
  name: () => "htmlPlugin",
  isEnabled: (env, target) => target === "client",
  options: () =>
    List.of(
      fromJS({
        title: "Hardcorest React App",
        template: "assets/index.html",
        favicon: "assets/favicon.png",
        inject: "body",
        chunksSortMode: "dependency"
      })
    )
});
