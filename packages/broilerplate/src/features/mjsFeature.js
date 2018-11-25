const { OrderedSet, fromJS } = require("immutable");
const { createFeature, createLoader } = require("../extend");

const mjsLoader = createLoader({
  name: () => "mjsLoader",
  options: () => {
    return fromJS({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });
  }
});

const mjsFeature = createFeature({
  name: () => "mjsFeature",
  loaders: () => OrderedSet.of(mjsLoader),
  overrideBase: base =>
    base.updateIn(["resolve", "extensions"], extensions =>
      extensions.push(".mjs")
    )
});

module.exports = config => mjsFeature;
