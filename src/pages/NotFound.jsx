import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8 relative">
          <div className="w-32 h-32 mx-auto bg-surface-100 dark:bg-surface-800 rounded-2xl grid grid-cols-3 grid-rows-3 p-2 shadow-neu-light dark:shadow-neu-dark">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`${
                  i === 4 ? 'bg-accent' : 'bg-surface-300 dark:bg-surface-700'
                } m-1 rounded-md flex items-center justify-center`}
              >
                {i === 4 && (
                  <span className="text-white font-bold text-xl">?</span>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 text-surface-900 dark:text-white">
          Page Not Found
        </h1>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center gap-2 btn btn-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound