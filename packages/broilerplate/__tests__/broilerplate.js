const { broilerplate } = require("../src/broilerplate");
const path = require("path");

const paths = {
  root: path.resolve(__dirname, "../__test-app__"),
  src: path.resolve(__dirname, "./src"),
  build: path.resolve(__dirname, "./build"),
  modules: path.resolve(__dirname, "./node_modules"),
  test: path.resolve(__dirname, "./test")
};

const overrides = {
  overridePlugin: values => values,
  overrideLoader: values => values,
  overrideWebpackConfiguration: values => values
};

test("runs with defaults for production / client", () => {
  const bp = broilerplate("production", "client", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
  expect(typeof config).toBe("object");
});

test("removes a plugin", () => {
  const bp = broilerplate("production", "client", paths, overrides);
  expect(typeof bp).toBe("object");

  const { plugins } = bp.build();

  const p = plugins.find(p => p.name() === "namedChunksPlugin");
  expect(typeof p).toBe("object");

  bp.removePlugin("namedChunksPlugin");

  const { plugins: plugins2 } = bp.build();

  const p2 = plugins2.find(p => p.name() === "namedChunksPlugin");
  expect(typeof p2).toBe("undefined");

  const config = bp.run();
  console.log(config);
});

test("runs with defaults for development / client", () => {
  const bp = broilerplate("development", "client", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
  expect(typeof config).toBe("object");
});

test("runs with defaults for development / server", () => {
  const bp = broilerplate("development", "server", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
  expect(typeof config).toBe("object");
});

test("runs with defaults for production / server", () => {
  const bp = broilerplate("production", "server", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
  expect(typeof config).toBe("object");
});
