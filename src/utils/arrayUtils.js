export const generateRandomArray = (size, min = 10, max = 400) => {
  return Array.from({ length: size }, (_, index) => ({
    id: index,
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    isComparing: false,
    isSwapping: false,
    isSorted: false,
    isPivot: false,
  }));
};

export const generateGrid = (rows = 20, cols = 50) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isStart: row === 10 && col === 5,
        isEnd: row === 10 && col === 45,
        isWall: false,
        isVisited: false,
        isPath: false,
        isInQueue: false,
        distance: Infinity,
        previousNode: null,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

export const getComplexityInfo = (algorithm) => {
  const complexities = {
    bubbleSort: {
      time: { best: "O(n)", average: "O(n²)", worst: "O(n²)" },
      space: "O(1)",
      description:
        "Algoritmo simple que compara elementos adyacentes repetidamente.",
    },
    quickSort: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n²)" },
      space: "O(log n)",
      description: "Divide y vencerás usando un elemento pivot.",
    },
    mergeSort: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(n)",
      description: "Divide el array y luego merge de forma ordenada.",
    },
    heapSort: {
      time: { best: "O(n log n)", average: "O(n log n)", worst: "O(n log n)" },
      space: "O(1)",
      description: "Usa una estructura de heap para ordenar eficientemente.",
    },
    bfs: {
      time: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
      space: "O(V)",
      description: "Explora nivel por nivel, garantiza el camino más corto.",
    },
    dfs: {
      time: { best: "O(V + E)", average: "O(V + E)", worst: "O(V + E)" },
      space: "O(V)",
      description: "Explora tan profundo como sea posible antes de retroceder.",
    },
    dijkstra: {
      time: { best: "O(V²)", average: "O(V²)", worst: "O(V²)" },
      space: "O(V)",
      description: "Encuentra el camino más corto con pesos en las aristas.",
    },
  };

  return complexities[algorithm] || {};
};
