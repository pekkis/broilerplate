const { fromJS } = require("immutable");
const createStyleLoader = require("@dr-kobros/broilerplate/lib/createStyleLoader");

const getLoader = target => {
  return target === "client" ? "css-loader" : "css-loader/locals";
};

module.exports = {
  name: () => "postCssLoader",
  isEnabled: (env, target) => true,

  post: (env, target, options) => {
    return createStyleLoader(env, target, options);
  },

  options: (env, target, paths) => {
    return fromJS({
      include: [paths.get("src")],
      test: /\.p?css$/,
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
