/**
 * @jest-environment node
 */

const {
  defaultPaths,
  pipe,
  empty,
  defaultBaseConfig,
  addFeature,
  compile,
  run
} = require("@dr-kobros/broilerplate");

const feature = require("../src/index");

test("builds", () => {
  const env = "production";
  const target = "client";

  const build = pipe(
    empty,
    defaultPaths(env, target, __dirname),
    defaultBaseConfig(env, target),
    addFeature(feature()),
    compile(env, target)
  )();

  expect(typeof build).toBe("object");
  expect(build.get("features").count()).toEqual(1);
  expect(build.get("loaders").count()).toEqual(0);
  expect(build.get("plugins").count()).toEqual(1);

  const ran = run(build);
  expect(typeof ran).toBe("object");
});
