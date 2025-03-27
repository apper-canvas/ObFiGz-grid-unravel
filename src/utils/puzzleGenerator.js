// Sample puzzles for all grid sizes and difficulty levels
const samplePuzzles = {
  '4x4': {
    easy: [
      [0, 0, 1, 0],
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 1]
    ],
    medium: [
      [0, 0, 0, 0],
      [3, 0, 0, 0],
      [0, 0, 0, 1],
      [0, 2, 0, 0]
    ],
    hard: [
      [0, 0, 0, 0],
      [0, 0, 0, 3],
      [2, 0, 0, 0],
      [0, 0, 4, 0]
    ]
  },
  '6x6': {
    easy: [
      [0, 0, 0, 1, 0, 0],
      [5, 0, 0, 0, 0, 0],
      [0, 0, 6, 0, 3, 0],
      [0, 5, 0, 6, 0, 0],
      [0, 0, 0, 0, 0, 4],
      [0, 0, 1, 0, 0, 0]
    ],
    medium: [
      [0, 0, 0, 0, 0, 2],
      [0, 0, 6, 0, 0, 0],
      [0, 5, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 6, 0, 0],
      [4, 0, 0, 0, 0, 0]
    ],
    hard: [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 1],
      [0, 0, 0, 0, 3, 0],
      [0, 5, 0, 0, 0, 0],
      [4, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  },
  '9x9': {
    easy: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    medium: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ],
    hard: [
      [0, 2, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 6, 0, 0, 0, 0, 3],
      [0, 7, 4, 0, 8, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 0, 0, 2],
      [0, 8, 0, 0, 4, 0, 0, 1, 0],
      [6, 0, 0, 5, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 7, 8, 0],
      [5, 0, 0, 0, 0, 9, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 4, 0]
    ]
  }
};

// 4x4 solutions
const solutions4x4 = {
  easy: [
    [4, 3, 1, 2],
    [1, 2, 3, 4],
    [3, 1, 4, 2],
    [2, 4, 3, 1]
  ],
  medium: [
    [1, 4, 2, 3],
    [3, 2, 1, 4],
    [4, 3, 2, 1],
    [1, 2, 3, 4]
  ],
  hard: [
    [1, 3, 2, 4],
    [4, 2, 1, 3],
    [2, 1, 3, 4],
    [3, 1, 4, 2]
  ]
};

// 6x6 solutions
const solutions6x6 = {
  easy: [
    [3, 2, 4, 1, 6, 5],
    [5, 1, 3, 4, 2, 6],
    [4, 6, 6, 5, 3, 1],
    [1, 5, 2, 6, 4, 3],
    [6, 3, 5, 2, 1, 4],
    [2, 4, 1, 3, 5, 6]
  ],
  medium: [
    [3, 1, 4, 5, 6, 2],
    [2, 4, 6, 3, 5, 1],
    [6, 5, 3, 1, 2, 4],
    [5, 6, 2, 4, 1, 3],
    [1, 3, 5, 6, 4, 2],
    [4, 2, 1, 2, 3, 5]
  ],
  hard: [
    [3, 6, 5, 4, 1, 2],
    [5, 4, 2, 3, 6, 1],
    [1, 2, 6, 5, 3, 4],
    [2, 5, 4, 6, 1, 3],
    [4, 3, 5, 1, 2, 6],
    [6, 1, 3, 2, 4, 5]
  ]
};

// 9x9 solutions - Using provided sample puzzles
const solutions9x9 = {
  easy: [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
  ],
  medium: [
    [4, 3, 5, 2, 6, 9, 7, 8, 1],
    [6, 8, 2, 5, 7, 1, 4, 9, 3],
    [1, 9, 7, 8, 3, 4, 5, 6, 2],
    [8, 2, 6, 1, 9, 5, 3, 4, 7],
    [3, 7, 4, 6, 8, 2, 9, 1, 5],
    [9, 5, 1, 7, 4, 3, 6, 2, 8],
    [5, 1, 9, 3, 2, 6, 8, 7, 4],
    [2, 4, 8, 9, 5, 7, 1, 3, 6],
    [7, 6, 3, 4, 1, 8, 2, 5, 9]
  ],
  hard: [
    [1, 2, 6, 4, 3, 7, 9, 5, 8],
    [8, 9, 5, 6, 2, 1, 4, 7, 3],
    [3, 7, 4, 9, 8, 5, 1, 2, 6],
    [4, 5, 7, 1, 9, 3, 8, 6, 2],
    [9, 8, 3, 2, 4, 6, 5, 1, 7],
    [6, 1, 2, 5, 7, 8, 3, 9, 4],
    [2, 6, 9, 3, 1, 4, 7, 8, 5],
    [5, 4, 1, 8, 6, 9, 2, 3, 1],
    [7, 3, 8, 5, 5, 2, 6, 4, 9]
  ]
};

// Check if a number can be placed in a specific position
const isValid = (grid, row, col, num, size) => {
  // Check row
  for (let x = 0; x < size; x++) {
    if (grid[row][x] === num) return false
  }
  
  // Check column
  for (let y = 0; y < size; y++) {
    if (grid[y][col] === num) return false
  }
  
  // Check box
  const boxSize = Math.sqrt(size)
  const boxRow = Math.floor(row / boxSize) * boxSize
  const boxCol = Math.floor(col / boxSize) * boxSize
  for (let y = boxRow; y < boxRow + boxSize; y++) {
    for (let x = boxCol; x < boxCol + boxSize; x++) {
      if (grid[y][x] === num) return false
    }
  }
  
  return true
}

// Generate a puzzle based on size and difficulty
const generatePuzzle = (size, difficulty) => {
  const sizeKey = `${size}x${size}`;
  
  // For now, return sample puzzles
  // In a real implementation, this would generate unique puzzles
  let grid, solution;
  
  if (size === 4) {
    grid = JSON.parse(JSON.stringify(samplePuzzles[sizeKey][difficulty]));
    solution = JSON.parse(JSON.stringify(solutions4x4[difficulty]));
  } else if (size === 6) {
    grid = JSON.parse(JSON.stringify(samplePuzzles[sizeKey][difficulty]));
    solution = JSON.parse(JSON.stringify(solutions6x6[difficulty]));
  } else {
    grid = JSON.parse(JSON.stringify(samplePuzzles[sizeKey][difficulty]));
    solution = JSON.parse(JSON.stringify(solutions9x9[difficulty]));
  }
  
  return {
    grid,
    solution,
    size,
    difficulty
  };
}

// Check if the user's solution is correct
const checkSolution = (userGrid, solution) => {
  for (let row = 0; row < userGrid.length; row++) {
    for (let col = 0; col < userGrid[row].length; col++) {
      if (userGrid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
}

export { generatePuzzle, isValid, checkSolution };