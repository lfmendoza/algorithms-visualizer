import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import Slider from "./ui/Slider";
import { generateRandomArray, getComplexityInfo } from "../utils/arrayUtils";
import {
  bubbleSort,
  quickSort,
  mergeSort,
  heapSort,
} from "../algorithms/sortingAlgorithms";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [arraySize, setArraySize] = useState(50);
  const [speed, setSpeed] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [algorithm, setAlgorithm] = useState("bubbleSort");
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const Div = motion.div;

  const algorithms = {
    bubbleSort: { name: "Bubble Sort", func: bubbleSort },
    quickSort: { name: "Quick Sort", func: quickSort },
    mergeSort: { name: "Merge Sort", func: mergeSort },
    heapSort: { name: "Heap Sort", func: heapSort },
  };

  useEffect(() => {
    resetArray();
  }, [arraySize]);

  const resetArray = () => {
    if (isRunning) return;
    setArray(generateRandomArray(arraySize));
    setComparisons(0);
    setSwaps(0);
  };

  const runAlgorithm = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setComparisons(0);
    setSwaps(0);

    await algorithms[algorithm].func(
      array,
      setArray,
      setComparisons,
      setSwaps,
      201 - speed
    );
    setIsRunning(false);
  };

  const getBarColor = (bar) => {
    if (bar.isSorted) return "bg-green-500";
    if (bar.isPivot) return "bg-purple-500";
    if (bar.isSwapping) return "bg-red-500";
    if (bar.isComparing) return "bg-yellow-500";
    return "bg-blue-500";
  };

  const complexityInfo = getComplexityInfo(algorithm);

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Visualizador de Algoritmos de Ordenamiento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <Slider
              value={arraySize}
              onChange={setArraySize}
              min={10}
              max={100}
              label="Tamaño del Array"
              disabled={isRunning}
            />
          </div>
          <div>
            <Slider
              value={speed}
              onChange={setSpeed}
              min={1}
              max={200}
              label="Velocidad"
              disabled={isRunning}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Algoritmo
            </label>
            <select
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
              disabled={isRunning}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            >
              {Object.entries(algorithms).map(([key, alg]) => (
                <option key={key} value={key}>
                  {alg.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <Button onClick={resetArray} disabled={isRunning} variant="secondary">
            Generar Nuevo Array
          </Button>
          <Button onClick={runAlgorithm} disabled={isRunning}>
            {isRunning ? "Ejecutando..." : "Iniciar Ordenamiento"}
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <div className="text-lg font-bold text-blue-600">{comparisons}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Comparaciones
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">{swaps}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Intercambios
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <div className="text-sm font-bold text-purple-600">
              {complexityInfo.time?.average || "N/A"}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Tiempo Promedio
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
            <div className="text-sm font-bold text-orange-600">
              {complexityInfo.space || "N/A"}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Espacio
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
        <div
          className="flex items-end justify-center space-x-1"
          style={{ height: "400px" }}
        >
          {array.map((bar) => (
            <Div
              key={bar.id}
              className={`${getBarColor(
                bar
              )} transition-colors duration-300 rounded-t-sm`}
              style={{
                height: `${(bar.value / 400) * 350}px`,
                width: `${Math.max(600 / arraySize, 4)}px`,
              }}
              initial={{ height: 0 }}
              animate={{ height: `${(bar.value / 400) * 350}px` }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>

      {/* Información del algoritmo */}
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          {algorithms[algorithm].name}
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200 mb-2">
          {complexityInfo.description}
        </p>
        <div className="text-xs text-blue-700 dark:text-blue-300">
          <span className="mr-4">Mejor: {complexityInfo.time?.best}</span>
          <span className="mr-4">Promedio: {complexityInfo.time?.average}</span>
          <span>Peor: {complexityInfo.time?.worst}</span>
        </div>
      </div>

      {/* Leyenda de colores */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="dark:text-gray-300">Sin ordenar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="dark:text-gray-300">Comparando</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="dark:text-gray-300">Intercambiando</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-purple-500 rounded"></div>
          <span className="dark:text-gray-300">Pivot</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="dark:text-gray-300">Ordenado</span>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;
