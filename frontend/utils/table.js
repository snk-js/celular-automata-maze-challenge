
const createTable = (cellsMatrix) => {
  const table = document.createElement('table')
  table.setAttribute("class", "table")
  cellsMatrix.forEach((row) => {
    const tr = document.createElement('tr')
    row.forEach((cell) => {
      const td = document.createElement('td')
      td.setAttribute("class", "cell")
      td.setAttribute("state", cell)
      tr.appendChild(td)
    })
    table.appendChild(tr)
  })
  return table
}

const validateSwap = (columnLength, rowLength, finalPosIncrementVec, currentPosVec, matrix) => {
  const [rowAddition, columnAddition] = finalPosIncrementVec
  const [row, column] = currentPosVec

  const [finalRow, finalColumn] = [row + rowAddition, column + columnAddition]

  if((finalRow >= 0) && (finalRow < rowLength) && (finalColumn >= 0) && (finalColumn < columnLength)) {
    if (!matrix[finalRow][finalColumn] === 0) {
      return false
    } else {
      return [finalRow, finalColumn]
    }
  } else {
    return 'out of bounds'
  }
}

const agentStep = (matrix, step) => {
  console.log({step})
  const columnLength = matrix[0].length
  const rowLength = matrix.length
  const finalPosIncrementVec = step === 'ArrowRight' ? [0, 1] : step === 'ArrowLeft' ? [0, -1] : step === 'ArrowUp' ? [-1, 0] : step === 'ArrowDown' ? [1, 0] : [0, 0]
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(matrix[i][j] === 3) {
        const validationResult = validateSwap(columnLength, rowLength, finalPosIncrementVec, [i, j], matrix)
        if(validationResult === 'out of bounds') {
          break
        }
        if(!validationResult) {

        }
        matrix[i][j] = 0
        matrix[validationResult[0]][validationResult[1]] = 3
        return matrix
      }
    }
  }
}