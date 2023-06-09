export const validateSwap = (next, currentPos, adjacencyList) => {
  const pos = currentPos[0];
  const newPos = pos + next;

  if (newPos >= 0 && newPos < adjacencyList.length && !adjacencyList[newPos][0]) {
    updateObserverPosition(pos, newPos, adjacencyList);
    return newPos;
  }

  return false;
};

const lastMap = {
  "2": "1", // change start-point with observer to start-point
  "3": undefined, // remove observer from the previous position
  "5": "4", // change end-point with observer to end-point
}

const currentMap = {
  "1": "2", // if current is start-point, change to start-point with observer
  "2": "3", // if current is start-point with observer, change to only observer,
  "4": "5", // if current is end-point, change to end-point with observer
}

export const updateObserverPosition = (from, to, list) => {
  const last = list[from][2]
  const current = list[to][2]
  const newLast = lastMap[last];
  last && (list[from][2] = newLast);
  current && (list[to][2] = currentMap[current]) || (list[to][2] = "3");
};
