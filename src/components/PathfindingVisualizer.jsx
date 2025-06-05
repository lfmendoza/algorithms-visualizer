import React, { useState, useCallback } from "react";
import Button from "./ui/Button";
import { generateGrid } from "../utils/arrayUtils";
import { bfs, dfs, dijkstra } from "../algorithms/graphAlgorithms";

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState(() => generateGrid(20, 50));
  const [isRunning, setIsRunning] = useState(false);
  const [isDrawingWalls, setIsDrawingWalls] = useState(false);
  const [algorithm, setAlgorithm] = useState("bfs");
  const [startNode] = useState({ row: 10, col: 5 });
  const [endNode] = useState({ row: 10, col: 45 });
  const [speed, setSpeed] = useState(50);

  const algorithms = {
    bfs: { name: "Breadth-First Search", func: bfs },
    dfs: { name: "Depth-First Search", func: dfs },
    dijkstra: { name: "Dijkstra's Algorithm", func: dijkstra },
  };

  const resetGrid = useCallback(() => {
    if (isRunning) return;
    setGrid(generateGrid(20, 50));
  }, [isRunning]);

  const clearPath = useCallback(() => {
    if (isRunning) return;
    const newGrid = grid.map((row) =>
      row.map((node) => ({
        ...node,
        isVisited: false,
        isPath: false,
        isInQueue: false,
      }))
    );
    setGrid(newGrid);
  }, [grid, isRunning]);

  const runAlgorithm = async () => {
    if (isRunning) return;
    clearPath();
    setIsRunning(true);

    const startNodeObj = grid[startNode.row][startNode.col];
    const endNodeObj = grid[endNode.row][endNode.col];

    await algorithms[algorithm].func(
      grid,
      startNodeObj,
      endNodeObj,
      setGrid,
      speed
    );
    setIsRunning(false);
  };

  const handleMouseDown = (row, col) => {
    if (isRunning) return;

    const node = grid[row][col];
    if (node.isStart || node.isEnd) return;

    setIsDrawingWalls(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isDrawingWalls || isRunning) return;

    const node = grid[row][col];
    if (node.isStart || node.isEnd) return;

    toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setIsDrawingWalls(false);
  };

  const toggleWall = (row, col) => {
    const newGrid = grid.map((gridRow) => [...gridRow]);
    newGrid[row][col].isWall = !newGrid[row][col].isWall;
    setGrid(newGrid);
  };

  const getNodeClass = (node) => {
    let classes =
      "w-6 h-6 border border-gray-300 cursor-pointer transition-colors duration-200 ";

    if (node.isStart) classes += "bg-green-500 ";
    else if (node.isEnd) classes += "bg-red-500 ";
    else if (node.isWall) classes += "bg-gray-800 ";
    else if (node.isPath) classes += "bg-yellow-400 ";
    else if (node.isVisited) classes += "bg-blue-300 ";
    else if (node.isInQueue) classes += "bg-blue-100 ";
    else
      classes +=
        "bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 ";

    return classes;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Visualizador de Algoritmos de Pathfinding
      </h2>

      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isRunning}
          className="p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          {Object.entries(algorithms).map(([key, alg]) => (
            <option key={key} value={key}>
              {alg.name}
            </option>
          ))}
        </select>

        <Button onClick={runAlgorithm} disabled={isRunning}>
          {isRunning ? "Ejecutando..." : "Buscar Camino"}
        </Button>

        <Button onClick={clearPath} disabled={isRunning} variant="secondary">
          Limpiar Camino
        </Button>

        <Button onClick={resetGrid} disabled={isRunning} variant="danger">
          Reset Grid
        </Button>

        <div className="flex items-center gap-2">
          <label className="text-sm dark:text-gray-300">Velocidad:</label>
          <input
            type="range"
            min="10"
            max="200"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isRunning}
            className="w-32"
          />
          <span className="text-sm dark:text-gray-300">{speed}ms</span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500"></div>
          <span className="dark:text-gray-300">Inicio</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500"></div>
          <span className="dark:text-gray-300">Final</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-800"></div>
          <span className="dark:text-gray-300">Muro</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300"></div>
          <span className="dark:text-gray-300">Visitado</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-400"></div>
          <span className="dark:text-gray-300">Camino</span>
        </div>
      </div>

      <div
        className="inline-block border-2 border-gray-400 dark:border-gray-600"
        onMouseLeave={handleMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((node, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={getNodeClass(node)}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Haz clic y arrastra para crear muros. Los algoritmos encontrarán el
        camino desde el punto verde hasta el rojo.
      </div>
    </div>
  );
};

export default PathfindingVisualizer;
