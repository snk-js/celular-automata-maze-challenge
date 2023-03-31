
import { matrixToListIdx } from './transforms.js';

const keysToMoves = (colLen) => [
  ["ArrowRight", matrixToListIdx(0, 1, colLen)],
  ["ArrowLeft", matrixToListIdx(0, -1, colLen)],
  ["ArrowUp", matrixToListIdx(-1, 0, colLen)],
  ["ArrowDown", matrixToListIdx(1, 0, colLen)],
];

const stringToMoves = (colLen) => [
  ["R", matrixToListIdx(0, 1, colLen)],
  ["L", matrixToListIdx(0, -1, colLen)],
  ["U", matrixToListIdx(-1, 0, colLen)],
  ["D", matrixToListIdx(1, 0, colLen)],
];

export const allowedKeys = (entry, colLen) => {
  const movesMap = keysToMoves(colLen).reduce((acc, [key, move]) => {
    acc[key] = move;
    return acc;
  }, {});

  return movesMap[entry];
};

export const allowedKeysForStrings = (entry, colLen) => {
  const movesMap = stringToMoves(colLen).reduce((acc, [key, move]) => {
    acc[key] = move;
    return acc;
  }, {});

  return movesMap[entry];
};

export const createIndexMap = (rowLen, colLen) => {
  const indexMap = new Map();
  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      indexMap.set(matrixToListIdx(row, col, colLen), [row, col]);
    }
  }
  return indexMap;
};
