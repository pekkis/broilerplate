const baseFeature = require("@dr-kobros/broilerplate/lib/baseFeature");
const { createFeature } = require("@dr-kobros/broilerplate/lib/extend");

module.exports = createFeature({
  ...baseFeature,
  name: () => "styledComponentsFeature",
  overrideLoader: loader => {
    if (loader.name() !== "babelLoader") {
      return loader;
    }

    return {
      ...loader,
      options: (env, target, paths, options) =>
        loader
          .options(env, target, paths, options)
          .updateIn(["use", 0, "options", "plugins"], p =>
            p.push([
              "babel-plugin-styled-components",
              {
                ssr: true
              }
            ])
          )
    };
  }
});
