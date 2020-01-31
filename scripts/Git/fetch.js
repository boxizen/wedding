const runCommand = require("../runCommand");

module.exports = async (localPath, options) => {
  // const { exts } = options;
  return runCommand("git", ["fetch"].concat(options), {
    cwd: localPath
  });
};
