
import { getNeighborsFromList } from './adjacency.js'
export const initializeState = (matrix, startingPoint, targetPoint) => {
  const adjacencyList = [];
  const rowLen = matrix.length;
  const colLen = matrix[0].length;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const index = row * colLen + col;
      const currentNode = matrix[row][col];
      const nodeState = currentNode === 1 ? true : false;
      const neighbors = getNeighborsFromList(index, matrix, colLen);

      let nodeCharacteristic;
      if (index === startingPoint) {
        nodeCharacteristic = "1";
      } else if (index === targetPoint) {
        nodeCharacteristic = "4";
      } else {
        nodeCharacteristic = undefined;
      }

      adjacencyList.push([nodeState, neighbors, nodeCharacteristic]);
    }
  }

  return adjacencyList;
}


export const tick = (adjacencyList, colLen) => {
  adjacencyList.forEach(([live, [alives]], index) => {
    const livingNeighbors = alives.length;
    if (!live && livingNeighbors > 1 && livingNeighbors < 5) {
      adjacencyList[index][0] = true
    } else if (live && !(livingNeighbors > 3 && livingNeighbors < 5)) {
      adjacencyList[index][0] = false
    } else {
      adjacencyList[index][0] = live
    }
    adjacencyList[index][1] = getNeighborsFromList(index, adjacencyList, colLen);
  });

  return true;
};