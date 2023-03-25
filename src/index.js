import { createTable, fluxTable } from "./view/table.js";
import { cellsMatrix, adjacencyListTo2DArray } from "./utils/transforms.js";
import { input } from "../processData.js";
import { allowedKeys } from './utils/maps.js';
import { initializeState, tick } from './utils/graph.js';
import { validateSwap, updateObserverPosition } from './utils/agent.js';

const div = document.createElement('div');
div.setAttribute("class", "container");

const celular_automata_input_easy =
  `3 0 0 0 0 0 0 0
0 0 0 0 1 0 0 0
0 0 1 0 1 1 0 0
0 1 1 0 0 1 1 0
0 0 1 0 1 1 0 0
0 0 0 0 1 0 0 0
0 0 0 0 0 0 0 4`;

const largeInput = await cellsMatrix(await input);
const initialStateMatrix = largeInput || cellsMatrix(celular_automata_input_easy);
const rowLen = initialStateMatrix.length;
const colLen = initialStateMatrix[0].length;

let agentPos = [0]; // Initial position
const initialState = initializeState(initialStateMatrix, agentPos[0], rowLen * colLen);

const getGraph = () => initialState;


const onTick = (direction) => {
  if (!direction) return;

  const newAdjacencyList = tick(getGraph(), rowLen, colLen);

  const newPos = validateSwap(direction, agentPos, newAdjacencyList, rowLen, colLen);

  // if newPos is valida (true), use updateObserverPosition to update the adjacency list with the new position
  // if not, back everything to the previous state
  agentPos = updateObserverPosition(agentPos, newPos);

  fluxTable(adjacencyListTo2DArray(newAdjacencyList, rowLen, colLen));
};

document.addEventListener('keydown', (event) => onTick(allowedKeys(event.key, colLen)));

div.appendChild(createTable(initialState, rowLen, colLen));
document.getElementsByTagName('body')[0].appendChild(div);