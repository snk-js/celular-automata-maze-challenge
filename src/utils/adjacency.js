import { getIndex } from './2darray.js'


export const getAdjacentOnes = (row, col, matrix, rowLen, colLen) => {
  let count = 0;
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  directions.forEach(([dr, dc]) => {
    const newRow = row + dr;
    const newCol = col + dc;

    if (newRow >= 0 && newRow < rowLen && newCol >= 0 && newCol < colLen) {
      const index = getIndex(newRow, newCol, colLen);
      if (matrix[index] === 1) {
        count++;
      }
    }
  });

  return count;
};