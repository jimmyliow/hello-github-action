const core = require('@actions/core');
const github = require('@actions/github');
const child_process = require('child_process');
const util = require('util');

async function main() {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const logScript = "git log -1 --pretty=format:%ce HEAD";
  const logs = await exec(logScript)
  console.log(`log data: ${logs}!`);

  async function exec(command) {
    const { stdout, stderr } = await util.promisify(child_process.exec)(command)
    if (stderr) console.error(stderr)
    return stdout.trim();
  }
}

main();