const webpackNodeExternals = require("webpack-node-externals");
const { List } = require("immutable");
const path = require("path");
const { STATUS_COMPILED, assertStatus } = require("../buildStatuses");

const nodeExternals = options => build => {
  assertStatus(build, STATUS_COMPILED);
  const target = build.get("target");

  if (target !== "server") {
    return build;
  }

  const nodeModulesPath = path.resolve(
    build.getIn(["paths", "root"]),
    "./node_modules"
  );
  const ext = webpackNodeExternals(options);

  const func = (context, request, callback) => {
    const fixedRequest = request.replace(`${nodeModulesPath}/`, "");
    return ext(context, fixedRequest, callback);
  };

  return build.updateIn(["base", "externals"], List(), externals =>
    externals.push(func)
  );
};

module.exports = nodeExternals;
