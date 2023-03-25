
import { getNeighborsFromList } from './adjacency'

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

export const tick = (adjacencyList, rowLen, colLen) => {

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
    newAdjacencyList[index][1] = getNeighborsFromList(index, newAdjacencyList, rowLen, colLen);
  });

  // in the form of 
  // idx: [state, [ [...liveIdxs] , [...deadIdxs] ] ]
  return newAdjacencyList;
};