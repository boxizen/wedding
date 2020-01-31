const spawn = require("child_process").spawn;
const which = require("which");
const IS_WIN = /^win/.test(process.platform);

const commandCache = new Map();
async function getCommand(name) {
  if (commandCache.has(name)) return Promise.resolve(commandCache.get(name));
  return new Promise((resolve, reject) => {
    which(name, (err, modulePath) => {
      if (err) {
        reject(err);
      } else {
        commandCache.set(name, IS_WIN ? JSON.stringify(modulePath) : modulePath);
        resolve(commandCache.get(name));
      }
    });
  });
}

module.exports = async (_command, _args = [], options = {}, logger = console, timeout = 600 * 1e3) => {
  let command = _command;
  let args = _args;
  if (/\s/.test(command)) {
    const _param = command.split(/\s/);
    command = _param.shift();
    args = _param.concat(args);
  }
  let commandPath = null;
  if (/\.|\\|\//.test(command)) {
    commandPath = command;
  } else {
    commandPath = await getCommand(command);
  }

  if (!options.env) {
    options.env = Object.assign({}, process.env);
  }
  if (!options.env.NODE_ENV) {
    options.env.NODE_ENV = process.env.NODE_ENV;
  }
  if (!options.encoding) {
    options.encoding = "binary"; // 方便转码
  }
  if (IS_WIN) {
    options.shell = true;
    // options.windowsVerbatimArguments = false;
    // options.env["PYTHONUNBUFFERED"] = true;
    // windows wrap "" to escape characters
    args = args.map(arg => (!/^\"/.test(arg) ? JSON.stringify(arg) : arg));
  }

  return new Promise((resolve, reject) => {
    const fullCommand = [commandPath].concat(args).join(" ");

    logger.log(`${fullCommand} ${options.cwd ? "(cwd:" + options.cwd + ")" : ""} (NODE_ENV:${options.env.NODE_ENV})`);

    let stdout = [];
    let stderr = [];
    let stdall = [];
    let closeTime;
    let timeoutId;
    let closed = function(code) {
      if (closeTime) return;
      clearTimeout(timeoutId);
      closeTime = Date.now();
      if (options.encoding === "binary") {
        stdout = Buffer.concat(stdout).toString();
        stderr = Buffer.concat(stderr).toString();
        stdall = Buffer.concat(stdall).toString();
      } else {
        stdout = stdout.join("");
        stderr = stderr.join("");
        stdall = stdall.join("");
      }
      if (code !== 0) {
        logger.warn("[runCommand non-zero exit]" + stdall);
        logger.warn(`'${fullCommand}' exit with non-zero code: (${code}). Output: \n ${stderr}`);
        let err = new Error(`${fullCommand}' exit with non-zero code: (${code})`);
        err.code = code;
        err.stdout = stdout;
        err.stderr = stderr;
        err.stdall = stdall;
        reject(err);
      } else {
        if (process.env.NODE_ENV === "development") {
          logger.info("[runCommand debug]" + stdall);
        }
        resolve(stdall);
      }
    };

    let prevPipe;
    if (/^win/.test(process.platform)) {
      // windows 强制 UTF8 再 pipe 命令
      // prevPipe = spawn("chcp", ["65001"]);
    }

    const task = spawn(commandPath, args, options);
    if (prevPipe) {
      prevPipe.stdout.on("data", data => {
        try {
          task.stdin.write(data);
        } catch (e) {
          console.log(data.toString(), e);
        }
      });
      let pipeError = [];
      prevPipe.stderr.on("data", data => {
        pipeError.push(data);
      });
      prevPipe.on("close", code => {
        if (code !== 0) {
          let errMsg = `pipe process exited with code ${code}\n` + Buffer.concat(pipeError).toString();
          logger.warn(errMsg);
          reject(new Error(errMsg));
        }
        task.stdin.end();
      });
      prevPipe.on("error", err => {
        logger.warn(err.message);
        reject(err);
      });
    }

    task.stdout.on("data", data => {
      stdout.push(data);
      stdall.push(data);
    });
    task.stderr.on("data", data => {
      stderr.push(data);
      stdall.push(data);
    });

    task.on("close", code => closed(code));

    task.on("error", e => {
      logger.error(e);
      reject(e);
    });

    task.on("exit", code => {
      // if close event not fired
      !closeTime &&
        setTimeout(() => {
          if (!closeTime) {
            logger.warn("Wait close event timeout, exit");
            closed(code);
          }
        }, 10 * 1e3);
    });

    timeoutId = setTimeout(() => {
      closed(999); // TODO Kill
    }, timeout);
  });
};
