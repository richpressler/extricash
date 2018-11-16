require('dotenv').config();
const { exec } = require('child_process');
const command = `./node_modules/.bin/migrate -d ${process.env.DB_URI} create ${process.argv[2]} -t ./scripts/migration-template.js --autosync`;
console.log(`Executing "${command}"`);
exec(command, (err, stdout, stderr) => {
  console.log(err);
  console.log(stdout);
  if (stderr) {
    console.error(stderr);
  }
});
