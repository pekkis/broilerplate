const { fromJS } = require("immutable");

module.exports = {
  name: () => "fontLoader",
  isEnabled: (env, target) => true,
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
};
