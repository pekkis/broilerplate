const { OrderedSet, List, Map } = require("immutable");
const Plugin = require("csp-html-webpack-plugin");
const { createFeature, createPlugin } = require("../extend");

const defaultPolicy = () =>
  Map({
    "base-uri": "'self'",
    "object-src": "'none'",
    "default-src": "'self'",
    "style-src": List(["'self'", "'unsafe-inline'"]),
    "script-src": List(["'unsafe-inline'", "'self'", "'unsafe-eval'"])
  });

const defaultOptions = Map({
  hashingMethod: "sha256",
  enabled: true
});

module.exports = (policy = defaultPolicy, options = defaultOptions) => {
  const plugin = createPlugin(Plugin)({
    name: () => "cspHtmlWebpackPlugin",
    isEnabled: (env, target) => target === "client",
    options: (env, target) => List.of(policy(env), options)
  });

  return createFeature({
    name: () => "cspFeature",
    plugins: () => OrderedSet.of(plugin)
  });
};
