const isArray = require("lodash/isArray");

const fileMapper = (chunks, assetsByChunkName, mapper, extension) => {
  return chunks
    .map(chunk => assetsByChunkName[chunk])
    .filter(chunk => chunk)
    .map(chunk => (isArray(chunk) ? chunk : [chunk]))
    .map(files =>
      files
        .filter(file => file.endsWith(extension))
        .map(mapper)
        .join("")
    )
    .join("");
};

const getScripts = (stats, chunks) =>
  fileMapper(
    chunks,
    stats.assetsByChunkName,
    file => `<script type="text/javascript" src="/${file}"></script>`,
    "js"
  );

const getStyles = (stats, chunks) =>
  fileMapper(
    chunks,
    stats.assetsByChunkName,
    file => `<link rel="stylesheet" href="/${file}" />`,
    "css"
  );

module.exports = {
  getScripts,
  getStyles
};
