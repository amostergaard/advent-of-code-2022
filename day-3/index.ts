import { readFileSync } from "fs";

const buffer = readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const rucksacks = stringData.trim().split("\n");

const compartments = rucksacks.map((rucksack) => {
  const compartmentA = rucksack.slice(0, rucksack.length / 2).split("");
  const compartmentB = rucksack.slice(rucksack.length / 2).split("");

  return [compartmentA, compartmentB];
});

function getIntersection<T>(arr1: T[], arr2: T[]) {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const intersection = new Set(
    [...set1].filter((element) => set2.has(element))
  );

  return [...intersection];
}

const duplicates = compartments.map(([compartmentA, compartmentB]) => {
  const intersection = getIntersection(compartmentA, compartmentB);

  // Assume all duplicates are same
  return intersection[0];
});

function isLowerCase(letter: string): boolean {
  return letter === letter.toLowerCase();
}

function prioritizeItem(item: string): number {
  const letterScore = item.toLowerCase().charCodeAt(0) - 96;
  return isLowerCase(item) ? letterScore : letterScore + 26;
}

const duplicatePriorities = duplicates.map(prioritizeItem);

const duplicatePriorityTotal = duplicatePriorities.reduce(
  (curr, val) => curr + val,
  0
);

console.log("Part 1 (duplicates priority total):", duplicatePriorityTotal);

function chunk<T>(arr: T[], chunkSize: number) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

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

const badgePriorityTotal = badgePriorities.reduce((curr, val) => curr + val, 0);

console.log("Part 2 (badge priority total):", badgePriorityTotal);
