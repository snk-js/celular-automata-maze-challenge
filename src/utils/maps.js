
import { listToIndex } from './transforms.js';

const keysToMoves = (colLen) => [
  ["ArrowRight", listToIndex(0, 1, colLen)],
  ["ArrowLeft", listToIndex(0, -1, colLen)],
  ["ArrowUp", listToIndex(-1, 0, colLen)],
  ["ArrowDown", listToIndex(1, 0, colLen)],
];


export const allowedKeys = (entry, colLen) => {
  const movesMap = keysToMoves(colLen).reduce((acc, [key, move]) => {
    acc[key] = move;
    return acc;
  }, {});

  return movesMap[entry];
};