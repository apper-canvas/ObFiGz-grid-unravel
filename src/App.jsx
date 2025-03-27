import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode')
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-900 transition-colors duration-300">
      <header className="py-4 px-6 flex justify-between items-center border-b border-surface-200 dark:border-surface-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 bg-white dark:bg-surface-800 rounded-md grid grid-cols-3 grid-rows-3 p-0.5">
              {[...Array(9)].map((_, i) => (
                <div 
                  key={i} 
                  className={`${i % 2 === 0 ? 'bg-primary' : 'bg-transparent'} rounded-sm`}
                ></div>
              ))}
            </div>
          </div>
          <h1 className="text-xl font-bold text-surface-900 dark:text-white">
            Grid<span className="text-primary">Unravel</span>
          </h1>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-surface-600" />
          )}
        </motion.button>
      </header>
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <footer className="py-4 px-6 border-t border-surface-200 dark:border-surface-800 text-center text-sm text-surface-500">
        <p>© {new Date().getFullYear()} GridUnravel. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App