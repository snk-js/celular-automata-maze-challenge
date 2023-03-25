export const validateSwap = (destinationSum, currentPos, adjacencyList) => {

  const newPos = currentPos + destinationSum;

  if (newPos >= 0 && newPos < adjacencyList.length) {
    if (adjacencyList[newPos][0] === false) { // If the new position is dead
      return true;
    }
  }

  return false;
};

export const updateObserverPosition = (currentPos, newPos, list) => {
  const pos = currentPos.pop();
  currentPos.push(newPos);
  list[pos][2] = undefined;
  if (list[newPos][2] === "4") {
    list[newPos][2] = "5";
  } else {
    list[newPos][2] = "3";
  }
};
