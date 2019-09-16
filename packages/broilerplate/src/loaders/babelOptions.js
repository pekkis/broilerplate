const path = require("path");
const fs = require("fs");

const getBrowsers = root => {
  const browserFile = fs.readFileSync(path.resolve(root, ".browserslistrc"), {
    encoding: "utf-8"
  });
  return browserFile
    .split("\n")
    .map(b => b.trim())
    .filter(b => b);
};

const getTargets = (env, target, paths) => {
  if (target === "client") {
    return {
      browsers: getBrowsers(paths.get("root"))
    };
  }

  return {
    node: "current"
  };
};

module.exports = (env, target, paths, options) => {
  return {
    babelrc: false,
    presets: [
      "@babel/preset-typescript",
      [
        "@babel/preset-env",
        {
          debug: options.get("debug", false),
          useBuiltIns: "usage",
          targets: getTargets(env, target, paths),
          modules: false,
          corejs: options.get("corejs", 3)
        }
      ],
      [
        "@babel/preset-react",
        {
          development: env === "development"
        }
      ]
    ],
    plugins: [
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-proposal-class-properties"
    ]
  };
};
