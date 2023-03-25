

export const getNeighborsFromList = (index, list, colLen) => {
  const lives = [];
  const dead = [];

  const neighbors = [
    index - colLen, // Up
    index + colLen, // Down
    index - 1, // Left
    index + 1, // Right
    index - colLen - 1, // Up Left
    index - colLen + 1, // Up Right
    index + colLen - 1, // Down Left
    index + colLen + 1, // Down Right
  ];

  for (const neighborIndex of neighbors) {
    list[neighborIndex] && lives.push(neighborIndex) || dead.push(neighborIndex)
  }
  return [lives, dead]
};