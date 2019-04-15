const path = require("path");
const fs = require("fs");

const helpers = require("./conv-istanbul-helpers");

const lcov = fs.readFileSync(path.resolve(__dirname, "./data/lcov.info"), {
  encoding: "utf8"
});

helpers.convertLcovToIstanbulJson(lcov).then(result => {
    fs.writeFileSync(path.resolve(__dirname, './temp/coverage.json'), JSON.stringify(result));
});
