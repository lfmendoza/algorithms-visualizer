const getNeighbors = (node, grid) => {
  const neighbors = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
};

export const bfs = async (grid, startNode, endNode, setGrid, speed) => {
  const newGrid = grid.map((row) => [...row]);
  const queue = [startNode];
  const visited = new Set();
  const parent = new Map();

  visited.add(`${startNode.row}-${startNode.col}`);

  while (queue.length > 0) {
    const current = queue.shift();

    if (current.row === endNode.row && current.col === endNode.col) {
      // Reconstruir camino
      const path = [];
      let node = current;
      while (node) {
        path.unshift(node);
        node = parent.get(`${node.row}-${node.col}`);
      }

      // Animar camino
      for (let i = 1; i < path.length - 1; i++) {
        newGrid[path[i].row][path[i].col].isPath = true;
        setGrid(newGrid.map((row) => [...row]));
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      return path;
    }

    // Marcar como visitado
    if (
      !newGrid[current.row][current.col].isStart &&
      !newGrid[current.row][current.col].isEnd
    ) {
      newGrid[current.row][current.col].isVisited = true;
      setGrid(newGrid.map((row) => [...row]));
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    // Explorar vecinos
    const neighbors = getNeighbors(current, newGrid);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(neighborKey) && !neighbor.isWall) {
        visited.add(neighborKey);
        parent.set(neighborKey, current);
        queue.push(neighbor);

        if (!neighbor.isStart && !neighbor.isEnd) {
          newGrid[neighbor.row][neighbor.col].isInQueue = true;
          setGrid(newGrid.map((row) => [...row]));
        }
      }
    }
  }

  return null; // No se encontró camino
};

export const dfs = async (grid, startNode, endNode, setGrid, speed) => {
  const newGrid = grid.map((row) => [...row]);
  const stack = [startNode];
  const visited = new Set();
  const parent = new Map();

  while (stack.length > 0) {
    const current = stack.pop();
    const currentKey = `${current.row}-${current.col}`;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    if (current.row === endNode.row && current.col === endNode.col) {
      // Reconstruir camino
      const path = [];
      let node = current;
      while (node) {
        path.unshift(node);
        node = parent.get(`${node.row}-${node.col}`);
      }

      // Animar camino
      for (let i = 1; i < path.length - 1; i++) {
        newGrid[path[i].row][path[i].col].isPath = true;
        setGrid(newGrid.map((row) => [...row]));
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      return path;
    }

    // Marcar como visitado
    if (
      !newGrid[current.row][current.col].isStart &&
      !newGrid[current.row][current.col].isEnd
    ) {
      newGrid[current.row][current.col].isVisited = true;
      setGrid(newGrid.map((row) => [...row]));
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    // Explorar vecinos
    const neighbors = getNeighbors(current, newGrid);
    for (const neighbor of neighbors) {
      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      if (!visited.has(neighborKey) && !neighbor.isWall) {
        parent.set(neighborKey, current);
        stack.push(neighbor);
      }
    }
  }

  return null;
};

export const dijkstra = async (grid, startNode, endNode, setGrid, speed) => {
  const newGrid = grid.map((row) => [...row]);
  const distances = {};
  const previous = {};
  const unvisited = [];

  // Inicializar distancias
  for (let row = 0; row < newGrid.length; row++) {
    for (let col = 0; col < newGrid[row].length; col++) {
      const key = `${row}-${col}`;
      distances[key] =
        row === startNode.row && col === startNode.col ? 0 : Infinity;
      previous[key] = null;
      unvisited.push({ row, col, distance: distances[key] });
    }
  }

  while (unvisited.length > 0) {
    // Encontrar nodo con menor distancia
    unvisited.sort((a, b) => a.distance - b.distance);
    const current = unvisited.shift();

    if (current.distance === Infinity) break;

    const currentKey = `${current.row}-${current.col}`;

    if (current.row === endNode.row && current.col === endNode.col) {
      // Reconstruir camino
      const path = [];
      let node = current;
      while (node) {
        path.unshift(node);
        const nodeKey = `${node.row}-${node.col}`;
        node = previous[nodeKey];
      }

      // Animar camino
      for (let i = 1; i < path.length - 1; i++) {
        newGrid[path[i].row][path[i].col].isPath = true;
        setGrid(newGrid.map((row) => [...row]));
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      return path;
    }

    // Marcar como visitado
    if (
      !newGrid[current.row][current.col].isStart &&
      !newGrid[current.row][current.col].isEnd
    ) {
      newGrid[current.row][current.col].isVisited = true;
      setGrid(newGrid.map((row) => [...row]));
      await new Promise((resolve) => setTimeout(resolve, speed));
    }

    // Actualizar distancias de vecinos
    const neighbors = getNeighbors(current, newGrid);
    for (const neighbor of neighbors) {
      if (neighbor.isWall) continue;

      const neighborKey = `${neighbor.row}-${neighbor.col}`;
      const alt = distances[currentKey] + 1;

      if (alt < distances[neighborKey]) {
        distances[neighborKey] = alt;
        previous[neighborKey] = current;

        // Actualizar en unvisited
        const unvisitedNeighbor = unvisited.find(
          (n) => n.row === neighbor.row && n.col === neighbor.col
        );
        if (unvisitedNeighbor) {
          unvisitedNeighbor.distance = alt;
        }
      }
    }
  }

  return null;
};
