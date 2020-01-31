const fs = require("fs");

const dir = fs.readdirSync(__dirname);

module.exports = {};

dir.forEach(method => {
  if (/\.js$/.test(method)) {
    module.exports[method.replace(/\.js$/, "")] = require("./" + method);
  }
});
