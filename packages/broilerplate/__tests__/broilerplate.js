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
