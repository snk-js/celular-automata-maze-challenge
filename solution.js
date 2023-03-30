
import { cellsMatrix } from "./utils/transforms.js";
import { input } from "./processServerData.js";
import { initializeState, tick } from './utils/core.js';
import { gbfs } from "./utils/dfs.js";

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

const colLen = initialStateMatrix[0].length;

const flatMatrix = initialStateMatrix.flat();

const start = flatMatrix.findIndex((cell) => cell === 3);
const target = flatMatrix.findIndex((cell) => cell === 4);

const state = initializeState(initialStateMatrix)

//create a map for 300 ticks, a map that has indexes as key and the state as value
const states = new Map();
states.set(0, state);

const stateDepth = 500

const create500Ticks = (states) => {

  // get the index of the last tick
  const lastTickIndex = states.


    for(let i = 1 + lastTickIndex; i < stateDepth + lastTickIndex; i++) {
    console.log(`${i} ticks generated`);
    states.set(i, tick(states.get(i - 1), colLen));
  }
}

const delete500Ticks = (states) => {
  for (let i = 0; i < stateDepth - 1; i++) {
    console.log(`${i} ticks deleted`);
    states.delete(i);
  }
}

const expandTickDepth = (states, page) => {
  delete500Ticks(states)
  create500Ticks(states)
}





const found = gbfs(states, start, target, colLen);

console.log({ found })

export default found

