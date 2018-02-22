const path = require("path");
const { broilerplate, defaultPaths } = require("../src/broilerplate");
const overrides = require("./src/config/overrides");
const dotenv = require("dotenv");
dotenv.config();

module.exports = target => {
  const env = process.env.NODE_ENV;
  const paths = {
    ...defaultPaths(env, target, __dirname),
    modules: path.resolve(__dirname, "../node_modules")
  };
  return (
    broilerplate(env, target, paths, overrides)
      // .addFeature("uglifyMinifyFeature")
      .run()
  );
};
