import { Filter, Grid, List, Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import JobCard from '../../components/Cards/JobCard'
import LoadingSpinner from '../../components/Layout/LoadingSpinner'
import Navbar from '../../components/Layout/Navbar'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'
import FilterContent from './components/FilterContent'
import SearchHeader from './components/SearchHeader'

const JobSeekerDashboard = () => {
  const { user } = useAuth()

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState('grid')
  const [showMobileFilter, setShowMobileFilter] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  // filter states
  const [filters, setFilters] = useState({
    keyword: '',
    location: '',
    category: [],
    type: [],
    minSalary: null,
    maxSalary: null,
  })

  // Sidebar collapse states
  const [expandedSections, setExpandedSections] = useState({
    jobType: true,
    salary: true,
    categories: true,
  })

  // function to fetch jobs from API
  const fetchJobs = async (filterParams = {}) => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (filterParams.keyword) params.append('keyword', filterParams.keyword)
      if (filterParams.location) params.append('location', filterParams.location)
      if (filterParams.minSalary) params.append('minSalary', filterParams.minSalary)
      if (filterParams.maxSalary) params.append('maxSalary', filterParams.maxSalary)
      if (filterParams.type?.length) filterParams.type.forEach((t) => params.append('type', t))
      if (filterParams.category?.length)
        filterParams.category.forEach((c) => params.append('category', c))
      if (user) params.append('userId', user?._id)

      const response = await axiosInstance.get(
        `${API_PATHS.JOBS.GET_ALL_JOBS}?${params.toString()}`
      )

      const jobData = Array.isArray(response.data) ? response.data : response.data?.jobs || []

      setJobs(jobData)
    } catch (err) {
      console.error('Error fetching jobs:', err)
      setError('Failed to fetch jobs. Please try again.')
      setJobs([])
      toast.error('Failed to fetch jobs. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Fetch jobs when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const apiFilters = {
        keyword: filters.keyword,
        location: filters.location,
        minSalary: filters.minSalary,
        maxSalary: filters.maxSalary,
        category: filters.category,
        type: filters.type,
        experience: filters.experience,
        remoteOnly: filters.remoteOnly,
      }

      //Only call API if there are any filters
      const hasFilters = Object.values(apiFilters).some(
        (value) => value !== '' && value !== false && value !== null && value !== undefined
      )

      if (hasFilters) {
        fetchJobs(apiFilters)
      } else {
        fetchJobs() // Fetch all jobs
      }
    }, 500) //500ms debounce

    return () => clearTimeout(timeoutId)
  }, [filters, user])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const clearAllFilters = () => {
    setFilters({
      keyword: '',
      location: '',
      category: '',
      type: '',
      minSalary: '',
      maxSalary: '',
    })
  }

  const MobileFilterOverlay = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${showMobileFilter ? '' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-lg">Filter</h3>
          <button
            onClick={() => setShowMobileFilter(false)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto h-full pb-20">
          <FilterContent
            toggleSection={toggleSection}
            clearAllFilters={clearAllFilters}
            expandedSections={expandedSections}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  )

  const toggleSaveJob = async (jobId, isSaved) => {
    try {
      if (isSaved) {
        await axiosInstance.delete(API_PATHS.JOBS.UNSAVE_JOB(jobId))
        toast.success('Job removed from saved list')
      } else {
        await axiosInstance.post(API_PATHS.JOBS.SAVE_JOB(jobId))
        toast.success('Job saved successfully')
      }
      fetchJobs() // refresh jobs to update isSaved status
    } catch (err) {
      console.error('Bookmark error:', err)
      toast.error(err?.response?.data?.message || 'Something went wrong! Try again later.')
    }
  }

  const applyToJob = async (jobId) => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId))
        toast.success('Applied to job successfully')
      }
      fetchJobs()
    } catch (err) {
      console.log('Error:', err)
      const errorMsg = err?.response?.data?.message
      toast.error(errorMsg || 'Something went wrong! Try again later.')
    }
  }

  if (jobs.length == 0 && loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="min-h-screen mt-16">
        <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-8 py-4 lg:py-8">
          <SearchHeader filters={filters} handleFilterChange={handleFilterChange} />

          <div className="flex gap-6 lg:gap-8">
            {/* Desktop sidebar filter */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 sticky top-20">
                <h3 className="font-bold text-gray-900 text-xl mb-6">Filter Jobs</h3>
                <FilterContent
                  toggleSection={toggleSection}
                  clearAllFilters={clearAllFilters}
                  expandedSections={expandedSections}
                  filters={filters}
                  handleFilterChange={handleFilterChange}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Result Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-8 gap-2">
                <div>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Showing <span className="font-bold text-gray-900">{jobs.length}</span> jobs
                  </p>
                </div>
                <div className="flex items-center justify-between lg:justify-end gap-4">
                  {/* Mobile filter Button */}
                  <button
                    onClick={() => setShowMobileFilter(true)}
                    className="lg:hidden flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>

                  <div className="flex items-center gap-3 lg:gap-4">
                    <div className="flex items-center border-gray-200 rounded-xl p-1 bg-white">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'grid'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${
                          viewMode === 'list'
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* jobs grid */}
              {jobs.length === 0 ? (
                <div className="text-center py-16 lg:py-20 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20">
                  <div className="text-gray-400 mb-6">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-3">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search criteria or filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Clear All filters
                  </button>
                </div>
              ) : (
                <>
                  <div
                    className={
                      viewMode === 'grid'
                        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 lg:gap-6'
                        : 'space-y-4 lg:space-y-6'
                    }
                  >
                    {jobs.map((job) => (
                      <JobCard
                        key={job._id}
                        job={job}
                        saved={job.isSaved}
                        onClick={() => navigate(`/job/${job._id}`)}
                        onToggleSave={toggleSaveJob}
                        onApply={applyToJob}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        {/* Mobile Filter Overlay */}
        <MobileFilterOverlay />
      </div>
    </div>
  )
}

export default JobSeekerDashboard
