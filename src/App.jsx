import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SortingVisualizer from "./components/SortingVisualizer";
import PathfindingVisualizer from "./components/PathfindingVisualizer";
import { FiBarChart2, FiMap, FiHome, FiSun, FiMoon } from "react-icons/fi";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div
        className={`min-h-screen transition-colors duration-300 ${
          darkMode ? "dark bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Navigation */}
        <nav className="bg-white dark:bg-gray-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <FiHome className="w-6 h-6 text-blue-600" />
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    Algorithm Visualizer
                  </span>
                </Link>

                <div className="hidden md:flex space-x-4">
                  <Link
                    to="/sorting"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiBarChart2 className="w-4 h-4" />
                    <span>Ordenamiento</span>
                  </Link>

                  <Link
                    to="/pathfinding"
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiMap className="w-4 h-4" />
                    <span>Pathfinding</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-center">
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {darkMode ? (
                    <FiSun className="w-5 h-5" />
                  ) : (
                    <FiMoon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/sorting" element={<SortingVisualizer />} />
            <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

// Componente HomePage
const HomePage = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Visualizador de Algoritmos
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto">
        Explora y comprende algoritmos fundamentales de ciencias de la
        computación a través de visualizaciones interactivas.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link
          to="/sorting"
          className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <FiBarChart2 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Algoritmos de Ordenamiento
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Visualiza Bubble Sort, Quick Sort, Merge Sort y Heap Sort. Observa
            comparaciones, intercambios y complejidades en tiempo real.
          </p>
        </Link>

        <Link
          to="/pathfinding"
          className="block p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700"
        >
          <FiMap className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Algoritmos de Pathfinding
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Explora BFS, DFS y Dijkstra. Crea obstáculos y observa cómo
            diferentes algoritmos encuentran caminos.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default App;
