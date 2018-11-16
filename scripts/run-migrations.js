require('dotenv').config();
const { exec } = require('child_process');
const command = `./node_modules/.bin/migrate -d ${process.env.DB_URI} up --autosync`;
console.log(`Executing "${command}"`);
exec(command, (err, stdout, stderr) => {
  if (stderr) {
    console.error(stderr);
  }

  if (stdout) {
    console.log(stdout);
  }
});
