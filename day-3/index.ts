import {
  chunk,
  getFileContentAsString,
  getIntersection,
  isLowerCase,
  sum,
} from "@monorepo/shared";

const stringData = getFileContentAsString("./data/input.txt");

const rucksacks = stringData.trim().split("\n");

const compartments = rucksacks.map((rucksack) => {
  const compartmentA = rucksack.slice(0, rucksack.length / 2).split("");
  const compartmentB = rucksack.slice(rucksack.length / 2).split("");

  return [compartmentA, compartmentB];
});

const duplicates = compartments.map(([compartmentA, compartmentB]) => {
  const intersection = getIntersection(compartmentA, compartmentB);

  // Assume all duplicates are same
  return intersection[0];
});

function prioritizeItem(item: string): number {
  const letterScore = item.toLowerCase().charCodeAt(0) - 96;
  return isLowerCase(item) ? letterScore : letterScore + 26;
}

const duplicatePriorities = duplicates.map(prioritizeItem);

console.log("Part 1 (duplicates priority total):", sum(...duplicatePriorities));

const groups = chunk(rucksacks, 3);
const badges = groups.map((group) => {
  const [rucksackA, rucksackB, rucksackC] = group;
  const intersection = getIntersection(
    rucksackA.split(""),
    getIntersection(rucksackB.split(""), rucksackC.split(""))
  );
  return intersection[0];
});

const badgePriorities = badges.map(prioritizeItem);

console.log("Part 2 (badge priority total):", sum(...badgePriorities));
