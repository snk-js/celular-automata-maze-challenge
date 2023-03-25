import PriorityQueue from './priorityQueue';
import { listToIndex, indexToList } from './transforms'

const heuristic = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

const aStar = (list, start, target, rowLen, colLen) => {
  const queue = new PriorityQueue();
  queue.enqueue(start, 0);
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  for (let index = 0; index < rowLen * colLen; index++) {
    gScore.set(index, Infinity);
    fScore.set(index, Infinity);
  }

  const startIndex = listToIndex(start[0], start[1], colLen);
  const targetIndex = listToIndex(target[0], target[1], colLen);

  gScore.set(startIndex, 0);
  fScore.set(startIndex, heuristic(start, target));

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    if (current === targetIndex) {
      // Target reached, reconstruct path
      const path = [current];
      while (cameFrom.has(current)) {
        current = cameFrom.get(current);
        path.unshift(current);
      }
      return path.map(index => indexToList(index, colLen));
    }

    const [_, neighbors] = list[current];
    const liveNeighbors = neighbors[0];

    for (const neighborIndex of liveNeighbors) {
      const tentativeGScore = gScore.get(current) + 1;
      if (tentativeGScore < gScore.get(neighborIndex)) {
        cameFrom.set(neighborIndex, current);
        gScore.set(neighborIndex, tentativeGScore);
        fScore.set(neighborIndex, tentativeGScore + heuristic(indexToList(neighborIndex, colLen), target));

        if (!queue.has(neighborIndex)) {
          queue.enqueue(neighborIndex, fScore.get(neighborIndex));
        }
      }
    }
  }

  // No path found
  return null;
}