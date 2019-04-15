const parseLcov = require("lcov-parse");

module.exports = {
  convertLcovToIstanbulJson
};

function convertLcovToIstanbulJson(lcov) {
  return new Promise(res => {
    parseLcov(lcov, (err, lcovJson) => {
      res(lcovJson);
    });
  }).then(lcovJson => {
    return lcovJson.reduce((results, file) => {
      let nextStatementId = 0;
      let nextFunctionId = 0;
      let nextBranchId = 0;

      const lineData = file.lines.details.reduce(
        (acc, line) => {
          const statementId = nextStatementId;
          nextStatementId++;

          acc.s[statementId] = line.hit;
          acc.statementMap[statementId] = {
            start: {
              line: line.line,
              column: 0
            },
            end: {
              line: line.line,
              column: 0
            }
          };

          acc.l[line.line] = line.hit;

          return acc;
        },
        {
          s: {},
          statementMap: {},
          l: {}
        }
      );

      const functionData = file.functions.details.reduce(
        (acc, fn) => {
          const functionId = nextFunctionId;
          nextFunctionId++;

          acc.f[functionId] = fn.hit;
          acc.fnMap[functionId] = {
            name: fn.name,
            line: fn.line,
            loc: {
              start: {
                line: fn.line,
                col: 0
              },
              end: {
                line: fn.line,
                col: 0
              }
            }
          };

          return acc;
        },
        {
          f: {},
          fnMap: {}
        }
      );

      const branchData = file.branches.details
        .reduce((acc, branch) => {
            const branchId = nextBranchId;
            nextBranchId++;

            return acc;
        }, {
            b: {},
            branchMap: {}
        });

      results[file.file] = {
        path: file.file,
        s: lineData.s,
        statementMap: lineData.statementMap,
        l: lineData.l,
        f: functionData.f,
        fnMap: functionData.fnMap,
        b: branchData.b,
        branchMap: branchData.branchMap
      };

      return results;
    }, {});
  });
}
