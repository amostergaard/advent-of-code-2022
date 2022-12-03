const fs = require("fs");

const buffer = fs.readFileSync("./data/input.txt");

const stringData = buffer.toString("utf-8");

const rucksacks = stringData
  .trim()
  .split("\n")
  .map((rucksack) => {
    const compartmentA = rucksack.slice(0, rucksack.length / 2).split("");
    const compartmentB = rucksack.slice(rucksack.length / 2).split("");

    return [compartmentA, compartmentB];
  });

const duplicates = rucksacks.map(([compartmentA, compartmentB]) => {
  const intersection = compartmentA.filter((item) =>
    compartmentB.includes(item)
  );

  // Assume all duplicates are same
  return intersection[0];
});

function isLowerCase(letter) {
  return letter === letter.toLowerCase();
}

const priorities = duplicates.map((duplicate) => {
  const letterScore = duplicate.toLowerCase().charCodeAt(0) - 96;
  return isLowerCase(duplicate) ? letterScore : letterScore + 26;
});

const priorityTotal = priorities.reduce((curr, val) => curr + val, 0);

console.log("Part 1 (priority total):", priorityTotal);
