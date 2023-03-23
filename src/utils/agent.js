import { getIndex } from './2darray.js'

export const validateSwap = (finalPosIncrementVec, currentPosVec, matrix, rowLen, colLen) => {
  const [rowAddition, columnAddition] = finalPosIncrementVec;
  const [row, column] = currentPosVec;
  const [finalRow, finalColumn] = [row + rowAddition, column + columnAddition];
  if (finalRow >= 0 && finalRow < rowLen && finalColumn >= 0 && finalColumn < colLen) {
    const index = getIndex(finalRow, finalColumn, colLen);
    if (matrix[index] !== 0) {
      return false;
    } else {
      return [finalRow, finalColumn];
    }
  } else {
    // 'out of bounds'
    return false;
  }
};

export const agentStep = (matrix, step, agentPos, rowLen, colLen) => {
  const finalPosIncrementVec = step === 'ArrowRight' ? [0, 1] : step === 'ArrowLeft' ? [0, -1] : step === 'ArrowUp' ? [-1, 0] : step === 'ArrowDown' ? [1, 0] : [0, 0];
  const validationResult = validateSwap(finalPosIncrementVec, agentPos, matrix, rowLen, colLen);
  if (!validationResult) {
    const index = getIndex(agentPos[0] + finalPosIncrementVec[0], agentPos[1] + finalPosIncrementVec[1], colLen);
    matrix[index] = 3;
    return matrix;
  }
  const finalIndex = getIndex(validationResult[0], validationResult[1], colLen);
  matrix[finalIndex] = 3;
  return matrix;
};