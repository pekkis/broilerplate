const path = require("path");
const { getPlugin } = require("../src/configure");

test("internal plugins match", () => {
  const internalPlugins = [
    "caseSensitivePathsPlugin",
    "cleanPlugin",
    "copyFilesPlugin",
    "cssExtractPlugin",
    "definePlugin",
    "hashedModulesPlugin",
    "htmlPlugin",
    "manifestPlugin",
    // "metaBundlePlugin",
    // "moduleConcatenationPlugin",
    // "namedChunksPlugin",
    // "namedModulesPlugin",
    // "noEmitOnErrorsPlugin",
    // "occurrenceOrderPlugin",
    "statsPlugin",
    "uglifyPlugin",
    // "vendorBundlePlugin",
    "watchMissingNodeModulesPlugin"
  ];

  internalPlugins.forEach(ip => {
    const plugin = getPlugin(ip);
    expect(typeof plugin).toBe("object");
    expect(plugin.name()).toEqual(ip);
  });

  // const bp = broilerplate("production", "client", paths, overrides);

  // console.log(bp);
});
