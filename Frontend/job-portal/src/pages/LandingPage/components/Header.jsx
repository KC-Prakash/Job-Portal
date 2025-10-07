import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { Link } from 'react-router-dom'

const Header = () => {
  const { user, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    {
      name: 'Find Jobs',
      action: () => navigate('/find-jobs'),
    },
    {
      name: 'For Employers',
      action: () =>
        navigate(isAuthenticated && user?.role === 'employer' ? '/employer-dashboard' : '/login'),
    },
  ]

  const authLinks = isAuthenticated
    ? [
        {
          name: 'Dashboard',
          action: () => navigate(user?.role === 'employer' ? '/employer-dashboard' : '/find-jobs'),
          style: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
        },
      ]
    : [
        {
          name: 'Login',
          action: () => navigate('/login'),
          style: 'text-gray-600 hover:bg-gray-100',
        },
        {
          name: 'Sign Up',
          action: () => navigate('/signup'),
          style: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white',
        },
      ]

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link className="flex items-center space-x-3" to="/">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JobPortal</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={link.action}
                className="text-gray-600 hover:text-gray-900 transition-colors font-medium cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated && (
              <span className="text-gray-700 mr-2">Welcome, {user?.name || ''}</span>
            )}
            {authLinks.map((link, index) => (
              <motion.button
                key={index}
                onClick={link.action}
                className={`${link.style} px-4 py-2 rounded-lg font-medium transition-all duration-300 shadow-sm hover:shadow-md`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-4 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={`mobile-nav-${index}`}
                    onClick={() => {
                      link.action()
                      setMobileMenuOpen(false)
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium"
                    whileTap={{ scale: 0.98 }}
                  >
                    {link.name}
                  </motion.button>
                ))}

                <div className="border-t border-gray-200 mt-2 pt-2">
                  {isAuthenticated && (
                    <div className="px-4 py-2 text-gray-700">Welcome, {user.FullName}</div>
                  )}
                  {authLinks.map((link, index) => (
                    <motion.button
                      key={`mobile-auth-${index}`}
                      onClick={() => {
                        link.action()
                        setMobileMenuOpen(false)
                      }}
                      className={`block w-full text-left px-4 py-2 rounded-lg font-medium mt-2 ${link.style}`}
                      whileTap={{ scale: 0.98 }}
                    >
                      {link.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
