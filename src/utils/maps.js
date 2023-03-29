
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

export const createIndexMap = (rowLen, colLen) => {
  const indexMap = new Map();
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      const listIndex = row * colLen + col;
      indexMap.set(listIndex, [row, col]);
    }
  }
  return indexMap;
};