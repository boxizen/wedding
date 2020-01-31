const runCommand = require('./runCommand');
// const path = require('path');
const conf = require('../conf');
const cwd = "/home/travis/build/boxizen/wedding"; //path.resolve(__dirname, "../");
const api = `https://api.github.com/repos/boxizen/wedding/releases`;


let body = {
  "tag_name": conf.tag,
  "target_commitish": "gh-pages",
  "name": conf.tag,
  "body": `wedding ${conf.tag}`,
  "draft": false,
  "prerelease": false
}

const TOKEN = process.argv[2];

async function start() {
  await runCommand("git", ["fetch", "origin", "gh-pages"], {
    cwd
  });
  let commitId = await runCommand("git", ["rev-parse", "--short", "gh-pages"], {
    cwd
  });
  commitId = commitId.replace(/\n/g,'')
  await runCommand("git", ["tag", "-a", conf.tag, commitId, "-m", `"${conf.tag}"`], {
    cwd
  });
  await runCommand("git", ["push", "--tags"], {
    cwd
  });
  let res = await runCommand("curl", ["-H", `Authorization: token ${TOKEN}`, "-X", "POST", "-d", JSON.stringify(body), api], {
    cwd
  })
}

start();