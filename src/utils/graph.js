
import { getNeighborsFromList } from './adjacency'
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
