export const getAdjacentCells = (row, col, matrix, rowLen, colLen) => {
  const adjacentCells = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i !== 0 || j !== 0) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < rowLen && newCol >= 0 && newCol < colLen) {
          try {
            adjacentCells.push(matrix[newRow] && matrix[newRow][newCol]);

          } catch (e) {
            console.log(matrix, newRow, newCol)
          }
        }
      }
    }
  }
  return adjacentCells;
};

export const getAdjacentOnes = (i, j, matrix, newRowLength, newColLength) => {
  const adjacentCells = getAdjacentCells(i, j, matrix, newRowLength, newColLength);
  return adjacentCells.filter((cell) => cell === 1).length;
}
