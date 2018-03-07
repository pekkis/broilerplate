const baseFeature = require("../baseFeature");

const envs = ["production"];

module.exports = {
  ...baseFeature,
  name: () => "babelPolyfillFeature",
  overrideBase: (values, env, target, paths) => {
    if (!envs.includes(env)) {
      return values;
    }
    return values.updateIn(["entry", "client"], e =>
      e.unshift("babel-polyfill")
    );
  }
};
