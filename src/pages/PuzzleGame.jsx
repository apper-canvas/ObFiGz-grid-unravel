import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, RefreshCw, Clock, Award } from 'lucide-react'
import PuzzleGrid from '../components/PuzzleGrid'
import { generatePuzzle, checkSolution } from '../utils/puzzleGenerator'

const PuzzleGame = () => {
  const { size, difficulty } = useParams()
  const navigate = useNavigate()
  const [puzzle, setPuzzle] = useState(null)
  const [userGrid, setUserGrid] = useState(null)
  const [originalGrid, setOriginalGrid] = useState(null)
  const [selectedCell, setSelectedCell] = useState(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(true)
  const [gameStatus, setGameStatus] = useState('playing') // 'playing', 'completed', 'checking'
  const [hints, setHints] = useState(3)
  
  // Initialize the game
  useEffect(() => {
    const gridSize = parseInt(size.split('x')[0])
    const newPuzzle = generatePuzzle(gridSize, difficulty)
    setPuzzle(newPuzzle)
    setOriginalGrid(JSON.parse(JSON.stringify(newPuzzle.grid)))
    setUserGrid(JSON.parse(JSON.stringify(newPuzzle.grid)))
  }, [size, difficulty])

  // Timer logic
  useEffect(() => {
    let interval = null
    if (isRunning && gameStatus === 'playing') {
      interval = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isRunning, gameStatus])

  // Format time as MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0')
    const seconds = (time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  // Handle cell selection
  const handleCellSelect = (row, col) => {
    // Don't allow modifying original cells
    if (originalGrid && originalGrid[row][col] !== 0) {
      return
    }
    setSelectedCell({ row, col })
  }

  // Handle number input
  const handleNumberInput = (num) => {
    if (selectedCell && gameStatus === 'playing') {
      const { row, col } = selectedCell
      const newGrid = [...userGrid]
      
      // Only allow valid numbers for the grid size
      const gridSize = parseInt(size.split('x')[0])
      if (num === 0 || (num > 0 && num <= gridSize)) {
        newGrid[row][col] = num
        setUserGrid(newGrid)
        
        // Check if the puzzle is complete
        const isComplete = newGrid.every((row, rowIndex) => 
          row.every((cell, colIndex) => 
            cell !== 0 && (originalGrid[rowIndex][colIndex] !== 0 || cell === puzzle.solution[rowIndex][colIndex])
          )
        )
        
        if (isComplete) {
          setGameStatus('checking')
          setTimeout(() => {
            const result = checkSolution(newGrid, puzzle.solution)
            setGameStatus(result ? 'completed' : 'playing')
            setIsRunning(!result)
          }, 1500)
        }
      }
    }
  }

  // Use a hint
  const useHint = () => {
    if (hints > 0 && selectedCell && gameStatus === 'playing') {
      const { row, col } = selectedCell
      if (originalGrid[row][col] === 0) {
        const newGrid = [...userGrid]
        newGrid[row][col] = puzzle.solution[row][col]
        setUserGrid(newGrid)
        setHints(hints - 1)
      }
    }
  }

  // Restart the game
  const restartGame = () => {
    setUserGrid(JSON.parse(JSON.stringify(originalGrid)))
    setSelectedCell(null)
    setTimeElapsed(0)
    setIsRunning(true)
    setGameStatus('playing')
  }

  // Go back to puzzle selection
  const goBack = () => {
    navigate('/')
  }

  const maxNum = parseInt(size.split('x')[0])
  const numArray = Array.from({ length: maxNum }, (_, i) => i + 1)

  if (!puzzle || !userGrid) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600 dark:text-surface-400">Loading puzzle...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-surface-600 dark:text-surface-400 hover:text-primary dark:hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Selection</span>
        </button>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-mono font-medium">{formatTime(timeElapsed)}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-yellow-500" />
            <span className="font-medium">{hints} hints</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
            {size} Puzzle <span className="text-primary capitalize">{difficulty}</span>
          </h1>
          
          <button
            onClick={restartGame}
            className="p-2 rounded-lg text-surface-600 hover:text-surface-900 dark:text-surface-400 dark:hover:text-white bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Puzzle Grid */}
            <PuzzleGrid
              grid={userGrid}
              originalGrid={originalGrid}
              size={size}
              selectedCell={selectedCell}
              onCellSelect={handleCellSelect}
              gameStatus={gameStatus}
            />
            
            {/* Game status messages */}
            {gameStatus === 'checking' && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-center text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking your solution...
                </p>
              </div>
            )}
            
            {gameStatus === 'completed' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
              >
                <h3 className="text-lg font-bold text-green-700 dark:text-green-400 text-center mb-2">
                  Puzzle Completed!
                </h3>
                <p className="text-center text-green-600 dark:text-green-500">
                  You solved the puzzle in {formatTime(timeElapsed)}
                </p>
                <div className="mt-4 flex justify-center gap-4">
                  <button 
                    onClick={restartGame}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={goBack}
                    className="px-4 py-2 bg-surface-200 dark:bg-surface-700 hover:bg-surface-300 dark:hover:bg-surface-600 text-surface-800 dark:text-surface-200 rounded-lg transition-colors"
                  >
                    New Puzzle
                  </button>
                </div>
              </motion.div>
            )}
          </div>
          
          <div className="lg:w-64">
            {gameStatus === 'playing' && (
              <>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-surface-900 dark:text-white mb-2">Number Pad</h3>
                  <div className={`grid grid-cols-${maxNum <= 4 ? 2 : 3} gap-2`}>
                    {numArray.map(num => (
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
                      className={`aspect-square ${maxNum <= 4 ? 'col-span-2' : 'col-span-3'} flex items-center justify-center bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 rounded-lg text-sm font-medium text-surface-600 dark:text-surface-400 transition-colors`}
                      disabled={!selectedCell}
                    >
                      Clear
                    </motion.button>
                  </div>
                </div>

                <button
                  onClick={useHint}
                  disabled={hints <= 0 || !selectedCell}
                  className="w-full py-2 mb-4 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 dark:disabled:bg-yellow-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Use Hint ({hints} left)
                </button>
                
                <div className="p-4 bg-surface-100 dark:bg-surface-700 rounded-lg">
                  <h3 className="font-medium text-surface-900 dark:text-white mb-2">How to Play</h3>
                  <ul className="text-sm text-surface-600 dark:text-surface-400 space-y-2">
                    <li>• Fill each cell with a number from 1 to {maxNum}</li>
                    <li>• Each row must contain unique numbers</li>
                    <li>• Each column must contain unique numbers</li>
                    <li>• Each {Math.sqrt(maxNum)}×{Math.sqrt(maxNum)} box must contain unique numbers</li>
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PuzzleGame