import { matrixToListIdx } from './transforms.js'
export const getNeighborsFromMatrix = (row, col, matrix) => {
  const lives = [];
  const dead = [];

  const neighbors = [
    [row - 1, col],     // Up
    [row + 1, col],     // Down
    [row, col - 1],     // Left
    [row, col + 1],     // Right
    [row - 1, col - 1], // Up Left
    [row - 1, col + 1], // Up Right
    [row + 1, col - 1], // Down Left
    [row + 1, col + 1], // Down Right
  ];

  for (const [neighborRow, neighborCol] of neighbors) {
    const node = matrix[neighborRow] && matrix[neighborRow][neighborCol]
    const allowedNodes = [0, 1, 3, 4]
    const idx = matrixToListIdx(neighborRow, neighborCol, matrix[0].length)
    if (
      allowedNodes.includes(node) && neighborRow >= 0 &&
      neighborRow < matrix.length &&
      neighborCol >= 0 &&
      neighborCol < matrix[0].length
    ) {
      if (node == 0) {
        dead.push(idx);
      } else if (node === 1) {
        lives.push(idx);
      }
    }
  }
  return [lives, dead];
};

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
    if (list[neighborIndex]) {
      !["1", "2", "4", "5"].includes(list[neighborIndex][2]) &&
        (list[neighborIndex][0] ? lives.push(neighborIndex) : dead.push(neighborIndex))
    }
  }
  return [lives, dead];
};


