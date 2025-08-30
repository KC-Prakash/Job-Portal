import React from 'react';

const StatusBadge = ({ status }) => {
    const statusConfig = {
        Applied: "bg-gray-200 text-gray-800",
        "In Review": "bg-yellow-200 text-yellow-800",
        Accepted: "bg-green-200 text-green-800",
        Rejected: "bg-red-200 text-red-800",
        Hired: "bg-blue-200 text-blue-800",
    };

    return (
        <span className={`px-3 py-1 rounded-xl text-sm font-medium ${statusConfig[status] || "bg-gray-100 text-gray-800"}}`}>
            {status}
        </span>
    );
};

export default StatusBadge;
