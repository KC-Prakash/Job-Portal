import { ArrowLeft, Building2, Clock, DollarSign, MapPin, User } from 'lucide-react'
import moment from 'moment'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../components/Layout/Navbar'
import StatusBadge from '../../components/Layout/StatusBadge'
import { useAuth } from '../../context/AuthContext'
import { API_PATHS } from '../../utils/apiPaths'
import axiosInstance from '../../utils/axiosInstance'

const JobsDetails = () => {
  const { user } = useAuth()
  const { jobId } = useParams()
  const navigate = useNavigate()

  const [jobDetails, setJobDetails] = useState(null)

  // Fetch job details
  const getJobDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.JOBS.GET_JOB_BY_ID(jobId), {
        params: { userId: user?._id || null },
      })
      setJobDetails(response.data)
    } catch (error) {
      toast.error('Failed to fetch job details. Please try again. ' + error.message)
      console.error('Error fetching job details:', error)
    }
  }

  // Apply to job
  const applyToJob = async () => {
    try {
      if (jobId) {
        await axiosInstance.post(API_PATHS.APPLICATIONS.APPLY_TO_JOB(jobId))
        toast.success('Applied to job successfully')
      }
      getJobDetailsById()
    } catch (error) {
      console.log('Error:', error)
      const errorMsg = error?.response?.data?.message
      toast.error(errorMsg || 'Failed to apply to job. Please try again.')
    }
  }

  useEffect(() => {
    if (jobId && user) {
      getJobDetailsById()
    }
  }, [jobId, user])

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-emerald-50 min-h-screen">
      <Navbar />

      <div className="container mx-auto pt-20 px-4 lg:px-0">
        {/* ✅ Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-emerald-700 font-medium mb-4 hover:text-emerald-900 transition-colors border border-emerald-200 px-3 py-1 rounded-lg shadow-sm hover:shadow-md"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {jobDetails && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* Header Section */}
            <div className="relative px-0 pb-8 border-b border-gray-300">
              <div className="flex items-center gap-3 mb-6">
                {jobDetails?.company?.companyLogo ? (
                  <img
                    src={jobDetails.company.companyLogo}
                    alt={jobDetails.company.name}
                    className="h-20 w-20 object-cover rounded-2xl border-8 border-white/20 shadow-lg"
                  />
                ) : (
                  <div className="h-20 w-20 flex items-center justify-center bg-gray-200 rounded-2xl border-8 border-white/20 shadow-lg">
                    <Building2 className="h-8 w-8 text-gray-600" />
                  </div>
                )}

                <div className="flex-1">
                  <h1 className="text-lg lg:text-xl font-semibold mb-2 leading-tight text-gray-900">
                    {jobDetails?.title}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm font-medium">{jobDetails?.location}</span>
                    </div>
                  </div>
                </div>

                {jobDetails?.applicationStatus ? (
                  <StatusBadge status={jobDetails.applicationStatus} />
                ) : (
                  <button
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-emerald-700 transition-colors duration-300"
                    onClick={applyToJob}
                  >
                    Apply Now
                  </button>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-green-50 text-sm text-green-700 font-semibold rounded-full border border-green-200">
                  {jobDetails.category}
                </span>
                <span className="px-4 py-2 bg-blue-50 text-sm text-blue-700 font-semibold rounded-full border border-blue-200">
                  {jobDetails.type}
                </span>
                <div className="flex items-center space-x-1 px-4 py-2 bg-purple-50 text-sm text-gray-700 font-semibold rounded-full border border-purple-200">
                  <Clock className="h-4 w-4" />
                  <span>
                    {jobDetails.createdAt
                      ? moment(jobDetails.createdAt).format('YYYY-MM-DD')
                      : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-0 pb-8 space-y-8">
              {/* Salary Section */}
              <div className="relative overflow-hidden bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between w-full">
                  <div className="flex items-center space-x-4 pb-2 md:pb-0">
                    <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1">Compensation</h3>
                      <div className="text-lg font-bold text-gray-900">
                        {jobDetails.salaryMin} - {jobDetails.salaryMax}
                        <span className="text-lg font-normal text-gray-600 ml-1">per year</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                    <User className="w-5 h-5" />
                    <span>Competitive</span>
                  </div>
                </div>
              </div>

              {/* Job Description */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <span>About This Role</span>
                </h3>
                <div className="bg-gray-50 border border-gray-100 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {jobDetails.description}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center space-x-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></div>
                  <span>What We're Looking For</span>
                </h3>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-xl p-6">
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {jobDetails.requirements}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobsDetails
