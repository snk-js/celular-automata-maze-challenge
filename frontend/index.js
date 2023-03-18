

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

const initialState = cellsMatrix(celular_automata_input_easy)

const changeAgentPosition = (event) => {
  const key = event.key
  const newTable = agentStep(initialState, key)
  const oldTable = document.getElementsByTagName('table')[0]
  newTable && oldTable.parentNode.replaceChild(createTable(newTable), oldTable)
}

document.addEventListener('keydown', changeAgentPosition)

div.appendChild(createTable(initialState))
document.getElementsByTagName('body')[0].appendChild(div)

