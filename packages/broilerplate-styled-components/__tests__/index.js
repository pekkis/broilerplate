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

  expect(typeof build).toBe("object");

  const ran = run(build);
  expect(typeof ran).toBe("object");
});
