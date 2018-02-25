const {
  pipe,
  empty,
  defaultFeatures,
  mergePaths,
  defaultBaseConfig,
  compile,
  run,
  toJS
} = require("../src/broilerplate");
const webpack = require("webpack");
const path = require("path");
const MemoryFS = require("memory-fs");

const fs = new MemoryFS();

test("builds with defaults for development / client", done => {
  const env = "development";
  const target = "client";

  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const config = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run,
    toJS
  )();

  expect(typeof config).toBe("object");

  jest.setTimeout(60000);
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    expect(err).toBe(null);
    done();
  });
});

test("builds with defaults for development / server", done => {
  const env = "development";
  const target = "server";

  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const config = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run,
    toJS
  )();

  expect(typeof config).toBe("object");

  jest.setTimeout(60000);
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    expect(err).toBe(null);
    done();
  });
});

test("builds with defaults for production / server", done => {
  const env = "production";
  const target = "server";

  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const config = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run,
    toJS
  )();

  expect(typeof config).toBe("object");

  jest.setTimeout(60000);
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    expect(err).toBe(null);
    done();
  });
});

test("builds with defaults for production / client", done => {
  const env = "production";
  const target = "client";

  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const config = pipe(
    empty,
    mergePaths(paths),
    defaultFeatures,
    defaultBaseConfig(env, target, paths),
    compile(env, target),
    run,
    toJS
  )();

  expect(typeof config).toBe("object");

  jest.setTimeout(60000);
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    expect(err).toBe(null);
    done();
  });
});
