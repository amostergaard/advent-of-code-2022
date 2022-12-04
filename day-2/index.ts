import { getFileContentAsString, sum } from "@monorepo/shared";

import {
  opponentInputMap,
  directMatchPlayerInputMap,
  shapeScoreModifiers,
  matchScoreModifiers,
  complementaryMatchPlayerInputMap,
} from "./constants";

const stringData = getFileContentAsString("./data/input.txt");

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

const directMatchTotal = sum(...directMatchScores);

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

const complementaryMatchTotal = sum(...complementaryMatchScores);

console.log("Part 1 (direct match score):", directMatchTotal);
console.log("Part 2 (complementary match score):", complementaryMatchTotal);
