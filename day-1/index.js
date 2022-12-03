const fs = require("fs");

const buffer = fs.readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const groups = stringData.split("\n\n").map((group) => {
  return group
    .trim()
    .split("\n")
    .map((value) => parseInt(value, 10));
});

const totals = groups.map((group) =>
  group.reduce((curr, value) => curr + value, 0)
);

const maxValue = Math.max(...totals);

console.log("MAX VALUE:", maxValue);
