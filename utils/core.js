
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


export const tick = (list, colLen) => {
  list.forEach(([live, [alives]], index) => {

    const filteredLives = alives.filter((alive) => {
      return list[alive][2] !== "4" && list[alive][2] !== "2";
    })

    const livingNeighbors = filteredLives.length;
    if (!live && livingNeighbors > 1 && livingNeighbors < 5) {
      list[index][0] = true;
    } else if (live && livingNeighbors > 3 && livingNeighbors < 6) {
      list[index][0] = true;
    } else {
      list[index][0] = false;
    }
  });

  list.forEach((_, index) => {
    list[index][1] = getNeighborsFromList(index, list, colLen);
  });

  return list;
};