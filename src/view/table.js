import { agentStep } from "../utils/agent.js"

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

import { tick } from "../utils/rules.js"

export const onTick = (event, state) => {
  const rowLen = state[0].length
  const colLen = state[0][0].length
  const key = event.key
  const [newMatrix, newAgent, oldMatrix] = tick(state[0], rowLen, colLen);
  const updatedMatrix = agentStep(newMatrix, key, newAgent, rowLen, colLen)
  if (!updatedMatrix) fluxTable(oldMatrix, state[0])
  state.pop()
  state.push(updatedMatrix)
  fluxTable(updatedMatrix)
}
