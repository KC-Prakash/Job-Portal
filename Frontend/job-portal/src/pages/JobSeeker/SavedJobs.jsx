import { ArrowLeft, Bookmark, Grid, List } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import JobCard from '../../components/Cards/JobCard'
import Navbar from '../../components/Layout/Navbar'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'

const SavedJobs = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [savedJobList, setSavedJobList] = useState([])
  const [viewMode, setViewMode] = useState('grid')

  // Fetch saved jobs
  const getSavedJobs = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_SAVED_JOBS)
      setSavedJobList(response.data)
    } catch (err) {
      console.error('Error fetching jobs details:', err)
      toast.error('Failed to fetch saved jobs.')
    }
  }

  // Remove saved job
  const handleUnsaveJob = async (jobId) => {
    try {
      await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId))
      toast.success('Job removed successfully')
      getSavedJobs()
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    }
  }

  useEffect(() => {
    if (user) {
      getSavedJobs()
    }
  }, [user])

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <Navbar />

      <div className="container mx-auto pt-24">
        {savedJobList && (
          <div className="bg-white p-6 rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="group flex items-center space-x-2 px-3.5 py-2.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 hover:text-emerald-900 transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </button>

                <h1 className="text-lg lg:text-xl font-semibold text-gray-800 leading-tight">
                  Saved Jobs
                </h1>
              </div>

              {/* View mode buttons */}
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-0 pb-8 space-y-8">
              {savedJobList.length === 0 ? (
                <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-sm rounded-lg border border-gray-200 space-y-6">
                  <div className="text-gray-300 mb-6">
                    <Bookmark className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-semibold mb-3 text-gray-800">
                    You haven't saved any jobs yet.
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start saving jobs that interest you to view them later.
                  </p>
                  <button
                    onClick={() => navigate('/find-jobs')}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Browse Jobs
                  </button>
                </div>
              ) : (
                <div
                  className={
                    viewMode === 'grid'
                      ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-4 lg:space-y-6'
                  }
                >
                  {savedJobList.map((savedJob) => (
                    <JobCard
                      key={savedJob._id}
                      job={savedJob?.job}
                      onClick={() => navigate(`/job/${savedJob?.job._id}`)}
                      onToggleSave={() => handleUnsaveJob(savedJob?.job._id)}
                      saved
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SavedJobs
