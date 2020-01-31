const runCommand = require("../runCommand");

module.exports = async (localPath, options) => {
  const { exts } = options;
  return runCommand("git", ["rev-parse"].concat(exts), {
    cwd: localPath
  });
};
