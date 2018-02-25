const fs = require("fs-extra");
const path = require("path");

const copy = (source, target, force = false) => {
  fs.ensureDirSync(path.dirname(target));
  fs.copySync(source, target, {
    overwrite: force
  });
};

module.exports = copy;
