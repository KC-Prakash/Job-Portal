import DashboardLayout from '../../components/Layout/DashboardLayout';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AlertCircle, MapPin, DollarSign, Users, Eye, Send, Briefcase, X } from "lucide-react";
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { JOB_CATEGORIES, JOB_TYPES } from '../../utils/data';
import toast from 'react-hot-toast';
import InputField from '../../components/Input/InputField';
import SelectField from '../../components/Input/SelectField';
import TextareaField from '../../components/Input/TextareaField';
import JobPostingPreview from '../../components/Cards/JobPostingPreview';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const initialState = {
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
    postedAt: new Date(),
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific errors
    if (errors[field] || errors.salary) {
      setErrors(prev => ({ ...prev, [field]: "", salary: "" }));
    }
  };

  // Form validation
  const validateForm = (data) => {
    const errors = {};
    if (!data.jobTitle.trim()) errors.jobTitle = "Job title is required";
    if (!data.location.trim()) errors.location = "Job location is required";
    if (!data.category) errors.category = "Job category is required";
    if (!data.jobType) errors.jobType = "Job type is required";
    if (!data.description.trim()) errors.description = "Job description is required";
    if (!data.requirements.trim()) errors.requirements = "Job requirements are required";

    if (!data.salaryMin || !data.salaryMax) {
      errors.salary = "Both minimum and maximum salary are required";
    } else if (parseInt(data.salaryMin) >= parseInt(data.salaryMax)) {
      errors.salary = "Maximum salary must be greater than minimum salary";
    }

    return errors;
  };

  const handlePreview = () => {
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill the highlighted fields before previewing.");
      return;
    }
    setIsPreview(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fill the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);
    const jobPayload = {
      title: formData.jobTitle,
      location: formData.location,
      category: formData.category,
      type: formData.jobType,
      description: formData.description,
      requirements: formData.requirements,
      salaryMin: formData.salaryMin,
      salaryMax: formData.salaryMax,
    };

    try {
      const response = jobId
        ? await axiosInstance.put(API_PATHS.JOBS.UPDATE_JOB(jobId), jobPayload)
        : await axiosInstance.post(API_PATHS.JOBS.POST_JOB, jobPayload);

      if (response.status === 200 || response.status === 201) {
        toast.success(jobId ? "Job updated successfully" : "Job posted successfully");
        setFormData(initialState);
        navigate("/employer-dashboard");
      }
    } catch (error) {
      const message = error.response?.data?.message || "Failed to post/update job";
      toast.error(message);
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
  const fetchJobDetails = async () => {
    if (jobId) {
      try {
        const response = await axiosInstance.get(
          API_PATHS.JOBS.GET_JOB_BY_ID(jobId)
        );
        const jobData = response.data;
        if(jobData) {
        setFormData({
          jobTitle: jobData.title,
          location: jobData.location,
          category: jobData.category,
          jobType: jobData.type,
          description: jobData.description,
          requirements: jobData.requirements,
          salaryMin: jobData.salaryMin,
          salaryMax: jobData.salaryMax,
        });
        }
      } catch (error) {
        console.error("Error fetching job details:");
        if (error.response) {
          console.error("API Error:", error.response.message);
        }
      }
    }
  };

  fetchJobDetails();
  return () => {

  }
}, [])


  if (isPreview) {
    return (
      <DashboardLayout activeMenu="post-job">
        <JobPostingPreview formData={formData} setIsPreview={setIsPreview} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-xl rounded-2xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {jobId ? "Edit Job" : "Post a New Job"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Fill out the form below to {jobId ? "update your job posting" : "create your job posting"}
                </p>
              </div>
              <button
                onClick={handlePreview}
                disabled={isSubmitting}
                className="group flex items-center space-x-2 px-6 py-3 text-sm font-medium text-gray-600 hover:text-white bg-white/50 hover:bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl border border-gray-200 hover:border-gray-100 transition-colors duration-300"
              >
                <Eye className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                <span>Preview</span>
              </button>
            </div>

            <div className="space-y-6">
              {/* Job Title */}
              <InputField
                label="Job Title"
                id="jobTitle"
                placeholder="e.g. Software Engineer"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                error={errors.jobTitle}
                required
                icon={Briefcase}
                clearable
              />

              {/* Location */}
              <InputField
                label="Location"
                id="location"
                placeholder="e.g. New York, USA"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                error={errors.location}
                icon={MapPin}
                clearable
              />

              {/* Category & Job Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label="Category"
                  id="category"
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  options={JOB_CATEGORIES}
                  placeholder="Select a category"
                  error={errors.category}
                  required
                  icon={Users}
                />
                <SelectField
                  label="Job Type"
                  id="jobType"
                  value={formData.jobType}
                  onChange={(e) => handleInputChange("jobType", e.target.value)}
                  options={JOB_TYPES}
                  placeholder="Select a job type"
                  error={errors.jobType}
                  required
                  icon={Briefcase}
                />
              </div>

              {/* Description */}
              <TextareaField
                label="Job Description"
                id="description"
                placeholder="Describe the role and responsibilities..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                error={errors.description}
                helperText="Include key responsibilities, day-to-day tasks, and relevant details."
                required
                clearable
              />

              {/* Requirements */}
              <TextareaField
                label="Requirements"
                id="requirements"
                placeholder="List key qualifications and skills..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
                error={errors.requirements}
                helperText="Include required skills, experience, education, and preferred qualifications."
                required
                clearable
              />

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Salary Range <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Min"
                      value={formData.salaryMin}
                      onChange={(e) => handleInputChange("salaryMin", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-green-400" />
                    </div>
                    <input
                      type="number"
                      placeholder="Max"
                      value={formData.salaryMax}
                      onChange={(e) => handleInputChange("salaryMax", e.target.value)}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:border-blue-500 transition-colors duration-200"
                    />
                  </div>
                </div>
                {errors.salary && (
                  <div className="flex items-center space-x-1 text-sm text-red-500 mt-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.salary}</span>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center px-4 py-2.5 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Publishing Job...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Publish Job
                    </>
                  )}
                </button>

                <button
  type="button"
  onClick={() => setFormData(initialState)}
  disabled={isSubmitting}
  className="flex items-center justify-center gap-2 flex-1 px-4 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
>
  <X className="h-5 w-5" />
  <span>Cancel</span>
</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;
