/**
 * @jest-environment node
 */

const path = require("path");
const { getPlugin } = require("../src/configure");

test("internal plugins match", () => {
  const internalPlugins = [
    "caseSensitivePathsPlugin",
    "cleanPlugin",
    "copyFilesPlugin",
    "definePlugin",
    "htmlPlugin",
    "manifestPlugin",
    "statsPlugin",
    "watchMissingNodeModulesPlugin"
  ];

  internalPlugins.forEach(ip => {
    const plugin = getPlugin(ip);
    expect(typeof plugin).toBe("object");
    expect(plugin.name()).toEqual(ip);
  });
});
