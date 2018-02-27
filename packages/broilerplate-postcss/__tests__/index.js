/**
 * @jest-environment node
 */

const {
  defaultPaths,
  pipe,
  empty,
  defaultBaseConfig,
  addFeature,
  compile
} = require("@dr-kobros/broilerplate");

const feature = require("../src/index");

test("builds", () => {
  const env = "production";
  const target = "client";

  const build = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    addFeature(feature),
    compile(env, target)
  )();

  console.log(build);

  expect(typeof build).toBe("object");

  expect(build.get("features").count()).toEqual(1);
  expect(build.get("loaders").count()).toEqual(1);
});
