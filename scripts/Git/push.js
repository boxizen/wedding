const runCommand = require("../runCommand");

module.exports = async (localPath, options) => {
  // const { exts } = options;
  return runCommand("git", ["push"].concat(options), {
    cwd: localPath
  });
};
