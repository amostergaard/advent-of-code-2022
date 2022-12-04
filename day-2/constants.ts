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

export const opponentInputMap: OpponentInputMap = {
  A: "rock",
  B: "paper",
  C: "scissors",
};

export const directMatchPlayerInputMap: DirectPlayerInputMap = {
  X: "rock",
  Y: "paper",
  Z: "scissors",
};

export const complementaryMatchPlayerInputMap: ComplementaryPlayerInputMap = {
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

export const shapeScoreModifiers = {
  rock: 1,
  paper: 2,
  scissors: 3,
};

// Keys are matchScoreModifiers[player][opponent]
export const matchScoreModifiers = {
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
