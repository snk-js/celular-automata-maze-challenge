const getAdjacentCells = (row, col, matrix) => {
  const adjacentCells = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rowLen && newCol >= 0 && newCol < colLen) {
          adjacentCells.push(matrix[newRow][newCol]);
        }
      }
    }
  }
  return adjacentCells;
};

const getAdjacentOnes = (i, j, matrix, newRowLength, newColLength) => {
  const adjacentCells = getAdjacentCells(i, j, matrix, newRowLength, newColLength);
  return adjacentCells.filter((cell) => cell === 1).length;
}