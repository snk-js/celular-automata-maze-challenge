
import { getNeighborsFromList } from './adjacency'

export const initializeState = (matrix, startingPoint, targetPoint) => {
  // change to set the aditicional characteristic of the node
  // according to   // // idx: [ (live | dead):boolean, [ [...liveIdxs: number] , [...deadIdxs: number] ], ("1" | "2" | "3" | "4" | "5") ]

  // and
  // where {
  //  1:  cell is starting point,
  //  2:  cell is the target point holding the observer,
  //  3:  cell just contains the observer, 
  //  4:  cell is the target point,
  //  5:  cell is the target point and has the observer
  //  none: when cell have no characteristic and just represent their state (alive or dead)
  // }
  const adjacencyList = [];
  const rowLen = matrix.length;
  const colLen = matrix[0].length;

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      // set startingPoint (updating the adjancency list with the starting poing holding the observer)
      // set targetPoint (updating the adjancency list with the target point holding the observer)

      const index = row * colLen + col;
      const currentNode = matrix[row][col];
      const nodeState = currentNode === 1 ? true : false;
      const neighbors = getNeighborsFromList(index, matrix, colLen);
      adjacencyList.push([nodeState, neighbors]);
    }
  }

  return adjacencyList;
}


export const tick = (adjacencyList, rowLen, colLen) => {
  const state = new Map()
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
    newAdjacencyList[index][1] = getNeighborsFromList(index, newAdjacencyList, colLen);
  });

  // in the form of 
  // idx: [ (live | dead):boolean, [ [...liveIdxs: number] , [...deadIdxs: number] ] ]
  return newAdjacencyList;
};