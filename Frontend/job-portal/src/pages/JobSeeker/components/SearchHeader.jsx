import { MapPin, Search, X } from "lucide-react";

const SearchHeader = ({ filters, handleFilterChange }) => {
    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg border border-white/20 p-6 lg:p-8 mb-8">
            {/* Header */}
            <div className="flex flex-col gap-2 lg:gap-3 mb-6">
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                    Find your dream job
                </h1>
                <p className="text-gray-600 text-sm lg:text-base">
                    Discover opportunities and match them with your passion
                </p>
            </div>

            {/* Search Inputs */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
                {/* Keyword Input */}
                <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-900" />
                    <input
                        type="text"
                        placeholder="Job title, company, or keyword"
                        className="w-full pl-12 pr-10 py-2 lg:py-3 border border-gray-200 rounded-xl outline-none text-base bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-blue-400"
                        value={filters.keyword}
                        onChange={(e) => handleFilterChange("keyword", e.target.value)}
                    />
                    {filters.keyword && (
                        <button
                            type="button"
                            onClick={() => handleFilterChange("keyword", "")}
                            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                                <X className="w-4 h-4" />
                            </div>
                        </button>
                    )}
                </div>

                {/* Location Input */}
                <div className="relative min-w-0 lg:min-w-[200px]">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-900" />
                    <input
                        type="text"
                        placeholder="Location"
                        className="w-full pl-12 pr-10 py-2 lg:py-3 border border-gray-200 rounded-xl outline-none text-base bg-white/60 backdrop-blur-md focus:ring-2 focus:ring-blue-400"
                        value={filters.location}
                        onChange={(e) => handleFilterChange("location", e.target.value)}
                    />
                    {filters.location && (
                        <button
                            type="button"
                            onClick={() => handleFilterChange("location", "")}
                            className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <div className="bg-gray-200 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200">
                                <X className="w-4 h-4" />
                            </div>
                        </button>
                    )}
                </div>

                {/* Search Button */}
                <button className="w-full lg:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200">
                    Search Jobs
                </button>
            </div>
        </div>
    );
};

export default SearchHeader;
