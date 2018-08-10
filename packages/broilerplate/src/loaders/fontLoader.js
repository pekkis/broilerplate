const { fromJS } = require("immutable");
const { createLoader } = require("../extend");

module.exports = createLoader({
  name: () => "fontLoader",
  options: (env, target, paths) => {
    return fromJS({
      test: /font.*\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      include: [paths.get("src"), paths.get("modules")],
      use: [
        {
          loader: "url-loader",
          options: {
            emitFile: target === "client",
            limit: 10000,
            name: "[path][name]-[hash].[ext]"
          }
        }
      ]
    });
  }
});
