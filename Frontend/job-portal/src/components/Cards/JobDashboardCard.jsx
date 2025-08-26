import { Briefcase } from "lucide-react";
import moment from "moment";

const JobDashboardCard = ({ job }) => {
    return (
        <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors duration-300">
            <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl flex items-center justify-center bg-blue-50">
                    <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h4 className="text-[15px] font-medium text-gray-900">{job.title}</h4>
                    <p className="text-xs text-gray-500">
                        {job.location} · {moment(job.createdAt).format("YYYY-MM-DD")}
                    </p>
                </div>
            </div>

            <div className="flex items-center space-x-3">
                <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${job.isClosed
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                >
                    {job.isClosed ? "Closed" : "Active"}
                </span>
            </div>
        </div>
    );
};

export default JobDashboardCard;
