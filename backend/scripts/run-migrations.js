require('dotenv').config();
const { exec } = require('child_process');
const command = `./node_modules/.bin/migrate -d ${process.env.DB_URI} up --autosync`;
console.log(`Executing "${command}"`);
exec(command, {timeout: 30000}, (err, stdout, stderr) => {
  if (err) {
    console.log(err);
  }
  if (stderr) {
    console.log(stderr);
  }

  if (stdout) {
    console.log(stdout);
  }
});
