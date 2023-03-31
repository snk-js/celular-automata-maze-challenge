
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
const rowLen = initialStateMatrix.length;

const flatMatrix = initialStateMatrix.flat();

const start = flatMatrix.findIndex((cell) => cell === 3);
const target = flatMatrix.findIndex((cell) => cell === 4);

const state = initializeState(initialStateMatrix)

//create a map for 300 ticks, a map that has indexes as key and the state as value
const states = new Map();
states.set(0, state);

const stateDepth = 300

const create500Ticks = (states, page) => {
  for (let i = 1; i < stateDepth; i++) {
    console.log(`${i} ticks generated`);
    states.set(i, tick(states.get(i - 1), colLen));
  }
}


console.log('mounting state')
// measure
const t2 = performance.now();
create500Ticks(states)
const t3 = performance.now();
// convert to seconds with 2 decimals
const time = (t3 - t2) / 1000
console.log(`mounting state took ${time} seconds.`);
// measure start time of the algorithm
const t0 = performance.now();
const found = gbfs(states, start, target, colLen, rowLen)
// measure end time of the algorithm
const t1 = performance.now();
console.log(`GBFS took ${t1 - t0} milliseconds.`);
console.log({ found })

export default found

