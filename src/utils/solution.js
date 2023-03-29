import { indexToList } from "./maps";

function heuristic(current, target, colLen) {
  const [currentRow, currentCol] = indexToList(current, colLen);
  const [targetRow, targetCol] = indexToList(target, colLen);
  return Math.abs(currentRow - targetRow) + Math.abs(currentCol - targetCol);
}


function isReachableInKSteps(state, start, target, getNextState, k) {
  if (k === 0) return false;

  let nextState = getNextState(state, 1);
  let neighbors = nextState[start][1];

  for (let neighbor of neighbors) {
    if (neighbor === target) return true;
    if (isReachableInKSteps(nextState, neighbor, target, getNextState, k - 1)) return true;
  }

  return false;
}

function heuristicWithFutureSteps(current, target, state, getNextState, colLen, k) {
  const baseHeuristic = heuristic(current, target, colLen);

  if (isReachableInKSteps(state, current, target, getNextState, k)) {
    return baseHeuristic;
  } else {
    return baseHeuristic + 1000; // Add a high penalty if not reachable within k steps
  }
}

function gbfs(state, start, target, getNextState, colLen, k = 3) {
  let visited = new Set();
  let frontier = [];

  frontier.push([0, start]);
  visited.add(start);

  while (frontier.length > 0) {
    frontier.sort((a, b) => a[0] - b[0]);
    let [priority, current] = frontier.shift();
    let neighbors = state[current][1];

    for (let neighbor of neighbors) {
      if (visited.has(neighbor)) {
        continue;
      }

      if (neighbor === target) {
        // Target found, return true
        return true;
      }

      visited.add(neighbor);
      let h = heuristicWithFutureSteps(neighbor, target, state, getNextState, colLen, k);
      frontier.push([h, neighbor]);
    }
  }

  return false;
}