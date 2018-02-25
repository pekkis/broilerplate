const {
  pipe,
  empty,
  defaultFeatures,
  mergePaths,
  defaultBaseConfig,
  compile,
  run
} = require("../src/broilerplate");

const path = require("path");

const paths = {
  root: path.resolve(__dirname, "../__test-app__"),
  src: path.resolve(__dirname, "./src"),
  build: path.resolve(__dirname, "./build"),
  modules: path.resolve(__dirname, "./node_modules"),
  test: path.resolve(__dirname, "./test")
};

test("runs with defaults for production / client", () => {
  const env = "production";
  const target = "client";

  const build = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run
  )();
  expect(typeof build).toBe("object");
});

test("runs with defaults for development / client", () => {
  const env = "development";
  const target = "client";

  const build = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run
  )();
  expect(typeof build).toBe("object");
});

test("runs with defaults for development / server", () => {
  const env = "development";
  const target = "server";

  const build = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run
  )();
  expect(typeof build).toBe("object");
});

test("runs with defaults for production / server", () => {
  const env = "productions";
  const target = "server";

  const build = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run
  )();
  expect(typeof build).toBe("object");
});
