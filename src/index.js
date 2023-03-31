import { createTable, fluxTable } from "./view/table.js";
import { cellsMatrix } from "../utils/transforms.js";
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

const largeInput = await cellsMatrix(await input);
// const largeInput = false
const initialStateMatrix = largeInput || cellsMatrix(celular_automata_input_easy);
const rowLen = initialStateMatrix.length;
const colLen = initialStateMatrix[0].length;

let agentPos = [0] // Initial position

// every actions just updates this state
// and not creates a new one in memory
const state = [initializeState(initialStateMatrix)];

const states = new Map();
states.set(0, state[0]);

const stateDepth = 300
const createStates = (states, page) => {
  for (let i = 1; i < stateDepth; i++) {
    console.log(`${i} ticks generated`);
    states.set(i, tick(states.get(i - 1), colLen));
  }
}


createStates(states)

const onTick = (next) => {
  if (!next) return;
  const currentState = state.pop();
  const updatedState = tick(currentState, colLen);
  state.push(updatedState);

  const reset = () => {
    state.pop();
    state.push(currentState)
    fluxTable(currentState, rowLen, colLen);
  }

  const validStep = validateSwap(next, agentPos, updatedState)

  if (validStep) {
    fluxTable(updatedState, rowLen, colLen);
  } else {
    reset();
  }
};
document.addEventListener('keydown', (event) => { console.log(event); onTick(allowedKeys(event.key, colLen)) });


div.appendChild(createTable(state[0], rowLen, colLen));
document.getElementsByTagName('body')[0].appendChild(div);
