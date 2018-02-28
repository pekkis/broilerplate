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
  compile
} = require("@dr-kobros/broilerplate");

const util = require("util");

const feature = require("../src/index");

test("builds", () => {
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
