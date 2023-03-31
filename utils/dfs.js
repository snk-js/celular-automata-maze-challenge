import { listToMatrixIdx } from './transforms.js';

function heuristic(current, target, colLen) {
  const [currentRow, currentCol] = listToMatrixIdx(current, colLen)
  const [targetRow, targetCol] = listToMatrixIdx(target, colLen)

  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
}

function getValidNeighbors(current, states, tickCount, colLen, rowLen) {
  const [row, col] = listToMatrixIdx(current, colLen);
  const directions = [
    [-1, 0], // up
    [0, 1], // right
    [1, 0], // down
    [0, -1], // left
  ];

  const deadNeighbors = [];
  for (const [dRow, dCol] of directions) {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (newRow >= 0 && newRow < rowLen && newCol >= 0 && newCol < colLen) {
      const neighborIdx = newRow * colLen + newCol;
      const [isLive, _, char] = states.get(tickCount)[neighborIdx];
      if (char === '4') {
        deadNeighbors.push(neighborIdx);
      }
      !isLive && deadNeighbors.push(neighborIdx);
    }
  }

  return deadNeighbors;
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

function constructPath(parentMap, start, current, tickCount) {
  let path = [current];
  while (current !== start) {
    const currentKey = current + '|' + tickCount;
    const [previous, previousTickCount] = parentMap.get(currentKey);
    path.unshift(previous);
    current = previous;
    tickCount = previousTickCount;
  }
  return path;
}

function pathToDirections(path, colLen) {
  const directions = [];
  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const diff = curr - prev;

    if (diff === 1) {
      directions.push('R');
    } else if (diff === -1) {
      directions.push('L');
    } else if (diff === colLen) {
      directions.push('B');
    } else if (diff === -colLen) {
      directions.push('T');
    }
  }
  return directions.join(' ');
}