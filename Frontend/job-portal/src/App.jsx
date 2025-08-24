import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage/LandingPage.jsx'
import SignUp from './pages/Auth/SignUp.jsx'
import Login from './pages/Auth/Login.jsx'
import JobSeekerDashboard from './pages/JobSeeker/JobSeekerDashboard.jsx'  
import SavedJobs from './pages/JobSeeker/SavedJobs.jsx'
import UserProfile from './pages/JobSeeker/UserProfile.jsx'
import JobsDetails from './pages/JobSeeker/jobsDetails.jsx'
import EmployerDashboard from './pages/Employer/EmployerDashboard.jsx'
import JobPostingForm from './pages/Employer/JobPostingForm.jsx'
import ManageJobs from './pages/Employer/ManageJobs.jsx'
import ApplicationViewer from './pages/Employer/ApplicationViewer.jsx'
import EmployerProfilePage from './pages/Employer/EmployerProfilePage.jsx'
import ProtectedRouter from './routes/ProtectedRouter.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/find-jobs" element={<JobSeekerDashboard />} />
                    <Route path="/job/:jobId" element={<JobsDetails />} />
                    <Route path="/saved-jobs" element={<SavedJobs />} />
                    <Route path="/profile" element={<UserProfile />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRouter requiredRole="employer" />}>
                        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
                        <Route path="/post-job" element={<JobPostingForm />} />
                        <Route path="/manage-jobs" element={<ManageJobs />} />
                        <Route path="/applications" element={<ApplicationViewer />} />
                        <Route path="/company-profile" element={<EmployerProfilePage />} />
                    </Route>

                    {/* Catch all Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>

            <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        fontSize: '13px'
                    }
                }}
            />
        </AuthProvider>
    )
}

export default App