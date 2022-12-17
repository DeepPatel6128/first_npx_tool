#! /usr/bin/env node
const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const arg = process.argv;
const path = process.cwd();
const folderName = `${path}\\${arg.slice(2)}`;

// creating client file
async function createClient(folderName) {
  console.log("Creating react app");
  await exec(`npx create-react-app ${folderName}\\client`, (error) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log("React app created");
    }
  });
}

//creating server file
async function createServer(folderName) {
  await exec(`npm init -y`, { cwd: `${folderName}\\server` }, (error) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    } else {
      console.log("Created package.json");
    }
  });
  console.log("installing dependencies");
  await exec(
    `npm install body-parser cors express mongoose`,
    { cwd: `${folderName}\\server` },
    (error) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      } else {
        console.log("Installed dependencies for server");
      }
    }
  );
}

//main function
async function main() {
  try {
    fs.mkdirSync(folderName);
    console.log("Project file created");

    if (fs.existsSync(folderName)) {
      fs.mkdirSync(`${folderName}\\server`);
      await createClient(folderName);
      await createServer(folderName);
    }
  } catch (error) {
    console.log(error.message);
  }
}

main();
