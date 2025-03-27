import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import SizeSelector from '../components/SizeSelector'
import SudokuGuide from '../components/SudokuGuide'

const Home = () => {
  const [activeTab, setActiveTab] = useState('solve')
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <section className="mb-12">
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-surface-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Unlock the Secrets of <span className="text-primary">Sudoku</span>
          </motion.h1>
          <motion.p 
            className="text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Input your puzzle, watch it solve step-by-step, and learn advanced techniques
          </motion.p>
        </div>
        
        <div className="bg-white dark:bg-surface-800 rounded-2xl shadow-card overflow-hidden">
          <div className="border-b border-surface-200 dark:border-surface-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab('solve')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'solve' 
                    ? 'text-primary' 
                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
              >
                Solve Puzzle
                {activeTab === 'solve' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('generate')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'generate' 
                    ? 'text-primary' 
                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
              >
                Generate Puzzle
                {activeTab === 'generate' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('learn')}
                className={`px-6 py-4 text-sm font-medium transition-colors relative ${
                  activeTab === 'learn' 
                    ? 'text-primary' 
                    : 'text-surface-500 hover:text-surface-700 dark:hover:text-surface-300'
                }`}
              >
                Learn Techniques
                {activeTab === 'learn' && (
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    layoutId="activeTab"
                  />
                )}
              </button>
            </div>
          </div>
          
          <div className="p-6">
            {activeTab === 'solve' && <MainFeature />}
            
            {activeTab === 'generate' && (
              <div className="py-8">
                <h2 className="text-2xl font-bold text-center mb-8 text-surface-900 dark:text-white">
                  Select Puzzle Size
                </h2>
                <SizeSelector />
              </div>
            )}
            
            {activeTab === 'learn' && (
              <div className="py-4">
                <SudokuGuide />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home