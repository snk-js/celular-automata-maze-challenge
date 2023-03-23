export const array2DToAdjacencyList = (matrix) => {
  const adjacencyList = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      const currentNode = matrix[row][col]
      adjacencyList.push([(currentNode === 1 ? true : false), getAdjacentOnes(row, col, matrix)])
    }
  }

  return adjacencyList;
}


export const getAdjacentOnes = (row, col, matrix) => {
  let adjacentOnes = 0

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
    const neighbor = matrix[neighborRow] && matrix[neighborRow][neighborCol];
    if (neighbor === 1) {
      adjacentOnes += 1
    }
  }
  return adjacentOnes
}

export const getAdjacentOnesFromFlatArray = (index, adjacencyList, rowLen, colLen) => {
  let adjacentOnes = 0;
  const [row, col] = [Math.floor(index / colLen), index % colLen];

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
    const isValidNeighbor =
      neighborIndex >= 0 &&
      neighborIndex < rowLen * colLen &&
      !(col === 0 && [index - 1, index - colLen - 1, index + colLen - 1].includes(neighborIndex)) &&
      !(col === colLen - 1 && [index + 1, index - colLen + 1, index + colLen + 1].includes(neighborIndex));

    if (isValidNeighbor && adjacencyList[neighborIndex][0]) {
      adjacentOnes += 1;
    }
  }
  return adjacentOnes;
};

export const tick = (adjacencyList) => {
  const newAdjacencyList = adjacencyList.map(([live, livingNeighbors]) => {
    if (!live && livingNeighbors > 1 && livingNeighbors < 5) {
      return [true, null];
    } else if (live && !(livingNeighbors > 3 && livingNeighbors < 5)) {
      return [false, null];
    } else {
      return [live, livingNeighbors];
    }
  });

  newAdjacencyList.forEach((_, index) => {
    newAdjacencyList[index][1] = getAdjacentOnesFromFlatArray(index, newAdjacencyList, adjacencyList.length, adjacencyList[0].length);
  });

  return newAdjacencyList;
};