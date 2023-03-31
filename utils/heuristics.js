import { listToMatrixIdx } from './transforms.js';

export function heuristic(current, target, colLen) {
  const [currentRow, currentCol] = listToMatrixIdx(current, colLen)
  const [targetRow, targetCol] = listToMatrixIdx(target, colLen)

  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
}
