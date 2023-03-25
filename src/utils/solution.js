
import { PriorityQueue } from './utils/PriorityQueue';

const heuristic = (a, b) => {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

// TODO: import getNeighbors

const aStar = (matrix, start, target) => {
  const openSet = new PriorityQueue();
  openSet.enqueue(start, 0);
  const cameFrom = new Map();
  const gScore = new Map();
  const fScore = new Map();

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const key = `${row},${col}`;
      gScore.set(key, Infinity);
      fScore.set(key, Infinity);
    }
  }

  gScore.set(`${start[0]},${start[1]}`, 0);
  fScore.set(`${start[0]},${start[1]}`, heuristic(start, target));

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();
    if (current[0] === target[0] && current[1] === target[1]) {
      // Target reached, reconstruct path
      const path = [current];
      while (cameFrom.has(`${current[0]},${current[1]}`)) {
        current = cameFrom.get(`${current[0]},${current[1]}`);
        path.unshift(current);
      }
      return path;
    }

    for (const neighbor of getNeighbors(current, matrix)) {
      const tentativeGScore = gScore.get(`${current[0]},${current[1]}`) + 1;
      const neighborKey = `${neighbor[0]},${neighbor[1]}`;
      if (tentativeGScore < gScore.get(neighborKey)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);
        fScore.set(neighborKey, tentativeGScore + heuristic(neighbor, target));

        if (!openSet.has(neighbor)) {
          openSet.enqueue(neighbor, fScore.get(neighborKey));
        }
      }
    }
  }

  // No path found
  return null;
}

const start = [0, 0];
const target = [65, 85];
const path = aStar(initialState[0], start, target);

if (path) {
  console.log("Path found:", path);
} else {
  console.log("No path found");
}