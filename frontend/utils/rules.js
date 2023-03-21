

const tick = (matrix, updateTable) => {
  const newMatrix = matrix.map((row) => row.slice());
  const newAgent = []
  for (let i = 0; i < rowLen; i++) {
    for (let j = 0; j < colLen; j++) {
      const cell = matrix[i][j];

      const adjacentOnes = getAdjacentOnes(i, j, matrix)

      if ((cell == 0 || cell == 3) && adjacentOnes > 1 && adjacentOnes < 4) {
        newMatrix[i][j] = 1;
        if (cell == 3) newAgent.push([i, j])
      } else if (cell === 1 && !(adjacentOnes > 3 && adjacentOnes <= 5)) {
        newMatrix[i][j] = 0;
      } else if (cell == 3) {
        newMatrix[i][j] = 0;
        newAgent.push([i, j])
      }
    }
  }
  return [newMatrix, newAgent.pop()]
};