const { fromJS } = require("immutable");
const createStyleLoader = require("../createStyleLoader");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

module.exports = {
  isEnabled: (env, target) => true,

  post: (env, target, options) => {
    return createStyleLoader(env, target, options);
  },

  defaults: (env, target, paths) => {
    return fromJS({
      test: /\.pcss$/,
      use: [
        {
          loader: getLoader(target),
          options: {
            modules: true,
            importLoaders: 2,
            localIdentName: "[name]__[local]__[hash:base64:5]"
          }
        },
        {
          loader: "postcss-loader"
        }
      ]
    });
  }
};
