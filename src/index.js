
import { onTick, createTable } from "./view/table.js";
import { cellsMatrix } from "./utils/transforms.js";
import { input } from "../processData.js";
import { allowedKeys } from './utils/maps.js'
import { array2DToAdjacencyList } from './utils/graph.js'


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

const largeInput = await cellsMatrix(await input)

const initialState = [largeInput || cellsMatrix(celular_automata_input_easy)]

const graph = array2DToAdjacencyList(initialState[0])

console.log({ graph }, initialState[0].length * initialState[0][0].length);

document.addEventListener('keydown', (event) => allowedKeys(event.key) && onTick(event, initialState))

div.appendChild(createTable(initialState[0]))
document.getElementsByTagName('body')[0].appendChild(div)

