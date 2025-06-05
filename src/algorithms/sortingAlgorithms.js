export const bubbleSort = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  speed
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      setComparisons(comparisons);

      // Destacar elementos siendo comparados
      arr[j].isComparing = true;
      arr[j + 1].isComparing = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (arr[j].value > arr[j + 1].value) {
        // Intercambiar
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swaps++;
        setSwaps(swaps);

        arr[j].isSwapping = true;
        arr[j + 1].isSwapping = true;
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, speed));
      }

      // Limpiar highlights
      arr[j].isComparing = false;
      arr[j + 1].isComparing = false;
      arr[j].isSwapping = false;
      arr[j + 1].isSwapping = false;
    }

    // Marcar como ordenado
    arr[n - 1 - i].isSorted = true;
    setArray([...arr]);
  }

  arr[0].isSorted = true;
  setArray([...arr]);
};

export const quickSort = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  speed
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  const partition = async (low, high) => {
    const pivot = arr[high].value;
    arr[high].isPivot = true;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));

    let i = low - 1;

    for (let j = low; j < high; j++) {
      comparisons++;
      setComparisons(comparisons);

      arr[j].isComparing = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (arr[j].value <= pivot) {
        i++;
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          swaps++;
          setSwaps(swaps);

          arr[i].isSwapping = true;
          arr[j].isSwapping = true;
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, speed));

          arr[i].isSwapping = false;
          arr[j].isSwapping = false;
        }
      }

      arr[j].isComparing = false;
      setArray([...arr]);
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    swaps++;
    setSwaps(swaps);

    arr[high].isPivot = false;
    arr[i + 1].isSorted = true;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));

    return i + 1;
  };

  const quickSortHelper = async (low, high) => {
    if (low < high) {
      const pi = await partition(low, high);
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, arr.length - 1);

  // Marcar todos como ordenados
  arr.forEach((item) => (item.isSorted = true));
  setArray([...arr]);
};

export const mergeSort = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  speed
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;

  const merge = async (left, mid, right) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;

    while (i < leftArr.length && j < rightArr.length) {
      comparisons++;
      setComparisons(comparisons);

      arr[k].isComparing = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = { ...leftArr[i] };
        i++;
      } else {
        arr[k] = { ...rightArr[j] };
        j++;
      }

      arr[k].isSwapping = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      arr[k].isComparing = false;
      arr[k].isSwapping = false;
      k++;
    }

    while (i < leftArr.length) {
      arr[k] = { ...leftArr[i] };
      arr[k].isSwapping = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
      arr[k].isSwapping = false;
      i++;
      k++;
    }

    while (j < rightArr.length) {
      arr[k] = { ...rightArr[j] };
      arr[k].isSwapping = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));
      arr[k].isSwapping = false;
      j++;
      k++;
    }
  };

  const mergeSortHelper = async (left, right) => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      await mergeSortHelper(left, mid);
      await mergeSortHelper(mid + 1, right);
      await merge(left, mid, right);
    }
  };

  await mergeSortHelper(0, arr.length - 1);

  // Marcar todos como ordenados
  arr.forEach((item) => (item.isSorted = true));
  setArray([...arr]);
  setSwaps(swaps);
};

export const heapSort = async (
  array,
  setArray,
  setComparisons,
  setSwaps,
  speed
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  const n = arr.length;

  const heapify = async (n, i) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n) {
      comparisons++;
      setComparisons(comparisons);

      arr[left].isComparing = true;
      arr[largest].isComparing = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (arr[left].value > arr[largest].value) {
        largest = left;
      }

      arr[left].isComparing = false;
      arr[i].isComparing = false;
    }

    if (right < n) {
      comparisons++;
      setComparisons(comparisons);

      arr[right].isComparing = true;
      arr[largest].isComparing = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      if (arr[right].value > arr[largest].value) {
        largest = right;
      }

      arr[right].isComparing = false;
      arr[largest].isComparing = false;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      swaps++;
      setSwaps(swaps);

      arr[i].isSwapping = true;
      arr[largest].isSwapping = true;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, speed));

      arr[i].isSwapping = false;
      arr[largest].isSwapping = false;

      await heapify(n, largest);
    }
  };

  // Construir heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extraer elementos del heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps++;
    setSwaps(swaps);

    arr[0].isSwapping = true;
    arr[i].isSwapping = true;
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, speed));

    arr[0].isSwapping = false;
    arr[i].isSwapping = false;
    arr[i].isSorted = true;

    await heapify(i, 0);
  }

  arr[0].isSorted = true;
  setArray([...arr]);
};
