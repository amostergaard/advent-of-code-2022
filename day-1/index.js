const fs = require("fs");

const buffer = fs.readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const lines = stringData.split("\n");

for (let i = 0; i < lines.length; i++) {
  console.log(`${i + 1}: ${lines[i]}`);
}
