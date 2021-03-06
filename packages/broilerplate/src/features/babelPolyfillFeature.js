const { createFeature } = require("../extend");

module.exports = config =>
  createFeature({
    name: () => "babelPolyfillFeature",
    overrideBase: (values, env, target, paths) => {
      if (target === "server") {
        return values;
      }

      return values.updateIn(["entry", "client"], e =>
        e.unshift("@babel/polyfill")
      );
    }
  });
