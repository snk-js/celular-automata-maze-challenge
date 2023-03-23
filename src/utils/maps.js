
export const allowedKeys = (entry) => [["ArrowRight", [0, 1]], ["ArrowLeft", [0, -1]], ["ArrowUp", [-1, 0]], ["ArrowDown", [1, 0]]].reduce((acc, [key, move]) => {
  acc[key] = move
  return acc
}, {})[entry]