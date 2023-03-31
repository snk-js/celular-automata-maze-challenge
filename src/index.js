import { createTable, fluxTable } from "./view/table.js";
import { cellsMatrix, objectToMap } from "../utils/transforms.js";
import { input } from "../processClientData.js";
import { allowedKeys } from '../utils/maps.js';
import { initializeState, tick } from '../utils/core.js';
import { validateSwap } from '../utils/agent.js';


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

const largeInput = false
const initialStateMatrix = largeInput || cellsMatrix(celular_automata_input_easy);
const rowLen = initialStateMatrix.length;
const colLen = initialStateMatrix[0].length;

let agentPos = [0] // Initial position

const state = [initializeState(initialStateMatrix)];

async function fetchResult() {
  const response = await fetch('/result');
  const result = await response.json();
  return { path: result.result, states: objectToMap(result.states) };
}
const { path, states } = await fetchResult();

let i = 0;

const onTick = (next) => {
  if (!next) return;
  const currentState = state.pop();
  const updatedState = states.get(i + 1);
  state.push(updatedState);

  console.log('currentState', currentState);

  const newPos = validateSwap(next, agentPos, updatedState);

  if (newPos !== false) {
    fluxTable(updatedState, rowLen, colLen, path);
    agentPos = [newPos];
    i++;
  } else {
    state.pop();
    state.push(currentState);
    fluxTable(currentState, rowLen, colLen, path);
  }
};

document.addEventListener('keydown', (event) => { onTick(allowedKeys(event.key, colLen)) });

div.appendChild(createTable(state[0], rowLen, colLen, path));
document.getElementsByTagName('body')[0].appendChild(div);
