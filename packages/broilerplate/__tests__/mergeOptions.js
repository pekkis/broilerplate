const { pipe, empty, mergeOptions } = require("../src/broilerplate");
const { Map } = require("immutable");

test("merges options", () => {
  const build = pipe(
    empty,
    mergeOptions(
      Map({
        debug: true
      })
    )
  )();

  expect(typeof build).toBe("object");
  expect(build.getIn(["options", "debug"])).toEqual(true);
});
