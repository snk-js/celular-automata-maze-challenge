export const validateSwap = (destinationSum, currentPos, adjacencyList) => {
  const pos = currentPos.pop()
  const newPos = pos + destinationSum;

  if (newPos >= 0 && newPos < adjacencyList.length) {
    if (adjacencyList[newPos][0] === false) { // If the new position is dead
      return true;
    }
  }

  return false;
};

export const updateObserverPosition = (currentPos, newPos, list) => {
  // Erase the 2 from the old position and add it to the new one
  if (list[currentPos][2] === "2") {
    list[currentPos][2] = undefined;
  }
  if (list[newPos][2] === "4") {
    list[newPos][2] = "5";
  } else {
    list[newPos][2] = "3";
  }
};
