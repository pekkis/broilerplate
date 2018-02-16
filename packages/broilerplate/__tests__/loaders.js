const { getLoader } = require("../src/configure");

test("internal features match", () => {
  const internalLoaders = [];

  internalLoaders.forEach(ip => {
    const loader = getLoader(ip);
    expect(typeof loader).toBe("object");
    expect(loader.name()).toEqual(ip);
  });

  // const bp = broilerplate("production", "client", paths, overrides);

  // console.log(bp);
});
