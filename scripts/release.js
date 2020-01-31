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
  try {
    await runCommand("git", ["config", "--global", "user.email", conf.email], {
      cwd
    });
    await runCommand("git", ["config", "--global", "user.name", conf.name], {
      cwd
    });
    await runCommand("git", ["remote", "add", "gh-pages", "https://github.com/boxizen/wedding.git"], {
      cwd
    });
    await runCommand("git", ["fetch", "gh-pages"], {
      cwd
    });
    // let branchRes = await runCommand("git", ["branch"], {
    //   cwd
    // });
    await runCommand("git", ["checkout", "gh-pages/gh-pages"], {
      cwd
    });
    let commitId = await runCommand("git", ["rev-parse", "--short", "gh-pages/gh-pages"], {
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
    console.log('curl res:', res);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }  
}

start();