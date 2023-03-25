
export const cellsMatrix = (input) => {
  const splited = input.split('\n').map((row) => row.split(' ').map((cell) => parseInt(cell)))
  return splited
}

export const adjacencyListTo2DArray = (adjacencyList, rowLen, colLen) => {
  const matrix = [];

  for (let i = 0; i < rowLen; i++) {
    const row = [];
    for (let j = 0; j < colLen; j++) {
      const index = i * colLen + j;
      row.push(adjacencyList[index][0] ? 1 : 0);
    }
    matrix.push(row);
  }

  return matrix;
};

