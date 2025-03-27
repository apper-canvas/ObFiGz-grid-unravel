import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, RotateCcw, AlertCircle, CheckCircle, HelpCircle, Loader2 } from 'lucide-react'

// Create an empty 9x9 grid
const createEmptyGrid = () => {
  return Array(9).fill().map(() => Array(9).fill(0))
}

// Sample puzzles for demo purposes
const samplePuzzles = {
  easy: [
    [5,3,0,0,7,0,0,0,0],
    [6,0,0,1,9,5,0,0,0],
    [0,9,8,0,0,0,0,6,0],
    [8,0,0,0,6,0,0,0,3],
    [4,0,0,8,0,3,0,0,1],
    [7,0,0,0,2,0,0,0,6],
    [0,6,0,0,0,0,2,8,0],
    [0,0,0,4,1,9,0,0,5],
    [0,0,0,0,8,0,0,7,9]
  ],
  medium: [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0]
  ]
}

// Check if a number can be placed in a specific position
const isValid = (grid, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false
  }
  
  // Check column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) return false
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3
  for (let y = boxRow; y < boxRow + 3; y++) {
    for (let x = boxCol; x < boxCol + 3; x++) {
      if (grid[y][x] === num) return false
    }
  }
  
  return true
}

// Solve the Sudoku puzzle using backtracking
const solveSudoku = (grid) => {
  const solution = JSON.parse(JSON.stringify(grid))
  const steps = []
  
  const solve = (row, col) => {
    if (row === 9) return true
    
    if (col === 9) return solve(row + 1, 0)
    
    if (solution[row][col] !== 0) return solve(row, col + 1)
    
    for (let num = 1; num <= 9; num++) {
      if (isValid(solution, row, col, num)) {
        solution[row][col] = num
        steps.push({
          row,
          col,
          value: num,
          explanation: `Placed ${num} at position (${row + 1},${col + 1}) as it's valid for this cell.`
        })
        
        if (solve(row, col + 1)) return true
        
        // If we get here, this number didn't work
        solution[row][col] = 0
        steps.push({
          row,
          col,
          value: 0,
          explanation: `Removed ${num} from position (${row + 1},${col + 1}) as it led to conflicts.`
        })
      }
    }
    
    return false
  }
  
  const success = solve(0, 0)
  return { solution: success ? solution : null, steps }
}

const MainFeature = () => {
  const [grid, setGrid] = useState(createEmptyGrid())
  const [selectedCell, setSelectedCell] = useState(null)
  const [solution, setSolution] = useState(null)
  const [solutionSteps, setSolutionSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [displayGrid, setDisplayGrid] = useState(createEmptyGrid())
  const [solving, setSolving] = useState(false)
  const [error, setError] = useState(null)
  const [mode, setMode] = useState('input') // 'input', 'solution', 'step'
  const [difficulty, setDifficulty] = useState('easy')
  
  // Load a sample puzzle
  const loadSample = () => {
    setGrid(JSON.parse(JSON.stringify(samplePuzzles[difficulty])))
    setDisplayGrid(JSON.parse(JSON.stringify(samplePuzzles[difficulty])))
    setMode('input')
    setSolution(null)
    setSolutionSteps([])
    setCurrentStepIndex(0)
    setError(null)
  }
  
  // Reset the grid
  const resetGrid = () => {
    setGrid(createEmptyGrid())
    setDisplayGrid(createEmptyGrid())
    setSelectedCell(null)
    setSolution(null)
    setSolutionSteps([])
    setCurrentStepIndex(0)
    setMode('input')
    setError(null)
  }
  
  // Handle cell selection
  const handleCellSelect = (row, col) => {
    if (mode === 'input') {
      setSelectedCell({ row, col })
    }
  }
  
  // Handle number input
  const handleNumberInput = (num) => {
    if (selectedCell && mode === 'input') {
      const newGrid = [...grid]
      newGrid[selectedCell.row][selectedCell.col] = num
      setGrid(newGrid)
      setDisplayGrid(newGrid)
    }
  }
  
  // Solve the puzzle
  const handleSolve = () => {
    // Check if the grid is empty
    const isEmpty = grid.flat().every(cell => cell === 0)
    if (isEmpty) {
      setError("Please enter a puzzle first or load a sample puzzle.")
      return
    }
    
    setError(null)
    setSolving(true)
    
    // Simulate a delay for solving (in a real app, this might take time)
    setTimeout(() => {
      try {
        const { solution, steps } = solveSudoku(grid)
        
        if (solution) {
          setSolution(solution)
          setSolutionSteps(steps)
          setMode('solution')
          setDisplayGrid(solution)
        } else {
          setError("This puzzle cannot be solved. Please check your input.")
        }
      } catch (err) {
        setError("An error occurred while solving the puzzle.")
      } finally {
        setSolving(false)
      }
    }, 1500)
  }
  
  // Show solution step by step
  const handleStepSolution = () => {
    if (solutionSteps.length > 0) {
      setMode('step')
      setCurrentStepIndex(0)
      setDisplayGrid(JSON.parse(JSON.stringify(grid)))
    }
  }
  
  // Go to next step
  const handleNextStep = () => {
    if (currentStepIndex < solutionSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }
  
  // Update display grid when step changes
  useEffect(() => {
    if (mode === 'step' && solutionSteps.length > 0) {
      const newGrid = JSON.parse(JSON.stringify(displayGrid))
      const step = solutionSteps[currentStepIndex]
      newGrid[step.row][step.col] = step.value
      setDisplayGrid(newGrid)
    }
  }, [currentStepIndex, mode])
  
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-surface-900 dark:text-white">
            {mode === 'input' ? 'Input Puzzle' : mode === 'solution' ? 'Solution' : 'Step-by-Step Solution'}
          </h2>
          
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={resetGrid}
              className="p-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
              aria-label="Reset grid"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
        
        {/* Sudoku Grid */}
        <div className="relative">
          <div className="grid grid-cols-9 gap-px bg-surface-300 dark:bg-surface-700 p-px rounded-lg overflow-hidden shadow-card">
            {displayGrid.map((row, rowIndex) => (
              row.map((cell, colIndex) => {
                const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
                const isOriginal = grid[rowIndex][colIndex] !== 0
                const isBorderRight = (colIndex + 1) % 3 === 0 && colIndex < 8
                const isBorderBottom = (rowIndex + 1) % 3 === 0 && rowIndex < 8
                
                return (
                  <motion.button
                    key={`${rowIndex}-${colIndex}`}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleCellSelect(rowIndex, colIndex)}
                    className={`
                      aspect-square flex items-center justify-center text-lg font-medium
                      ${isSelected ? 'bg-primary/20 dark:bg-primary/30' : 'bg-white dark:bg-surface-800'}
                      ${isBorderRight ? 'border-r-2 border-surface-400 dark:border-surface-600' : ''}
                      ${isBorderBottom ? 'border-b-2 border-surface-400 dark:border-surface-600' : ''}
                      ${isOriginal ? 'font-bold text-surface-900 dark:text-white' : 'text-primary'}
                      transition-colors
                    `}
                    disabled={mode !== 'input' || isOriginal}
                  >
                    {cell !== 0 ? cell : ''}
                  </motion.button>
                )
              })
            ))}
          </div>
          
          {/* Loading overlay */}
          <AnimatePresence>
            {solving && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 dark:bg-surface-900/80 rounded-lg flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <Loader2 className="w-10 h-10 text-primary animate-spin mb-2" />
                  <p className="text-surface-900 dark:text-white font-medium">Solving puzzle...</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-2"
            >
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Step explanation */}
        {mode === 'step' && solutionSteps.length > 0 && (
          <div className="mt-4 p-4 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-primary" />
              <h3 className="font-medium text-surface-900 dark:text-white">Step {currentStepIndex + 1} of {solutionSteps.length}</h3>
            </div>
            <p className="text-sm text-surface-600 dark:text-surface-400">
              {solutionSteps[currentStepIndex]?.explanation || "No explanation available."}
            </p>
          </div>
        )}
      </div>
      
      <div className="lg:w-64">
        {mode === 'input' && (
          <>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Number Pad</h3>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <motion.button
                    key={num}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNumberInput(num)}
                    className="aspect-square flex items-center justify-center bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-lg font-medium text-surface-900 dark:text-white transition-colors"
                    disabled={!selectedCell}
                  >
                    {num}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberInput(0)}
                  className="aspect-square col-span-3 flex items-center justify-center bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 transition-colors"
                  disabled={!selectedCell}
                >
                  Clear
                </motion.button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Sample Puzzles</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <button
                    onClick={() => setDifficulty('easy')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      difficulty === 'easy' 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setDifficulty('medium')}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      difficulty === 'medium' 
                        ? 'bg-primary text-white' 
                        : 'bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-400 hover:bg-surface-200 dark:hover:bg-surface-700'
                    }`}
                  >
                    Medium
                  </button>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={loadSample}
                  className="w-full py-2 px-4 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-sm font-medium text-surface-900 dark:text-white transition-colors"
                >
                  Load Sample
                </motion.button>
              </div>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSolve}
              disabled={solving}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {solving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  Solve Puzzle
                </>
              )}
            </motion.button>
          </>
        )}
        
        {(mode === 'solution' || mode === 'step') && (
          <>
            {mode === 'solution' && (
              <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-800 dark:text-green-400 mb-1">Puzzle Solved!</h3>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    The solution has been found. You can view it step by step or start a new puzzle.
                  </p>
                </div>
              </div>
            )}
            
            {mode === 'step' && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Solution Progress</h3>
                <div className="h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${(currentStepIndex + 1) / solutionSteps.length * 100}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex justify-between text-xs text-surface-500">
                  <span>Step {currentStepIndex + 1}</span>
                  <span>Total {solutionSteps.length}</span>
                </div>
              </div>
            )}
            
            <div className="flex flex-col gap-3">
              {mode === 'solution' && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleStepSolution}
                  className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-5 h-5" />
                  Show Step by Step
                </motion.button>
              )}
              
              {mode === 'step' && (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNextStep}
                  disabled={currentStepIndex >= solutionSteps.length - 1}
                  className="w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next Step
                </motion.button>
              )}
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMode('input')
                  setDisplayGrid(grid)
                }}
                className="w-full py-2 px-4 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-sm font-medium text-surface-900 dark:text-white transition-colors"
              >
                Back to Input
              </motion.button>
              
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={resetGrid}
                className="w-full py-2 px-4 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-sm font-medium text-surface-900 dark:text-white transition-colors"
              >
                New Puzzle
              </motion.button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default MainFeature