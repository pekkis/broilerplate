const baseFeature = require("../baseFeature");

module.exports = {
  ...baseFeature,
  name: () => "babelPolyfillFeature",
  overrideBase: (values, env, target, paths) => {
    if (target === "server") {
      return values;
    }

    return values.updateIn(["entry", "client"], e =>
      e.unshift("babel-polyfill")
    );
  }
};
