
export const validateSwap = (finalPosIncrementVec, currentPosVec, matrix, rowLen, colLen) => {
  const [rowAddition, columnAddition] = finalPosIncrementVec
  if (!currentPosVec.length) { return false }
  const [row, column] = currentPosVec.pop()
  const [finalRow, finalColumn] = [row + rowAddition, column + columnAddition]
  if ((finalRow >= 0) && (finalRow < rowLen) && (finalColumn >= 0) && (finalColumn < colLen)) {
    if (!matrix[finalRow][finalColumn] == 0) {
      return [row, column]
    } else {
      currentPosVec.push([finalRow, finalColumn])
      return [finalRow, finalColumn]
    }
  } else {
    // 'out of bounds'
    return [row, column]
  }
}


export const agentStep = (matrix, step, agentPos, rowLen, colLen) => {
  const validationResult = validateSwap(step, agentPos, matrix, rowLen, colLen)
  validationResult && (matrix[validationResult[0]][validationResult[1]] = 3)
  return validationResult && matrix
}
