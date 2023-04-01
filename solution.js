import { cellsMatrix, mapToObject } from "./utils/transforms.js";
import { input } from "./processServerData.js";
import { initializeState, tick } from './utils/core.js';
import { gbfs } from "./utils/dfs.js";
import { saveDirectionsToFile } from "./index.js";
import { pathToDirections } from "./utils/output.js";
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

const states = new Map();
states.set(0, state);

const stateDepth = 300;

const createStates = (states, page) => {
  for (let i = 1; i < stateDepth; i++) {
    console.log(`${i} generations created`);
    states.set(i, tick(states.get(i - 1), colLen));
  }
}

createStates(states)
const path = gbfs(mapToObject(states), start, target, colLen, rowLen)
console.log(path);
export const getSolution = () => ({
  result: path,
  colLen,
  states,
  directions: pathToDirections(path, colLen),
  saveDirectionsToFile: () => saveDirectionsToFile(directions, 'result.txt')
});

