import React from 'react'
import { Clock } from 'lucide-react'

const ApplicatDashboardCard = ({ applicant, position, time }) => {
    return <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-300">
        <div classname="flex items-center space-x-4">
            <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-indigo-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                    {applicant.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
            </div>
            <div>
                <h4 className="text-[15px] font-medium text-gray-900">
                    {applicant.name}
                </h4>
                <p className="text-sm text-gray-500">{position}</p>
            </div>
        </div>
        <div className="flex items-center space-x-3">
            <div className="flex items-center text-xs text-gray-500">
                <Clock className="w-3 h-3 mr-1" />
                {time}
            </div>
        </div>
    </div>
}

export default ApplicatDashboardCard
