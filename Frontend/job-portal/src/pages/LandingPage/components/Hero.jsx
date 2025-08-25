import { motion } from 'framer-motion';
import { Search, ArrowRight, Users, Building2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Hero = () => {
        const {user, isAuthenticated} = useAuth()
    const navigate = useNavigate();

    const stats = [
        { icon: Users, label: 'Active Users', value: '2.4M+' },
        { icon: Building2, label: 'Companies', value: '122K+' },
        { icon: TrendingUp, label: 'Jobs Posted', value: '5.6K+' },
    ];

    return (
        <section className="pt-24 pb-16 bg-white min-h-screen flex items-center relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight"
                    >
                        Find Your Dream Job or{' '}
                        <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Perfect Hire
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Your journey to success starts here. Explore opportunities, connect with top companies, and take the next step in your career.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate("/find-jobs")}
                            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 rounded-full w-full sm:w-auto justify-center"
                        >
                            <Search className="w-5 h-5" />
                            <span>Find Jobs</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() =>
                                navigate(isAuthenticated && user.role === 'employer' ? "/employer-dashboard" : "/login")
                            }
                            className="bg-white border border-gray-200 text-gray-900 px-8 py-3 font-semibold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 rounded-full w-full sm:w-auto justify-center"
                        >
                            Post a Job
                        </motion.button>
                    </motion.div>

                    {/* Stats Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="grid grid-cols-3 gap-6 max-w-3xl mx-auto"
                    >
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                                    className="flex flex-col items-center space-y-2 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                                >
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-2">
                                        <Icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                                    <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
            
            {/* Subtle Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30" />
                <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-30" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-20" />
            </div>
        </section>
    );
};

export default Hero;