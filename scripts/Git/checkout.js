const runCommand = require("../runCommand");

module.exports = async (localPath, options) => {
  // const { exts } = options;
  return runCommand("git", ["checkout"].concat(options), {
    cwd: localPath
  });
};
