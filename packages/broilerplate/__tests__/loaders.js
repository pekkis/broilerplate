const { getLoader } = require("../src/configure");

test("internal loaders match", () => {
  const internalLoaders = [
    "babelLoader",
    "externalcssLoader",
    "fontLoader",
    "imageLoader",
    "postcssLoader"
  ];

  internalLoaders.forEach(ip => {
    const loader = getLoader(ip);
    expect(typeof loader).toBe("object");
    expect(loader.name()).toEqual(ip);
  });

  // const bp = broilerplate("production", "client", paths, overrides);

  // console.log(bp);
});
