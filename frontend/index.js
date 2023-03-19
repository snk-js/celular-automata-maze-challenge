
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

const rowLen = initialState[0].length;
const colLen = initialState[0][0].length;

document.addEventListener('keydown', changeAgentPosition)

div.appendChild(createTable(initialState[0]))
document.getElementsByTagName('body')[0].appendChild(div)

