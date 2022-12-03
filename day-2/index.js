const fs = require("fs");

const buffer = fs.readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const matches = stringData
  .trim()
  .split("\n")
  .map((match) => match.split(" "));

const scores = matches.map(([opponent, player]) => {
  let score = 0;
  let modifier = 0;

  if (player === "X") {
    if (opponent === "A") {
      modifier = 3;
    }

    if (opponent === "B") {
      modifier = 0;
    }

    if (opponent === "C") {
      modifier = 6;
    }

    score = 1;
  }

  if (player === "Y") {
    if (opponent === "A") {
      modifier = 6;
    }

    if (opponent === "B") {
      modifier = 3;
    }

    if (opponent === "C") {
      modifier = 0;
    }
    score = 2;
  }

  if (player === "Z") {
    if (opponent === "A") {
      modifier = 0;
    }

    if (opponent === "B") {
      modifier = 6;
    }

    if (opponent === "C") {
      modifier = 3;
    }

    score = 3;
  }

  return score + modifier;
});

const total = scores.reduce((curr, val) => curr + val, 0);

console.log("Total:", total);
