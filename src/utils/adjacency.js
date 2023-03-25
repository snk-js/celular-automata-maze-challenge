
export const getNeighbors = (row, col, matrix) => {
  let adjacentOnes = 0
  const result = []
  const neighbors = [
    [row - 1, col], // Up
    [row + 1, col], // Down
    [row, col - 1], // Left
    [row, col + 1], // Right
    [row - 1, col - 1], // Up Left
    [row - 1, col + 1], // Up Right
    [row + 1, col - 1], // Down Left
    [row + 1, col + 1], // Down Right
  ];
  for (const [neighborRow, neighborCol] of neighbors) {
    const neighbor = matrix[neighborRow] && matrix[neighborRow][neighborCol] && result.push([neighborRow, neighborCol])

    if (neighbor === 1) {
      adjacentOnes += 1
    }
  }
  return adjacentOnes
}

export const getNeighborsFromList = (index, list, rowLen, colLen) => {
  const lives = [];
  const dead = [];
  const [_, col] = [Math.floor(index / colLen), index % colLen];

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