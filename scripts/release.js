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
    let fetchRes = await runCommand("git", ["fetch"], {
      cwd
    });
    console.log('fetchRes:', fetchRes);
    let branchRes = await runCommand("git", ["branch"], {
      cwd
    });
    console.log('branchRes:', branchRes);
    let logRes = await runCommand("git", ["log"], {
      cwd
    });
    console.log('logRes:', logRes);
    await runCommand("git", ["checkout", "origin/gh-pages"], {
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
    console.log('curl res:', res);
  } catch(e) {
    console.log(e);
    process.exit(1);
  }  
}

start();