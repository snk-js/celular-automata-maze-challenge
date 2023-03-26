export const validateSwap = (destinationSum, currentPos, adjacencyList) => {
  const pos = currentPos.pop()
  const newPos = pos + destinationSum;
  if (newPos >= 0 && newPos < adjacencyList.length && !adjacencyList[newPos][0]) {
    console.log(adjacencyList[newPos])
    currentPos.push(newPos);
    updateObserverPosition(pos, newPos, adjacencyList)
    return true;

  }
  currentPos.push(pos);
  return false;
};

export const updateObserverPosition = (pos, newPos, list) => {
  list[pos][2] === "2" && (list[pos][2] = "1") || (list[pos][2] = undefined)
  if (list[newPos][2] === "4") {
    list[newPos][2] = "5";
  } else {
    list[newPos][2] = "3";
  }
};
