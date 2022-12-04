import { readFileSync } from "fs";

type OpponentInput = string;
type PlayerInput = string;
type Move = "rock" | "paper" | "scissors";

interface OpponentInputMap {
  [key: OpponentInput]: Move;
}

interface DirectPlayerInputMap {
  [key: PlayerInput]: Move;
}

interface ComplementaryPlayerInputMap {
  [key: OpponentInput]: {
    [key: PlayerInput]: Move;
  };
}

const buffer = readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const opponentInputMap: OpponentInputMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

const directMatchPlayerInputMap: DirectPlayerInputMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

const complementaryMatchPlayerInputMap: ComplementaryPlayerInputMap = {
  A: {
    X: "scissors",
    Y: "rock",
    Z: "paper",
  },
  B: {
    X: "rock",
    Y: "paper",
    Z: "scissors",
  },
  C: {
    X: "paper",
    Y: "scissors",
    Z: "rock",
  },
};

const shapeScoreModifiers = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

// Keys are matchScoreModifiers[player][opponent]
const matchScoreModifiers = {
  rock: {
    rock: 3,
    paper: 0,
    scissors: 6,
  },
  paper: {
    rock: 6,
    paper: 3,
    scissors: 0,
  },
  scissors: {
    rock: 0,
    paper: 6,
    scissors: 3,
  },
};

const encodedMatches = stringData
  .trim()
  .split("\n")
  .map((datum) => datum.trim().split(" "));

const directMatches = encodedMatches.map(([opponent, player]) => {
  const opponentPlay = opponentInputMap[opponent];
  const playerPlay = directMatchPlayerInputMap[player];

  return [opponentPlay, playerPlay];
});

const directMatchScores = directMatches.map(([opponent, player]) => {
  const score = shapeScoreModifiers[player];
  const modifier = matchScoreModifiers[player][opponent];

  return score + modifier;
});

const directMatchTotal = directMatchScores.reduce((curr, val) => curr + val, 0);

const complementaryMatches = encodedMatches.map(([opponent, player]) => {
  const opponentPlay = opponentInputMap[opponent];
  const playerPlay = complementaryMatchPlayerInputMap[opponent][player];

  return [opponentPlay, playerPlay];
});

const complementaryMatchScores = complementaryMatches.map(
  ([opponent, player]) => {
    const score = shapeScoreModifiers[player];
    const modifier = matchScoreModifiers[player][opponent];

    return score + modifier;
  }
);

const complementaryMatchTotal = complementaryMatchScores.reduce(
  (curr, val) => curr + val,
  0
);

console.log("Part 1 (direct match score):", directMatchTotal);
console.log("Part 2 (complementary match score):", complementaryMatchTotal);
