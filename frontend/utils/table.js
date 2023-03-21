
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

const onTick = (event) => {
  const key = event.key
  const [newMatrix, newAgent, oldMatrix] = tick(initialState[0]);
  const updatedMatrix = agentStep(newMatrix, key, newAgent)
  if (!updatedMatrix) fluxTable(oldMatrix)
  initialState.pop()
  initialState.push(updatedMatrix)
  fluxTable(updatedMatrix)
}
