
export const cellsMatrix = (input) => {
  const splited = input.split('\n').map((row) => row.split(' ').map((cell) => parseInt(cell)))
  return splited
}

export const matrixToListIdx = (row, col, colLen) => {
  return row * colLen + col;
}

export const listToMatrixIdx = (index, colLen) => {
  return [Math.floor(index / colLen), index % colLen];
}

export function mapToObject(map) {
  const obj = {};
  for (let [key, value] of map) {
    obj[key] = value;
  }
  return obj;
}

export function objectToMap(obj) {
  const map = new Map();
  for (let key in obj) {
    map.set(parseInt(key), obj[key]);
  }
  return map;
}