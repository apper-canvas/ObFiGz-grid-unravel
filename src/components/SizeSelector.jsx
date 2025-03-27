import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const SizeSelector = () => {
  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState(null)
  const navigate = useNavigate()

  const puzzleSizes = [
    { id: '4x4', label: '4×4', description: 'Perfect for beginners' },
    { id: '6x6', label: '6×6', description: 'Intermediate challenge' },
    { id: '9x9', label: '9×9', description: 'Classic Sudoku' }
  ]

  const difficulties = [
    { id: 'easy', label: 'Easy', color: 'bg-green-500' },
    { id: 'medium', label: 'Medium', color: 'bg-yellow-500' },
    { id: 'hard', label: 'Hard', color: 'bg-red-500' }
  ]

  const handleStartPuzzle = () => {
    if (selectedSize && selectedDifficulty) {
      navigate(`/puzzle/${selectedSize}/${selectedDifficulty}`)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl mb-8">
        <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">
          Choose a Grid Size:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {puzzleSizes.map(size => (
            <motion.div
              key={size.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSize(size.id)}
              className={`
                cursor-pointer p-4 rounded-xl border-2 transition-all
                ${selectedSize === size.id ? 
                  'border-primary bg-primary/10 dark:bg-primary/20' : 
                  'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'}
              `}
            >
              <div className="flex flex-col items-center">
                <div className={`
                  grid ${size.id === '4x4' ? 'grid-cols-4' : size.id === '6x6' ? 'grid-cols-6' : 'grid-cols-9'} 
                  gap-px bg-surface-300 dark:bg-surface-700 p-1 rounded-lg mb-3 w-full max-w-[180px]
                `}>
                  {Array.from({ length: size.id === '4x4' ? 16 : size.id === '6x6' ? 36 : 81 }).map((_, i) => (
                    <div 
                      key={i}
                      className="aspect-square bg-white dark:bg-surface-800"
                    ></div>
                  ))}
                </div>
                <h4 className="font-bold text-lg">{size.label}</h4>
                <p className="text-sm text-surface-600 dark:text-surface-400">{size.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSize && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl mb-8"
        >
          <h3 className="text-lg font-semibold mb-4 text-surface-900 dark:text-white">
            Select Difficulty:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {difficulties.map(difficulty => (
              <motion.div
                key={difficulty.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`
                  cursor-pointer p-4 rounded-xl border-2 transition-all flex items-center
                  ${selectedDifficulty === difficulty.id ? 
                    'border-primary bg-primary/10 dark:bg-primary/20' : 
                    'border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-800'}
                `}
              >
                <div className={`w-3 h-3 rounded-full ${difficulty.color} mr-3`}></div>
                <div>
                  <h4 className="font-bold">{difficulty.label}</h4>
                  <p className="text-xs text-surface-600 dark:text-surface-400">
                    {difficulty.id === 'easy' ? 'More starting numbers' : 
                     difficulty.id === 'medium' ? 'Balanced challenge' : 
                     'Fewer starting numbers'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={handleStartPuzzle}
        className="btn btn-primary px-8 py-3 text-lg mt-4"
        disabled={!selectedSize || !selectedDifficulty}
      >
        Start Puzzle
      </motion.button>
    </div>
  )
}

export default SizeSelector