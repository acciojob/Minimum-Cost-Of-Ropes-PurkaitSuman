function calculateMinCost() {
  const inputText = document.getElementById("inputText").value;
  const ropes = inputText.split(",").map(Number);

  // Create a min-heap (priority queue)
  const minHeap = new MinHeap();
  ropes.forEach((rope) => minHeap.insert(rope));

  let totalCost = 0;

  while (minHeap.size() > 1) {
    const firstRope = minHeap.extractMin();
    const secondRope = minHeap.extractMin();
    const cost = firstRope + secondRope;
    totalCost += cost;
    minHeap.insert(cost);
  }

  // Display the result in the 'result' div
  const resultDiv = document.getElementById("result");
  resultDiv.textContent = `Minimum Cost: ${totalCost}`;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return min;
  }

  bubbleUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= this.heap[index]) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  heapify(index) {
    const leftIndex = 2 * index + 1;
    const rightIndex = 2 * index + 2;
    let smallestIndex = index;

    if (leftIndex < this.size() && this.heap[leftIndex] < this.heap[smallestIndex]) {
      smallestIndex = leftIndex;
    }

    if (rightIndex < this.size() && this.heap[rightIndex] < this.heap[smallestIndex]) {
      smallestIndex = rightIndex;
    }

    if (smallestIndex !== index) {
      this.swap(smallestIndex, index);
      this.heapify(smallestIndex);
    }
  }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  size() {
    return this.heap.length;
  }
}
