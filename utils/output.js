export function pathToDirections(path, colLen) {
  const directions = [];
  !path && (path = [])
  for (let i = 1; i < path.length; i++) {
    const prev = path[i - 1];
    const curr = path[i];
    const diff = curr - prev;

    if (diff === 1) {
      directions.push('R');
    } else if (diff === -1) {
      directions.push('L');
    } else if (diff === colLen) {
      directions.push('D');
    } else if (diff === -colLen) {
      directions.push('U');
    }
  }
  return directions.join(' ');
}
