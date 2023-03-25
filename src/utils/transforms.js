
export const cellsMatrix = (input) => {
  const splited = input.split('\n').map((row) => row.split(' ').map((cell) => parseInt(cell)))
  return splited
}

export const listToIndex = (row, col, colLen) => {
  return row * colLen + col;
}

export const indexToList = (index, colLen) => {
  return [Math.floor(index / colLen), index % colLen];
}
