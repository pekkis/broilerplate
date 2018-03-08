const { fromJS, OrderedSet } = require("immutable");

module.exports = {
  supportedFeatures: () => OrderedSet.of(),
  name: () => "imageLoader",
  isEnabled: (env, target) => true,
  options: (env, target, paths) => {
    return fromJS({
      test: /\.(png|jpg|gif|ico|svg)$/,
      include: [paths.get("src")],
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[path][name]-[hash].[ext]",
            emitFile: target === "client"
          }
        },
        {
          loader: "img-loader",
          options: {
            enabled: env === "production"
          }
        }
      ]
    });
  }
};
