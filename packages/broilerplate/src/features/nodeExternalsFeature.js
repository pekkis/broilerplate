const baseFeature = require("../baseFeature");
const webpackNodeExternals = require("webpack-node-externals");
const { List } = require("immutable");
const path = require("path");

module.exports = options => ({
  ...baseFeature,
  name: () => "nodeExternalsFeature",
  overrideBase: (values, env, target, paths) => {
    if (target !== "server") {
      return values;
    }

    const nodeModulesPath = path.resolve(paths.get("root"), "./node_modules");
    const ext = webpackNodeExternals(options);

    const func = (context, request, callback) => {
      const fixedRequest = request.replace(`${nodeModulesPath}/`, "");
      return ext(context, fixedRequest, callback);
    };

    return values.update("externals", List(), externals =>
      externals.push(func)
    );
  }
});
