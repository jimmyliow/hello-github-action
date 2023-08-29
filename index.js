const core = require('@actions/core');
const github = require('@actions/github');
const child_process = require('child_process');
const util = require('util');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  
   //define git log script for easy debuggin, this will return data as json file
   const format = ' --pretty=format:\'{"commit": "%h","author": "%aN","date": "%ad","message": "%f", "original_message": "%s"},\'';
   const endPart =  "$@ | perl -pe 'BEGIN{print \"[\"}; END{print \"]\"}' | perl -pe 's/},]/}]/'";
   
   //get latest tag
   const latestRelease = await exec('git describe --tags --abbrev=0'); 
   const logScript = "git log " + latestRelease + "..HEAD " + format + endPart;
   const logs = await exec(logScript)
   console.log(`log data: ${logs}!`);
} catch (error) {
  core.setFailed(error.message);
}
