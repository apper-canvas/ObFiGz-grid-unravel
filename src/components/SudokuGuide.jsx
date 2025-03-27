import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertCircle, CircleCheck, Target, Eye, Scan, Filter, CornerDownRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Technique = ({ title, difficulty, children }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    intermediate: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    advanced: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    expert: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
  }
  
  return (
    <div className="border border-surface-200 dark:border-surface-700 rounded-lg mb-4 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-white dark:bg-surface-800 text-left"
      >
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-surface-900 dark:text-white">{title}</span>
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[difficulty]}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-surface-500" />
        ) : (
          <ChevronDown className="w-5 h-5 text-surface-500" />
        )}
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 bg-surface-50 dark:bg-surface-900 border-t border-surface-200 dark:border-surface-700">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ExampleGrid = ({ highlightCells = [], caption }) => {
  // Sample 4x4 grid for simpler examples
  const grid = [
    [1, 0, 0, 4],
    [0, 0, 1, 0],
    [4, 1, 0, 0],
    [0, 0, 4, 1]
  ]
  
  return (
    <div className="my-4">
      <div className="w-full max-w-[200px] mx-auto">
        <div className="grid grid-cols-4 gap-px bg-surface-300 dark:bg-surface-700 p-px rounded-lg overflow-hidden">
          {grid.map((row, rowIndex) => (
            row.map((cell, colIndex) => {
              const isHighlighted = highlightCells.some(([r, c]) => r === rowIndex && c === colIndex)
              
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                    aspect-square flex items-center justify-center text-lg font-medium
                    ${isHighlighted ? 'grid-cell-highlight' : 'bg-white dark:bg-surface-800'}
                    transition-colors
                  `}
                >
                  {cell !== 0 ? cell : ''}
                </div>
              )
            })
          ))}
        </div>
      </div>
      {caption && (
        <p className="text-sm text-center text-surface-600 dark:text-surface-400 mt-2">{caption}</p>
      )}
    </div>
  )
}

const SudokuGuide = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2 text-surface-900 dark:text-white">Sudoku Solving Techniques</h2>
        <p className="text-surface-600 dark:text-surface-400">
          Master these strategies to solve any Sudoku puzzle. Techniques are organized from beginner to expert level.
        </p>
      </div>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
            <CircleCheck className="w-4 h-4 text-green-600 dark:text-green-400" />
          </div>
          Beginner Techniques
        </h3>
        
        <Technique title="Scanning" difficulty="beginner">
          <div className="flex items-start gap-3 mb-4">
            <Scan className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                Scanning is the most basic technique for solving Sudoku puzzles. It involves systematically checking each row, column, and box to identify where a specific number can be placed.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "Always start by scanning for numbers that appear frequently in the puzzle, like 1, 5, or 9."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to scan:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Choose a number (1-9) that already appears several times in the puzzle</li>
              <li>For each row, column, and 3×3 box that doesn't contain this number, mark where it could potentially go</li>
              <li>If there's only one possible position in any row, column, or box, that's where the number belongs</li>
            </ol>
          </div>
          
          <ExampleGrid 
            highlightCells={[[0, 1], [0, 2]]} 
            caption="Scanning row 1 for possible positions of number 2" 
          />
        </Technique>
        
        <Technique title="Naked Singles" difficulty="beginner">
          <div className="flex items-start gap-3 mb-4">
            <Target className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Naked Single is when a cell has only one possible value. This happens when all other values are eliminated based on what's already in its row, column, and box.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "Naked Singles are the easiest patterns to spot and should always be your first solving technique."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find Naked Singles:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Identify empty cells</li>
              <li>For each empty cell, check what numbers are already present in its row, column, and 3×3 box</li>
              <li>If there's only one number (1-9) that isn't present in any of these regions, that's your answer</li>
            </ol>
          </div>
          
          <ExampleGrid 
            highlightCells={[[1, 1]]} 
            caption="This cell can only be 2 since all other values appear in its row, column or box" 
          />
        </Technique>
        
        <Technique title="Hidden Singles" difficulty="beginner">
          <div className="flex items-start gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Hidden Single occurs when a number can only go in one cell within a row, column, or box - even though that cell could potentially contain other numbers.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "While a cell might accept multiple values, if it's the only place where a specific number can go in its row, column, or box, then it must contain that number."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find Hidden Singles:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Focus on one row, column, or box at a time</li>
              <li>For each number (1-9) that's missing from this region, find all possible cells where it could go</li>
              <li>If a number can only go in one cell within the region, place it there - even if that cell could accept other numbers</li>
            </ol>
          </div>
          
          <ExampleGrid 
            highlightCells={[[2, 2]]} 
            caption="In this box, 3 can only go in the highlighted cell, making it a Hidden Single" 
          />
        </Technique>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
            <Filter className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          Intermediate Techniques
        </h3>
        
        <Technique title="Naked Pairs" difficulty="intermediate">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 text-primary shrink-0 mt-1 flex justify-center items-center font-bold">2</div>
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Naked Pair occurs when two cells in the same row, column, or box can only contain the same two numbers. This means these two numbers can't appear elsewhere in that region.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "When you find two cells that can only contain the same two candidates, you can eliminate those candidates from all other cells in that row, column, or box."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to use Naked Pairs:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Look for two cells in the same row, column, or box that have the same two candidates</li>
              <li>These two numbers must go in these two cells (though you don't know which goes where)</li>
              <li>Remove these two numbers as possibilities from all other cells in that row, column, or box</li>
            </ol>
          </div>
          
          <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-700 dark:text-surface-300 mb-4">
            <span className="font-bold text-primary">Example:</span> If cells A and B in the same row can only contain 2 or 7, then no other cell in that row can contain 2 or 7. This often leads to discovering other Naked Singles or Hidden Singles.
          </div>
        </Technique>
        
        <Technique title="Hidden Pairs" difficulty="intermediate">
          <div className="flex items-start gap-3 mb-4">
            <CornerDownRight className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Hidden Pair occurs when two numbers can only be placed in the same two cells within a row, column, or box, even though those cells may have other candidates.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "When you find a Hidden Pair, you can eliminate all other candidates from those two cells."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find Hidden Pairs:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Look for two numbers that can only go in the same two cells of a row, column, or box</li>
              <li>Once identified, you can remove all other candidate numbers from those two cells</li>
              <li>This often creates new Naked Singles or simplifies the puzzle</li>
            </ol>
          </div>
          
          <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-700 dark:text-surface-300">
            <span className="font-bold text-primary">Example:</span> If numbers 4 and 8 can only go in cells C and D in a row (even though C and D might have other candidates like 1, 6, or 9), then cells C and D must contain 4 and 8 exclusively. You can remove 1, 6, and 9 from both cells.
          </div>
        </Technique>
        
        <Technique title="Pointing Pairs/Triples" difficulty="intermediate">
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                Pointing Pairs or Triples occur when a certain number in a box can only be placed in cells that all lie in the same row or column.
              </p>
              <div className="mb-2 pl-4 border-l-2 border-primary/30 italic text-surface-600 dark:text-surface-400">
                "This technique connects box logic with row/column logic, creating powerful eliminations."
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to use Pointing Pairs/Triples:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Find a number that can only go in two or three cells of a box</li>
              <li>If these cells all lie in the same row or column, then that number cannot appear elsewhere in that row or column</li>
              <li>Eliminate this number as a candidate from other cells in that row or column (outside the box)</li>
            </ol>
          </div>
          
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm mb-4">
            <p className="text-yellow-800 dark:text-yellow-400 font-medium">Strategic Tip:</p>
            <p className="text-yellow-700 dark:text-yellow-500">Look for boxes where a number appears as a candidate in only 2-3 cells that share a row or column. This often provides valuable eliminations.</p>
          </div>
        </Technique>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-surface-900 dark:text-white flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center">
            <Target className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          Advanced Techniques
        </h3>
        
        <Technique title="X-Wing" difficulty="advanced">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 text-primary shrink-0 mt-1 font-bold flex items-center justify-center">X</div>
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                An X-Wing pattern occurs when a number appears as a candidate in exactly the same two positions in two different rows. This creates a rectangle where the number must be in two of the corners, allowing you to eliminate it from other cells.
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find X-Wings:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Look for a number that appears exactly twice in each of two different rows</li>
              <li>If these candidates form a rectangle (same columns), they form an X-Wing</li>
              <li>The number must be in two corners of this rectangle (though you don't know which two)</li>
              <li>You can eliminate this number from any other cells in those columns</li>
            </ol>
          </div>
          
          <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-700 dark:text-surface-300 mb-4">
            <span className="font-bold text-primary">Example:</span> If number 7 appears only in columns 2 and 5 within rows 3 and 8, then 7 must be in two of these four cells. This means 7 cannot appear elsewhere in columns 2 and 5.
          </div>
          
          <p className="text-sm text-surface-600 dark:text-surface-400">
            <span className="font-bold text-primary">Note:</span> The same pattern can occur with columns instead of rows - look for a number that appears exactly twice in each of two different columns, forming a rectangle across rows.
          </p>
        </Technique>
        
        <Technique title="Y-Wing" difficulty="advanced">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 text-primary shrink-0 mt-1 font-bold flex items-center justify-center">Y</div>
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Y-Wing (also called XY-Wing) involves three cells with specific candidate patterns that allow for eliminations. The pattern requires a "pivot" cell with two candidates and two "wing" cells that each share one candidate with the pivot.
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find Y-Wings:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Find a "pivot" cell with exactly two candidates (A,B)</li>
              <li>Find two "wing" cells that:
                <ul className="ml-4 list-disc mt-1 mb-1">
                  <li>Each have exactly two candidates</li>
                  <li>Each share one candidate with the pivot (A,C and B,C)</li>
                  <li>Both see each other (share a row, column, or box)</li>
                </ul>
              </li>
              <li>The third number (C) can be eliminated from any cell that sees both wing cells</li>
            </ol>
          </div>
          
          <div className="p-3 bg-surface-100 dark:bg-surface-800 rounded-lg text-sm text-surface-700 dark:text-surface-300">
            <span className="font-bold text-primary">Example:</span> If a pivot cell contains candidates 2,7 and connects to a wing cell with 2,4 and another wing cell with 7,4, then 4 can be eliminated from any cell that sees both wing cells.
          </div>
        </Technique>
        
        <Technique title="Swordfish" difficulty="expert">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-6 h-6 text-primary shrink-0 mt-1 font-bold flex items-center justify-center">S</div>
            <div>
              <p className="mb-2 text-surface-800 dark:text-surface-200">
                A Swordfish is an extension of the X-Wing pattern that spans three rows and three columns. It's one of the more complex techniques but can be very powerful for solving difficult puzzles.
              </p>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-surface-900 dark:text-white">How to find Swordfish patterns:</h4>
            <ol className="ml-6 space-y-2 list-decimal text-surface-800 dark:text-surface-200">
              <li>Look for a number that appears in 2-3 positions in each of three different rows</li>
              <li>If these positions are limited to three columns total, you have a Swordfish</li>
              <li>This number must appear in three of the possible nine positions</li>
              <li>You can eliminate this number from other cells in those three columns</li>
            </ol>
          </div>
          
          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg text-sm">
            <p className="text-yellow-800 dark:text-yellow-400 font-medium">Advanced Tip:</p>
            <p className="text-yellow-700 dark:text-yellow-500">Swordfish patterns can be difficult to spot. Try looking for them when you're stuck on a very challenging puzzle and other techniques aren't yielding results.</p>
          </div>
        </Technique>
      </section>
      
      <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-lg mb-6">
        <h3 className="font-bold mb-2 text-primary">Practice Makes Perfect</h3>
        <p className="text-surface-800 dark:text-surface-200">
          The best way to improve your Sudoku skills is through consistent practice. Start with easier puzzles and gradually work your way up to more difficult ones as you master these techniques.
        </p>
      </div>
      
      <div className="text-center mb-8">
        <button className="btn btn-primary">
          Try Solving a Puzzle
        </button>
      </div>
    </div>
  )
}

export default SudokuGuide