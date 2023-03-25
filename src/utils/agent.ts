
export const validateSwap = (destinationSum, currentPosArr, adjacencyList) => {
  // change this to accordingly to the new cell characteristics in updateObserverPosition:

  // 1. the observer should not be able to move to a cell that is alive:
  // - get the actual aditional characteristics of the cell
  // - if the cell is alive, return false
  // - if the cell is dead -> verify if the destination is valid
  // 

  // returns position 
  if (!currentPosArr.length) {
    return false;
  }

  const currentPos = currentPosArr.pop();
  const newPos = currentPos + destinationSum;

  if (newPos >= 0 && newPos < adjacencyList.length) {
    if (adjacencyList[newPos][0] === false) { // If the new position is dead
      currentPosArr.push(newPos);
      return true
    }
  }

  currentPosArr.push(currentPos);
  return false;
};

export const updateObserverPosition = (currentPos, newPos, list) => {

  // since the state is:
  // // idx: [ (live | dead):boolean, [ [...liveIdxs: number] , [...deadIdxs: number] ], ("1" | "2" | "3" | "4" | "5") ]
  // each one of the numbers represents a adicional characteristic about the cell

  // where {
  //  1:  cell is starting point,
  //  2:  cell is the target point holding the observer,
  //  3:  cell just contains the observer, 
  //  4:  cell is the target point,
  //  5:  cell is the target point and has the observer
  //  none: when cell have no characteristic and just represent their state (alive or dead)

  // 1. update the list to reflect the new position of the observer
  // 2. make sure to erase the 2 from the old position and to the new one
  
  // 3. start point can be 

  return list
};