// const conf = require("./conf");
module.exports = {
  publicPath: process.env.NODE_ENV === "test" ? "/" : `https://cdn.jsdelivr.net/gh/boxizen/wedding@${conf.tag}`,
}