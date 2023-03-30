import { listToMatrixIdx } from './transforms.js';
import { tick } from './utils/core.js';

function heuristic(current, target, colLen) {
  const [currentRow, currentCol] = listToMatrixIdx(current, colLen)
  const [targetRow, targetCol] = listToMatrixIdx(target, colLen)
  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
}

export function gbfs(states, start, target, colLen, k = 3) {
  let visited = new Set();
  let frontier = [];
  let parentMap = new Map();
  let tickCount = 0;

  frontier.push([0, start]);
  visited.add(start);

  while (frontier.length > 0) {
    console.log(frontier.length);
    frontier.sort((a, b) => a[0] - b[0]);

    let [_, current] = frontier.shift();


    let [___, deadNeighbors] = states.get(tickCount)[current][1]
    tickCount++;

    for (let neighbor of deadNeighbors) {
      if (visited.has(neighbor) && neighbor !== 0) {
        continue;
      }

      if (neighbor === target) {
        // Target found, construct the path
        let path = [neighbor];
        while (current !== start) {
          path.unshift(current);
          current = parentMap.get(current);
        }
        return path;
      }

      visited.add(neighbor);
      parentMap.set(neighbor, current);
      let h = heuristic(neighbor, target, colLen);
      frontier.push([h, neighbor]);
    }
  }

  return null; // No path found
}





