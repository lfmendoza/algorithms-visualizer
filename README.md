# 🔬 Algorithms Visualizer

Una aplicación web interactiva para visualizar algoritmos de ordenamiento y pathfinding, construida con React, Vite y Tailwind CSS.

## ✨ Características

### 🔢 Algoritmos de Ordenamiento

- **Bubble Sort** - O(n²) - Visualización de comparaciones e intercambios
- **Quick Sort** - O(n log n) - Particionado con pivot destacado
- **Merge Sort** - O(n log n) - Divide y vencerás con merge
- **Heap Sort** - O(n log n) - Construcción de heap y extracción

### 🗺️ Algoritmos de Pathfinding

- **Breadth-First Search (BFS)** - Garantiza el camino más corto
- **Depth-First Search (DFS)** - Exploración en profundidad
- **Dijkstra's Algorithm** - Camino más corto con pesos

### 🎨 Funcionalidades

- ⚡ Visualización en tiempo real con animaciones suaves
- 🎛️ Controles de velocidad y tamaño personalizables
- 📊 Estadísticas en vivo (comparaciones, intercambios, complejidad)
- 🌓 Modo oscuro/claro
- 📱 Diseño responsive
- 🎯 Grid interactivo para crear obstáculos

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js 16+
- npm o yarn

### Pasos de instalación

1. **Clonar o crear el proyecto:**

```bash
npm create vite@latest algorithms-visualizer -- --template react
cd algorithms-visualizer
```

2. **Instalar dependencias:**

```bash
npm install framer-motion react-icons react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. **Copiar los archivos del proyecto** (reemplazar los archivos generados)

4. **Ejecutar el proyecto:**

```bash
npm run dev
```

5. **Construir para producción:**

```bash
npm run build
```

## 🌐 Despliegue en Vercel

1. **Conectar repositorio:**

   - Sube el código a GitHub
   - Conecta tu repositorio en [vercel.com](https://vercel.com)

2. **Configuración automática:**

   - Vercel detecta automáticamente Vite
   - No se requiere configuración adicional

3. **Variables de entorno:**
   - No se requieren para este proyecto

## 📁 Estructura del Proyecto

```
algorithms-visualizer/
├── src/
│   ├── algorithms/          # Implementaciones de algoritmos
│   │   ├── sortingAlgorithms.js
│   │   └── graphAlgorithms.js
│   ├── components/          # Componentes React
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   └── Slider.jsx
│   │   ├── SortingVisualizer.jsx
│   │   └── PathfindingVisualizer.jsx
│   ├── utils/              # Utilidades y helpers
│   │   └── arrayUtils.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Punto de entrada
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── package.json            # Dependencias
├── vite.config.js          # Configuración Vite
├── tailwind.config.js      # Configuración Tailwind
└── dist/                   # Build de producción
```

## 🎯 Uso de la Aplicación

### Algoritmos de Ordenamiento

1. Selecciona un algoritmo del dropdown
2. Ajusta el tamaño del array (10-100 elementos)
3. Configura la velocidad de animación
4. Haz clic en "Iniciar Ordenamiento"
5. Observa las estadísticas en tiempo real

### Algoritmos de Pathfinding

1. Selecciona un algoritmo de búsqueda
2. Haz clic y arrastra para crear muros
3. Ajusta la velocidad de animación
4. Haz clic en "Buscar Camino"
5. Observa el proceso de exploración y el camino final

## 🎨 Colores y Leyenda

### Ordenamiento

- 🔵 **Azul**: Elementos sin ordenar
- 🟡 **Amarillo**: Elementos siendo comparados
- 🔴 **Rojo**: Elementos siendo intercambiados
- 🟣 **Púrpura**: Elemento pivot (Quick Sort)
- 🟢 **Verde**: Elementos ordenados

### Pathfinding

- 🟢 **Verde**: Nodo de inicio
- 🔴 **Rojo**: Nodo de destino
- ⚫ **Negro**: Muros/obstáculos
- 🔵 **Azul claro**: Nodos visitados
- 🟡 **Amarillo**: Camino final encontrado

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS
- **Framer Motion** - Animaciones
- **React Router** - Navegación
- **React Icons** - Iconos

## 📈 Complejidades de Algoritmos

| Algoritmo   | Mejor Caso | Caso Promedio | Peor Caso  | Espacio  |
| ----------- | ---------- | ------------- | ---------- | -------- |
| Bubble Sort | O(n)       | O(n²)         | O(n²)      | O(1)     |
| Quick Sort  | O(n log n) | O(n log n)    | O(n²)      | O(log n) |
| Merge Sort  | O(n log n) | O(n log n)    | O(n log n) | O(n)     |
| Heap Sort   | O(n log n) | O(n log n)    | O(n log n) | O(1)     |
| BFS         | O(V + E)   | O(V + E)      | O(V + E)   | O(V)     |
| DFS         | O(V + E)   | O(V + E)      | O(V + E)   | O(V)     |
| Dijkstra    | O(V²)      | O(V²)         | O(V²)      | O(V)     |

## 🚀 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

## 🌐 Deploy a Vercel

```bash
# Opción 1: Vercel CLI
npm i -g vercel
vercel

# Opción 2: Conectar repositorio en vercel.com
# Solo sube tu código a GitHub y conecta en vercel.com
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👤 Autor

Creado con ❤️ para fines educativos

## 🙏 Agradecimientos

- Inspirado en algoritmos clásicos de ciencias de la computación
- Diseño moderno con Tailwind CSS
- Animaciones suaves con Framer Motion

## 🔧 Solución de Problemas

### Problemas comunes:

1. **Error de dependencias:**

   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Error de Tailwind:**

   ```bash
   npx tailwindcss init -p --force
   ```

3. **Build fails:**
   ```bash
   npm run build -- --verbose
   ```

## 📞 Soporte

Si encuentras algún problema o tienes preguntas:

- Crea un issue en GitHub
- Revisa la documentación de las dependencias
- Verifica que tengas las versiones correctas de Node.js

---

**¡Disfruta explorando algoritmos! 🎉**
