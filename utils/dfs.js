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
      const [isLive] = states.get(tickCount)[neighborIdx];
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

  while (frontier.length > 0) {
    frontier.sort((a, b) => a[0] - b[0]);

    let [_, current, tickCount] = frontier.shift();

    const [currentRow, currentCol] = listToMatrixIdx(current, colLen);
    const [targetRow, targetCol] = listToMatrixIdx(target, colLen);

    // Check if current is at the top, bottom, left, or right of the target
    if (((currentRow === targetRow - 1 || currentRow === targetRow + 1) && currentCol === targetCol) ||
      ((currentCol === targetCol - 1 || currentCol === targetCol + 1) && currentRow === targetRow)) {
      return { currentRow, targetRow, 'at': { tickCount } }
    }

    const deadNeighbors = getValidNeighbors(current, states, tickCount, colLen, rowLen);

    for (let neighbor of deadNeighbors) {
      const newTickCount = tickCount + 1;
      const neighborKey = neighbor + '|' + newTickCount;
      if (visited.has(neighborKey) && neighbor !== 0) {
        continue;
      }

      visited.add(neighborKey);
      let h = heuristic(neighbor, target, colLen);
      frontier.push([h, neighbor, newTickCount]);
    }
  }

  return null; // No path found
}