import { motion } from 'framer-motion'

const PuzzleGrid = ({ grid, originalGrid, size, selectedCell, onCellSelect, gameStatus }) => {
  const gridSize = parseInt(size.split('x')[0])
  const boxSize = Math.sqrt(gridSize)
  
  return (
    <div className="relative">
      <div className={`grid grid-${size} gap-px bg-surface-300 dark:bg-surface-700 p-px rounded-lg overflow-hidden shadow-card`}>
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => {
            const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex
            const isOriginal = originalGrid[rowIndex][colIndex] !== 0
            const isBorderRight = (colIndex + 1) % boxSize === 0 && colIndex < gridSize - 1
            const isBorderBottom = (rowIndex + 1) % boxSize === 0 && rowIndex < gridSize - 1
            
            return (
              <motion.button
                key={`${rowIndex}-${colIndex}`}
                whileTap={{ scale: 0.97 }}
                onClick={() => onCellSelect(rowIndex, colIndex)}
                className={`
                  aspect-square flex items-center justify-center ${gridSize === 4 ? 'text-xl' : gridSize === 6 ? 'text-lg' : 'text-lg'} font-medium
                  ${isSelected ? 'bg-primary/20 dark:bg-primary/30' : 'bg-white dark:bg-surface-800'}
                  ${isBorderRight ? 'border-r-2 border-surface-400 dark:border-surface-600' : ''}
                  ${isBorderBottom ? 'border-b-2 border-surface-400 dark:border-surface-600' : ''}
                  ${isOriginal ? 'font-bold text-surface-900 dark:text-white' : 'text-primary'}
                  ${gameStatus === 'completed' ? 'cursor-default' : ''}
                  transition-colors
                `}
                disabled={gameStatus !== 'playing' || isOriginal}
              >
                {cell !== 0 ? cell : ''}
              </motion.button>
            )
          })
        ))}
      </div>
      
      {gameStatus === 'checking' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-white/50 dark:bg-surface-900/50 rounded-lg flex items-center justify-center"
        ></motion.div>
      )}
    </div>
  )
}

export default PuzzleGrid