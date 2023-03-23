import { getAdjacentOnes } from "./adjacency.js";

export const tick = (matrix, rowLen, colLen) => {
  const newMatrix = matrix.map((row) => row.slice());
  const newAgent = []
  // measure time for each tick
  const startTime = performance.now();
  console.log(rowLen, colLen)

  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      if (newMatrix[i] && (newMatrix[i][j] = 4)) { newMatrix[i][j] = 0 }
      const cell = matrix[i] && matrix[i][j];
      if (i == 64 && j == 80) console.log(cell)
      if (cell == 3) {
        newAgent.push([i, j])
      }

      const adjacentOnes = getAdjacentOnes(i, j, matrix, rowLen, colLen)
      if ((cell == 0 || cell == 3) && adjacentOnes > 1 && adjacentOnes < 5) {
        newMatrix[i][j] = 1;
        if (cell == 3) { newAgent.push([i, j]) }
      } else if (cell === 1 && !(adjacentOnes > 3 && adjacentOnes < 5)) {
        newMatrix[i][j] = 0;
      } else if (cell == 3) {
        newMatrix[i][j] = 0;
        newAgent.push([i, j])
      }
    }
  }
  const endTime = performance.now();
  const timeTaken = endTime - startTime;
  console.log(`Time taken in ms: ${timeTaken}`);
  return [newMatrix, newAgent.pop(), matrix]
};

