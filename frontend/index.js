

const div = document.createElement('div');
div.setAttribute("class", "container")

const celular_automata_input_easy = 

`3 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0
0 0 1 0 1 1 0 0
0 1 1 0 0 1 1 0
0 0 1 0 1 1 0 0
0 0 0 0 1 0 0 0
0 0 0 0 0 0 0 4`

const cellsMatrix = (input) => {
  const splited = input.split('\n').map((row) => row.split(' ').map((cell) => parseInt(cell)))
  return splited
}

const initialState = [cellsMatrix(celular_automata_input_easy)]

const resetTable = () => {
  const oldTable = document.getElementsByTagName('table')[0]
  oldTable.remove()
  initialState.pop()
  initialState.push(cellsMatrix(celular_automata_input_easy))
  div.appendChild(createTable(initialState[0]))
}

const changeAgentPosition = (event) => {
  const key = event.key
  const newTable = agentStep(initialState[0], key)
  const oldTable = document.getElementsByTagName('table')[0]
  if(!newTable) {
    resetTable()
    return
  }
  newTable && oldTable.parentNode.replaceChild(createTable(newTable), oldTable)
}

document.addEventListener('keydown', changeAgentPosition)

div.appendChild(createTable(initialState[0]))
document.getElementsByTagName('body')[0].appendChild(div)

