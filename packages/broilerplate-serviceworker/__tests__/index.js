/**
 * @jest-environment node
 */

const {
  defaultPaths,
  defaultFeatures,
  pipe,
  empty,
  defaultBaseConfig,
  addFeature,
  compile,
  run
} = require("@dr-kobros/broilerplate");

const util = require("util");

const feature = require("../src/index");

test("compiles", () => {
  const env = "production";
  const target = "client";

  const build = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    defaultFeatures,
    addFeature(feature),
    compile(env, target)
  )();

  expect(typeof build).toBe("object");
});

test("runs", () => {
  const env = "production";
  const target = "client";

  const build = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    defaultFeatures,
    addFeature(feature),
    compile(env, target),
    run
  )();

  expect(typeof build).toBe("object");
});
