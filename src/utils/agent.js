
export const validateSwap = (finalPosIncrementVec, currentPosVec, matrix, rowLen, colLen) => {
  const [rowAddition, columnAddition] = finalPosIncrementVec
  const [row, column] = currentPosVec
  const [finalRow, finalColumn] = [row + rowAddition, column + columnAddition]
  if ((finalRow >= 0) && (finalRow < rowLen) && (finalColumn >= 0) && (finalColumn < colLen)) {
    if (!matrix[finalRow][finalColumn] == 0) {
      return false
    } else {
      return [finalRow, finalColumn]
    }
  } else {
    // 'out of bounds'
    return false
  }
}


export const agentStep = (matrix, step, agentPos, rowLen, colLen) => {
  const validationResult = validateSwap(step, agentPos, matrix, rowLen, colLen)
  if (!validationResult) {
    matrix[step[0]][step[1]] = 3;
    return matrix
  }
  validationResult && (matrix[validationResult[0]][validationResult[1]] = 3)
  return matrix
}
