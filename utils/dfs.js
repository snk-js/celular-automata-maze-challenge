import { getNeighborsFromList } from './adjacency.js';
import { heuristic } from './heuristics.js';

export function gbfs(states, start, target, colLen, rowLen) {
  let visited = new Set();
  let frontier = [];

  frontier.push([0, start, 0]);
  visited.add(start + '|0');
  let parentMap = new Map();

  while (frontier.length > 0) {
    frontier.sort((a, b) => a[0] - b[0]);
    let [_, current, tickCount] = frontier.shift();

    console.log(current)
    if (current === target) {
      return constructPath(parentMap, start, current, tickCount);
    }

    const [livingOnes, deadOnes] = getNeighborsFromList(current, states, colLen, rowLen, true);

    for (let neighbor of deadOnes) {
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

export function constructPath(parentMap, start, current, tickCount) {
  let path = [current];
  while (current !== start) {
    const currentKey = current + '|' + tickCount;
    const [previous, previousTickCount] = parentMap.get(currentKey) || [null, null];
    if (previous === null) break;
    path.unshift(previous);
    current = previous;
    tickCount = previousTickCount;
  }
  console.log({ parentMap })
  return path;
}