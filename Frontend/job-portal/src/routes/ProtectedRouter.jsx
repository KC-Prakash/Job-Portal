import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const ProtectedRouter = ({ requiredRole }) => {
    const { user, isAuthenticated, loading } = useAuth()

    // Loading check
    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>

    // Not logged in → redirect to login
    if (!isAuthenticated) return <Navigate to="/login" replace />

    // Role check → redirect if user.role != requiredRole
    if (requiredRole && user?.role !== requiredRole) {
        return <Navigate to="/" replace /> // Or any unauthorized page
    }

    // Authorized → render nested routes
    return <Outlet />
}

export default ProtectedRouter
