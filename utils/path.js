export function constructPath(parentMap, start, current, tickCount) {
  let path = [current];
  while (current !== start) {
    const currentKey = current + '|' + tickCount;
    const [previous, previousTickCount] = parentMap.get(currentKey);
    path.unshift(previous);
    current = previous;
    tickCount = previousTickCount;
  }
  return path;
}
