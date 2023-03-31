import { getValidNeighbors } from './adjacency.js';
import { listToMatrixIdx } from './transforms.js'
import { constructPath } from './path.js';

function heuristic(current, target, colLen) {
  const [currentRow, currentCol] = listToMatrixIdx(current, colLen)
  const [targetRow, targetCol] = listToMatrixIdx(target, colLen)

  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
}


export function gbfs(states, start, target, colLen, rowLen) {
  let visited = new Set();
  let frontier = [];

  frontier.push([0, start, 0]);
  visited.add(start + '|0');
  let parentMap = new Map();

  while (frontier.length > 0) {
    frontier.sort((a, b) => a[0] - b[0]);
    let [_, current, tickCount] = frontier.shift();
    const [currentRow, currentCol] = listToMatrixIdx(current, colLen);
    const [targetRow, targetCol] = listToMatrixIdx(target, colLen);

    if (currentRow === targetRow && currentCol === targetCol) {
      let path = constructPath(parentMap, start, current, tickCount);
      return path;
    }

    const deadNeighbors = getValidNeighbors(current, states, tickCount, colLen, rowLen);

    for (let neighbor of deadNeighbors) {
      const newTickCount = tickCount + 1;
      const neighborKey = neighbor + '|' + newTickCount;
      if (visited.has(neighborKey) && neighbor !== 0) {
        continue;
      }

      parentMap.set(neighborKey, [current, tickCount]);
      visited.add(neighborKey);
      let h = heuristic(neighbor, target, colLen);
      frontier.push([h, neighbor, newTickCount]);
    }
  }

  return null; // No path found
}
