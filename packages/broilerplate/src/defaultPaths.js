const path = require("path");
const { Map } = require("immutable");

const defaultPaths = (env, target, dirname) => {
  const buildDir = target === "client" ? "./dist" : "./dist-server";
  const paths = {
    root: path.resolve(dirname),
    src: path.resolve(dirname, "./src"),
    build: path.resolve(dirname, buildDir),
    modules: path.resolve(dirname, "./node_modules")
  };

  return Map(paths);
};

module.exports = defaultPaths;
