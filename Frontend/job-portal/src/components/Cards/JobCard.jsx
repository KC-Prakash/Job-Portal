import { Bookmark, BookmarkCheck, Building, Building2, Calendar, MapPin } from 'lucide-react'
import moment from 'moment'
import { useAuth } from '../../context/AuthContext'
import StatusBage from '../Layout/StatusBadge'

const JobCard = ({ job, onClick, onToggleSave, onApply, saved, hideApply }) => {
  const { user } = useAuth()

  const formatSalary = (min, max) => {
    const formatNumber = (num) => {
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`
      return `$${num}`
    }
    return `${formatNumber(min)}/m`
  }

  return (
    <div
      className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-xl hover:shadow-gray-200 transition-shadow duration-300 overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {/* Top section */}
      <div className="flex items-start justify-between gap-4 mb-4">
        {/* Left side: Logo + Job info */}
        <div className="flex items-start gap-4 flex-1">
          {job?.company?.companyLogo ? (
            <img
              src={job?.company?.companyLogo}
              alt={job?.company?.name}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-4 border-white/20 shadow-md object-contain"
            />
          ) : (
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-50 border-2 border-gray-200 rounded-2xl flex items-center justify-center">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            </div>
          )}

          {/* Job Title + Company */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate group-hover:text-blue-600 transition-colors leading-snug">
              {job?.title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm flex items-center gap-2 mt-1">
              <Building className="w-4 h-4 text-green-500 shrink-0" />
              <span className="truncate">{job?.company?.CompanyName}</span>
            </p>
          </div>
        </div>

        {/* Bookmark */}
        {user && (
          <button
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors shrink-0"
            onClick={(e) => {
              e.stopPropagation()
              onToggleSave(job._id, job.isSaved)
            }}
            aria-label={job?.isSaved || saved ? 'Unsave job' : 'Save job'}
          >
            {job?.isSaved || saved ? (
              <BookmarkCheck className="w-5 h-5 text-blue-600" />
            ) : (
              <Bookmark className="w-5 h-5 text-gray-400 hover:text-blue-600" />
            )}
          </button>
        )}
      </div>

      {/* Tags */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            <MapPin className="w-4 h-4 text-green-500" />
            {job?.location}
          </span>
          <span
            className={`px-2.5 py-1 rounded-full font-medium ${
              job?.type === 'Full-time'
                ? 'bg-green-100 text-green-800'
                : job?.type === 'Part-time'
                ? 'bg-yellow-100 text-yellow-800'
                : job?.type === 'Internship'
                ? 'bg-blue-100 text-blue-800'
                : job?.type === 'Permanent'
                ? 'bg-gray-100 text-gray-800'
                : job?.type === 'Contract'
                ? 'bg-purple-100 text-purple-800'
                : job?.type === 'Temporary'
                ? 'bg-orange-100 text-orange-800'
                : job?.type === 'Volunteer'
                ? 'bg-pink-100 text-pink-800'
                : job?.type === 'Remote'
                ? 'bg-indigo-100 text-indigo-800'
                : 'bg-gray-200 text-gray-900'
            }`}
          >
            {job?.type}
          </span>
          <span className="flex items-center gap-1.5 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-medium">
            {job?.category}
          </span>
        </div>
      </div>

      {/* Created Date */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-gray-500 mb-4 pb-3 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-green-500" />
          {job?.createdAt ? moment(job?.createdAt).format('YYYY-MM-DD') : 'N/A'}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex flex-row sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="text-blue-600 font-semibold text-base sm:text-lg">
          {formatSalary(job?.salaryMin, job?.salaryMax)}
        </div>
        {!saved && (
          <>
            {job?.applicationStatus ? (
              <StatusBage status={job?.applicationStatus} />
            ) : (
              !hideApply && (
                <button
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300 text-sm sm:text-base"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (onApply && job._id) {
                      onApply(job._id)
                    } else {
                      console.warn('Apply function or job ID missing', { onApply, job })
                    }
                  }}
                >
                  Apply Now
                </button>
              )
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default JobCard
