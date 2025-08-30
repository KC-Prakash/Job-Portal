import { Download, X } from "lucide-react";
import { useState } from "react";
import { getInitials } from "../../utils/helper";
import moment from "moment";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";

import StatusBadge from "../Layout/StatusBadge";

const statusOptions = [
    "Applied",
    "In Review",
    "Accepted",
    "Rejected",
    "Hired",
];

function ApplicantProfilePreview({
    selectedApplicant,
    setSelectedApplicant,
    handleDownloadResume,
    handleClose,
}) {
    const [currentStatus, setCurrentStatus] = useState(selectedApplicant.status);
    const [loading, setLoading] = useState(false);

    const onChangeStatus = async (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
        setLoading(true);

        try {
            const response = await axiosInstance.put(
                API_PATHS.APPLICATIONS.UPDATE_STATUS(selectedApplicant._id),
                { status: newStatus }
            );

            if (response.status === 200) {
                setSelectedApplicant({ ...selectedApplicant, status: newStatus });
                toast.success("Status updated successfully");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            setCurrentStatus(selectedApplicant.status);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-3 border-b border-gray-200 sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Applicant Profile
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-green-500" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-3">
                    <div className="text-center mb-4">
                        {selectedApplicant.applicant.avatar ? (
                            <img
                                src={selectedApplicant.applicant.avatar}
                                alt={selectedApplicant.applicant.name}
                                className="h-18 w-18 rounded-full object-cover mx-auto"
                            />
                        ) : (
                            <div className="h-18 w-18 rounded-full bg-blue-200 flex items-center justify-center mx-auto">
                                <span className="text-blue-600 font-semibold text-xl">
                                    {getInitials(selectedApplicant.applicant.name)}
                                </span>
                            </div>
                        )}
                        <h4 className="mt-4 text-xl font-semibold text-gray-900">
                            {selectedApplicant.applicant.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                            {selectedApplicant.applicant.email}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-2">
                                Applied Position
                            </h5>
                            <p className="text-gray-700">{selectedApplicant.job.title}</p>
                            <p className="text-gray-600 text-sm mt-1">
                                {selectedApplicant.job.location} • {selectedApplicant.job.type}
                            </p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-2">
                                Applicant Details
                            </h5>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-green-600">Status:</span>
                                    <StatusBadge status={currentStatus} />
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Applied Date:</span>
                                    <span className="text-gray-700">
                                        {moment(selectedApplicant.createdAt)?.format("YYYY-MM-DD")}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() =>
                                handleDownloadResume(selectedApplicant.applicant.resume)
                            }
                            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Download className="w-4 h-4" />
                            Download Resume
                        </button>

                        {/* Status Dropdown */}
                        <div className="mt-2">
                            <label className="block mb-1 text-sm text-gray-700 font-medium">
                                Change Application Status
                            </label>
                            <select
                                value={currentStatus}
                                onChange={onChangeStatus}
                                disabled={loading}
                                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {statusOptions.map((status) => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                            {loading && (
                                <p className="text-xs text-gray-500 mt-1">Updating status...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicantProfilePreview;
