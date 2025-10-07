import { Briefcase, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-white/95 backdrop-blur-sm text-gray-800 border-t border-gray-200 relative overflow-hidden shadow-sm">
            {/* Top Section: 4 Columns */}
            <div className="max-w-7xl mx-auto px-6 py-16 pb-5 pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 relative z-10">

                {/* Column 1 - Brand */}
                <div>
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md">
                            <Briefcase className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">JobPortal</h2>
                    </div>
                    <p className="text-sm text-gray-600 text-justify">
                        Connecting talented professionals with innovative companies worldwide.
                        Your career success is our mission.
                    </p>
                    <div className="flex space-x-4 mt-5">
                        <a href="#"><Facebook className="w-5 h-5 hover:text-blue-600 transition-colors" /></a>
                        <a href="#"><Twitter className="w-5 h-5 hover:text-sky-500 transition-colors" /></a>
                        <a href="#"><Linkedin className="w-5 h-5 hover:text-blue-700 transition-colors" /></a>
                        <a href="#"><Instagram className="w-5 h-5 hover:text-pink-500 transition-colors" /></a>
                    </div>
                </div>

                {/* Column 2 - Job Seekers */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">For Job Seekers</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Browse Jobs</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Saved Jobs</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Profile</a></li>
                    </ul>
                </div>

                {/* Column 3 - Employers */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">For Employers</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Post a Job</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Manage Listings</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Company Profile</a></li>
                    </ul>
                </div>

                {/* Column 4 - Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Section: Copyright */}
            <div className="border-t border-gray-200 text-center py-4 bg-white/60 backdrop-blur-sm">
                <p className="text-sm text-gray-600">
                    &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                    Made with <span className="text-red-500">&hearts;</span> by JobPortal Team
                </p>
            </div>
        </footer>
    );
};

export default Footer;
