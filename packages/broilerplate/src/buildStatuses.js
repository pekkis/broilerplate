const assertStatus = (build, expected) => {
  if (build.get("status") !== expected) {
    throw new Error(`Invalid build status (${expected})`);
  }
};

module.exports = {
  STATUS_UNCOMPILED: "uncompiled",
  STATUS_COMPILED: "compiled",
  assertStatus
};
