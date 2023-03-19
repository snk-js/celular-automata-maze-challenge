
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

const validateSwap = (finalPosIncrementVec, currentPosVec, matrix) => {
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
  console.log({ matrix, step, agentPos }, 'lol')
  const finalPosIncrementVec = step === 'ArrowRight' ? [0, 1] : step === 'ArrowLeft' ? [0, -1] : step === 'ArrowUp' ? [-1, 0] : step === 'ArrowDown' ? [1, 0] : [0, 0]

  const validationResult = validateSwap(finalPosIncrementVec, agentPos, matrix)

  if (validationResult === 'out of bounds') {
    return validationResult
  }

  validationResult && (matrix[validationResult[0]][validationResult[1]] = 3)
  return matrix
}

const resetTable = () => {
  const oldTable = document.getElementsByTagName('table')[0]
  oldTable.remove()
  initialState.pop()
  initialState.push(cellsMatrix(celular_automata_input_easy))
  div.appendChild(createTable(initialState[0]))
}

const fluxTable = (newTable) => {
  const oldTable = document.getElementsByTagName('table')[0]

  if (!newTable) {
    resetTable()
    return
  }

  if (newTable === 'out of bounds') {
    newTable && oldTable.parentNode.replaceChild(oldTable, oldTable)
    return
  }
  newTable && oldTable.parentNode.replaceChild(createTable(newTable), oldTable)
}

const changeAgentPosition = (event) => {
  const key = event.key
  const [newMatrix, newAgent] = tick(initialState[0]);

  const updatedMatrix = agentStep(newMatrix, key, newAgent)

  initialState.pop()
  initialState.push(updatedMatrix)

  fluxTable(updatedMatrix)
}
