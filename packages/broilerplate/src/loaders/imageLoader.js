const { fromJS } = require("immutable");
const { createLoader } = require("../extend");

module.exports = config =>
  createLoader({
    name: () => "imageLoader",
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
  });
