const fs = require("fs");
const path = require("path");

const helpers = require('./conv-istanbul-helpers');

const filePath = getArgValue("--file");
if (!filePath) {
  exit("Missing --file argument");
}

const file = fs.openSync(path.resolve(__dirname, filePath));
if (!file) {
  exit(`No file found at ${filePath}`);
}

helpers.convertLcovToIstanbulJson(file);

function getArgValue(argName) {
  const fullValue = process.argv.find(arg => arg.startsWith(argName));

  return fullValue ? fullValue.split("=") : "";
}

function printUsage() {
  process.stdout.write("usage: conv-istanbul --file=<filename>");
}

function getArgValue(argName) {
  const fullValue = process.argv.find(arg => arg.startsWith(argName));

  return fullValue ? fullValue.split("=") : "";
}

function exit(msg) {
  console.error(msg);
  printUsage();
  exit(1);
}
