export const randomCells = (cellSize) => {
  return Array.from(Array(cellSize)).map((cell, index) => ({
    id: index + 1,
    isAlive: Math.random() < 0.1,
  }));
};
