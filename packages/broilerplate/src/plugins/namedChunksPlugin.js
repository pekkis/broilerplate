const { List } = require("immutable");
const webpack = require("webpack");
const path = require("path");
const Plugin = webpack.NamedChunksPlugin;

module.exports = {
  name: () => "namedChunksPlugin",
  isEnabled: (env, target) => true,
  options: (env, target, paths) =>
    List.of(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      return chunk
        .mapModules(m => path.relative(m.context, m.request))
        .join("_");
    }),
  plugin: options => new Plugin(...options)
};
