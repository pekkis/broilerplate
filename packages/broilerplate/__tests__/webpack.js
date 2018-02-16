const { broilerplate } = require("../src/broilerplate");
const webpack = require("webpack");
const path = require("path");
const MemoryFS = require("memory-fs");

const overrides = require("../__test-app__/src/config/overrides");

const fs = new MemoryFS();

test("builds with defaults for development / client", done => {
  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const bp = broilerplate("development", "client", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
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
  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const bp = broilerplate("production", "client", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
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
  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build-server"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const bp = broilerplate("production", "server", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
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
  const paths = {
    root: path.resolve(__dirname, "../__test-app__"),
    src: path.resolve(__dirname, "../__test-app__/src"),
    build: path.resolve(__dirname, "../__test-app__/build-server"),
    modules: path.resolve(__dirname, "../node_modules")
  };

  const bp = broilerplate("development", "server", paths, overrides);
  expect(typeof bp).toBe("object");

  const config = bp.run();
  expect(typeof config).toBe("object");

  jest.setTimeout(60000);
  const compiler = webpack(config);
  compiler.outputFileSystem = fs;
  compiler.run((err, stats) => {
    expect(err).toBe(null);
    done();
  });
});
