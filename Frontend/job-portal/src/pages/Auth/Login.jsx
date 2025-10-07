import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Eye, EyeOff, Loader, Lock, Mail, X } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import { validateEmail } from '../../utils/helper'

const Login = () => {
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [formState, setFormState] = useState({
    loading: false,
    error: {},
    showPassword: false,
    success: false,
  })

  const validatePassword = (password) => {
    if (!password.trim()) return 'Password is required'
    return ''
  }
  //Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))

    // Clear error when user starts typing
    if (formState.error[name]) {
      setFormState((prev) => ({
        ...prev,
        error: { ...prev.error, [name]: '' },
      }))
    }
  }

  const validateForm = () => {
    const error = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    }
    // Remove empty error
    Object.keys(error).forEach((key) => {
      if (error[key] === '') delete error[key]
    })
    setFormState((prev) => ({ ...prev, error }))
    return Object.keys(error).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setFormState((prev) => ({ ...prev, loading: true }))

    try {
      // Login API Integration
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      })

      setFormState((prev) => ({
        ...prev,
        loading: false,
        success: true,
        error: {},
      }))

      const { token, role } = response.data

      if (token) {
        login(response.data, token)

        // Redirect based on role
        setTimeout(() => {
          window.location.href = role === 'employer' ? '/employer-dashboard' : '/find-jobs'
        }, 2000)
      }
      //redirect based on user role
      setTimeout(() => {
        const redirectPath = user.role === 'employer' ? '/employer-dashboard' : '/find-jobs'
        window.location.href = redirectPath
      }, 2000)
    } catch (error) {
      setFormState((prev) => ({
        ...prev,
        loading: false,
        error: {
          submit: error.response?.data?.message || 'Login failed. Please check your credentials.',
        },
      }))
    }
  }

  if (formState.success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-4">You have been successfully logged in.</p>
          <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Redirecting to your dashboard.</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back to JobPortal</h2>
          <p className="text-gray-600">Sign in to your JobPortal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-10 py-2.5 sm:py-3 rounded-lg border ${
                  formState.error.email ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                placeholder="Enter your email"
              />
              {formData.email && (
                <button
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, email: '' }))}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                    <X className="w-4 h-4" />
                  </div>
                </button>
              )}
            </div>
            {formState.error.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type={formState.showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full pl-10 pr-12 py-2.5 sm:py-3 rounded-lg border ${
                  formState.error.password ? 'border-red-500' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300`}
                placeholder="Enter your password"
              />
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex space-x-1">
                {formData.password && (
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, password: '' }))}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                      <X className="w-4 h-4" />
                    </div>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() =>
                    setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }))
                  }
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                    {formState.showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </div>
                </button>
              </div>
            </div>
            {formState.error.password && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {formState.error.password}
              </p>
            )}
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          {/* Submit Error */}
          {formState.error.submit && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {formState.error.submit}
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full flex justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 transition-colors duration-300 disabled:opacity-70"
          >
            {formState.loading ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center pt-2">
            <p className="text-gray-600 text-sm sm:text-base">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
                Create one here
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

export default Login
