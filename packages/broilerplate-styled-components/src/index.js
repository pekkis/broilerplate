const { List } = require("immutable");
const baseFeature = require("@dr-kobros/broilerplate/lib/baseFeature");

module.exports = {
  ...baseFeature,
  name: () => "styledComponentsFeature",
  overrideLoader: (loader, env, target, paths) => {
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
};
