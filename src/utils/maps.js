
import { listToIndex } from './transforms.js';

export const allowedKeys = (entry, colLen) => {
  const keysToMoves = [
    ["ArrowRight", listToIndex(0, 1, colLen)],
    ["ArrowLeft", listToIndex(0, -1, colLen)],
    ["ArrowUp", listToIndex(-1, 0, colLen)],
    ["ArrowDown", listToIndex(1, 0, colLen)],
  ];

  const movesMap = keysToMoves.reduce((acc, [key, move]) => {
    acc[key] = move;
    return acc;
  }, {});

  return movesMap[entry];
};