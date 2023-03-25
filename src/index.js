
import { createTable, fluxTable } from "./view/table.js";
import { cellsMatrix, adjacencyListTo2DArray } from "./utils/transforms.js";
import { input } from "../processData.js";
import { allowedKeys } from './utils/maps.js'
import { array2DToAdjacencyList, tick } from './utils/graph.js'
import { agentStep } from './utils/agent.js'


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

const getGraph = () => array2DToAdjacencyList(initialState[0])

const agentPos = [[0, 0]]

const onTick = (direction) => {
  if (!direction) return
  const rowLen = initialState[0].length
  const colLen = initialState[0][0].length

  const newAdjacencyList = tick(getGraph(), rowLen, colLen);
  const updated2DMatrix = adjacencyListTo2DArray(newAdjacencyList, rowLen, colLen)

  const step = agentStep(updated2DMatrix, direction, agentPos, rowLen, colLen)

  console.log(initialState);
  if (!step) { fluxTable(initialState[0]); return };
  initialState.pop()
  initialState.push(step) && fluxTable(initialState[0]);
}

document.addEventListener('keydown', (event) => onTick(allowedKeys(event.key), initialState))

div.appendChild(createTable(initialState[0]))
document.getElementsByTagName('body')[0].appendChild(div)

