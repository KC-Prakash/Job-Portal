import { useEffect, useState } from 'react';
import { Save, X, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/authContext';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import toast from 'react-hot-toast';
import uploadImage from '../../utils/uploadImage';
import Navbar from '../../components/Layout/Navbar';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    avatar: user?.avatar || '',
    resume: user?.resume || '',
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, resume: false });
  const [saving, setSaving] = useState(false);

  // ✅ Input handler
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ✅ Image upload logic
  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));
    try {
      const imgUploadRes = await uploadImage(file);
      const imageUrl = imgUploadRes.imageUrl || '';

      setFormData((prev) => ({
        ...prev,
        [type]: imageUrl,
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Image upload failed. Please try again.');
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  // ✅ File input change
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(file, type);
    }
  };

  // ✅ Save profile
  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success('Profile details updated successfully');
        setProfileData({ ...formData });
        updateUser({ ...formData });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ✅ Cancel edit
  const handleCancel = () => {
    setFormData({ ...profileData });
  };

  // ✅ Delete resume
  const handleDeleteResume = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: user?.resume || '',
      });

      if (response.status === 200) {
        toast.success('Resume deleted successfully');
        setProfileData((prev) => ({ ...prev, resume: '' }));
        updateUser({ ...user, resume: '' });
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete resume. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // ✅ Sync user data when it changes
  useEffect(() => {
    const userData = {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      resume: user?.resume || '',
    };
    setProfileData({ ...userData });
    setFormData({ ...userData });
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16 lg:m-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-5 flex items-center justify-between">
              <h1 className="text-xl font-medium text-white">User Profile</h1>
            </div>

            <div className="p-8 space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={formData?.avatar || '/default-avatar.png'}
                    alt="Avatar"
                    className="w-24 h-24 rounded-2xl object-cover border border-gray-300 shadow-md"
                  />
                  {uploading.avatar && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-2xl">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block">
                    <span className="sr-only">Choose Avatar</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, 'avatar')}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </label>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name:</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-200"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email:</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full border border-gray-200 rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Resume:</label>
                {user?.resume ? (
                  <div className="flex items-center space-x-2">
                    <a
                      href={user.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Resume
                    </a>
                    <button
                      onClick={handleDeleteResume}
                      className="text-red-600 hover:text-red-800 flex items-center space-x-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                ) : (
                  <label className="block">
                    <span className="text-gray-600">Choose File:</span>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'resume')}
                      className="block mt-2 text-sm text-gray-500"
                    />
                  </label>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
                <Link
                  onClick={handleCancel}
                  to="/find-jobs"
                  className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <X className="w-5 h-5" />
                  <span>Cancel</span>
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading.avatar}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-5 h-5" />
                  )}
                  <span>{saving ? 'Saving...' : 'Save Changes'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
