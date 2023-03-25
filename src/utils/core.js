
import { getNeighborsFromList, getNeighborsFromMatrix } from './adjacency.js'

export const initializeState = (matrix) => {
  const adjacencyList = [];
  const rowLen = matrix.length;
  const colLen = matrix[0].length;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const currentNode = matrix[row][col];
      const nodeState = currentNode === 1 ? true : false;
      const neighbors = getNeighborsFromMatrix(row, col, matrix);
      let nodeChar;
      currentNode === 3 ? nodeChar = "2" : currentNode === 4 ? nodeChar = "4" : nodeChar = undefined;
      adjacencyList.push([nodeState, neighbors, nodeChar]);
    }
  }

  return adjacencyList;
}


export const tick = (adjacencyList, colLen) => {
  const updatedList = JSON.parse(JSON.stringify(adjacencyList));

  adjacencyList.forEach(([live, [alives]], index) => {
    const livingNeighbors = alives.length;
    if (!live && livingNeighbors > 1 && livingNeighbors < 5) {
      updatedList[index][0] = true;
    } else if (live && !(livingNeighbors > 3 && livingNeighbors < 5)) {
      updatedList[index][0] = false;
    } else {
      updatedList[index][0] = live;
    }
    updatedList[index][1] = getNeighborsFromList(index, adjacencyList, colLen);
  });

  return updatedList;
};