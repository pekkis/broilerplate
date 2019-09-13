const {
  createFeature,
  createLoader
} = require("@dr-kobros/broilerplate/lib/extend");
const { fromJS, List } = require("immutable");
const babelOptions = require("@dr-kobros/broilerplate/lib/loaders/babelOptions");

const loader = createLoader({
  name: () => "typeScriptLoader",
  options: (env, target, paths, options) => {
    return fromJS({
      test: /\.tsx?$/,
      use: [
        {
          loader: "babel-loader",
          options: babelOptions(env, target, paths, options)
        },
        {
          loader: "ts-loader"
        }
      ],
      exclude: [paths.get("modules")]
    });
  }
});

module.exports = config =>
  createFeature({
    name: () => "typeScriptFeature",
    loaders: () => List.of(loader),
    overrideBase: base => {
      return base
        .updateIn(["resolve", "extensions"], e => e.concat([".ts", ".tsx"]))
        .setIn(["entry", "client"], "./client.tsx");
    }
  });
