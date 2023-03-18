
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

const createTable = (cellsMatrix) => {
  const table = document.createElement('table')
  table.setAttribute("class", "table")
  cellsMatrix.forEach((row) => {
    const tr = document.createElement('tr')
    row.forEach((cell) => {
      const td = document.createElement('td')
      td.setAttribute("class", "cell")
      td.innerHTML = cell
      tr.appendChild(td)
    })
    table.appendChild(tr)
  })
  return table
}

div.appendChild(createTable(cellsMatrix(celular_automata_input_easy)))
document.getElementsByTagName('body')[0].appendChild(div)

