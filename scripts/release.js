const runCommand = require('./runCommand');
const Git = require('./Git');
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
    await Git.config(cwd, ["--global", "user.email", conf.email]);
    await Git.config(cwd, ["--global", "user.name", conf.name]);
    await Git.remote(cwd, ["add", "gh-pages", "https://github.com/boxizen/wedding.git"]);
    await Git.fetch(cwd, ["gh-pages"]);
    await Git.checkout(cwd, ["gh-pages/gh-pages"]);
    let commitId = await Git["rev-parse"](cwd, ["--short", "gh-pages/gh-pages"]);        
    commitId = commitId.replace(/\n/g,'')
    await Git.tag(cwd, ["-a", conf.tag, commitId, "-m", `"${conf.tag}"`]);    
    try {
      await Git.push(cwd, ["-q", `https://${TOKEN}@github.com/boxizen/wedding`, "gh-pages/gh-pages", "--tags"]);      
    } catch(e) {}
    await runCommand("curl", ["-H", `Authorization: token ${TOKEN}`, "-X", "POST", "-d", JSON.stringify(body), api], {
      cwd
    })
  } catch(e) {
    console.log(e);
    process.exit(1);
  }  
}

start();