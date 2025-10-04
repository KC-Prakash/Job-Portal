import { Save, X } from 'lucide-react'
import DashboardLayout from '../../components/Layout/DashboardLayout'

const EditProfileDetails = ({
  formData,
  handleImageChange,
  handleInputChange,
  handleSave,
  handleCancel,
  saving,
  uploading
}) => {
  return (
    <DashboardLayout activeMenu="company-profile">
      {formData && (
        <div className="min-h-screen bg-gray-50 py-8 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">

              {/* Header with Save & Cancel */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-8 flex items-center justify-between">
                <h1 className="text-lg md:text-xl font-medium text-white">
                  Edit Profile
                </h1>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-green-700 hover:bg-green-800 disabled:opacity-60 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                  >
                    <Save className="w-4 h-4" />
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>

              {/* Edit Form */}
              <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Personal Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Personal Information
                  </h2>

                  {/* Avatar Upload */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={formData?.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200"
                      />
                      {uploading?.avatar && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <label className="block">
                      <span className="sr-only">Choose Avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'avatar')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 
                                   file:px-4 file:rounded-full file:border-0 file:text-sm 
                                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </label>
                  </div>

                  {/* Full Name */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {formData.name && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('name', '')}
                        className="absolute inset-y-0 right-3 top-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                          <X className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                 bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-medium text-gray-800 border-b pb-2">
                    Company Information
                  </h2>

                  {/* Company Logo Upload */}
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200"
                      />
                      {uploading?.companyLogo && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-xl flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                    <label className="block">
                      <span className="sr-only">Choose Company Logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'companyLogo')}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 
                                   file:px-4 file:rounded-full file:border-0 file:text-sm 
                                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                      />
                    </label>
                  </div>

                  {/* Company Name */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your company name"
                    />
                    {formData.companyName && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('companyName', '')}
                        className="absolute inset-y-0 right-3 top-6 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                          <X className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* Company Description */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Description
                    </label>
                    <textarea
                      value={formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Enter your company description"
                    />
                    {formData.companyDescription && (
                      <button
                        type="button"
                        onClick={() => handleInputChange('companyDescription', '')}
                        className="absolute top-3 right-3 top-11 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                          <X className="w-4 h-4" />
                        </div>
                      </button>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default EditProfileDetails
