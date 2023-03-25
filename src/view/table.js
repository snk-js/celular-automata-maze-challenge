


export const createTable = (cellsMatrix) => {
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



export const resetTable = (state) => {
  const oldTable = document.getElementsByTagName('table')[0]
  oldTable.remove()
  state.pop()
  state.push(cellsMatrix(celular_automata_input_easy))
  div.appendChild(createTable(initialState[0]))
}

export const fluxTable = (newTable, state) => {
  const oldTable = document.getElementsByTagName('table')[0]
  if (!newTable) {
    resetTable(state)
    return
  }
  if (newTable === 'out of bounds') {
    newTable && oldTable.parentNode.replaceChild(oldTable, oldTable)
    return
  }
  newTable && oldTable.parentNode.replaceChild(createTable(newTable), oldTable)
}

