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

const flatTo2D = (flatArray, rowLen, colLen) => {
  return Array.from({ length: rowLen }, (_, i) =>
    flatArray.slice(i * colLen, (i + 1) * colLen)
  );
};


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
  const flatState = state[0].flat()
  const rowLen = state[0].length
  const colLen = state[0][0].length
  const key = event.key
  const [newMatrix, newAgent, oldMatrix] = tick(flatState, rowLen, colLen);
  const updatedMatrix = agentStep(newMatrix, key, newAgent, rowLen, colLen)
  // convert oldMatrix and newMatrix again to 2d array
  const updated2DMatrix = flatTo2D(updatedMatrix, rowLen, colLen)
  if (!updatedMatrix) fluxTable(oldMatrix, oldMatrix)
  state.pop()
  state.push(updated2DMatrix)
  fluxTable(updated2DMatrix)
}
