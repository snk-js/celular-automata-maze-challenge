const validateSwap = (finalPosIncrementVec, currentPosVec, matrix, reset) => {
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
    return 'out of bounds'
  }
}

const agentStep = (matrix, step, agentPos) => {
  const finalPosIncrementVec = step === 'ArrowRight' ? [0, 1] : step === 'ArrowLeft' ? [0, -1] : step === 'ArrowUp' ? [-1, 0] : step === 'ArrowDown' ? [1, 0] : [0, 0]
  const validationResult = validateSwap(finalPosIncrementVec, agentPos, matrix)
  if (!validationResult) return false
  validationResult && (matrix[validationResult[0]][validationResult[1]] = 3)
  return matrix
}