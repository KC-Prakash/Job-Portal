import { motion } from 'framer-motion';
import { TrendingUp, Users, Briefcase, Target } from 'lucide-react';

const Analytics = () => {
    const stats = [
        {
            icon: Users,
            label: 'Active Users',
            value: '2.4M+',
            growth: '+12%',
            color: 'blue'
        },
        {
            icon: Briefcase,
            label: 'Job Posted',
            value: '122K+',
            growth: '+12%',
            color: 'purple'
        },
        {
            icon: Target,
            label: 'Success Hires',
            value: '506K+',
            growth: '+19%',
            color: 'green'
        },
        {
            icon: TrendingUp,
            label: 'Growth Rate',
            value: '35%',
            growth: '+5%',
            color: 'orange'
        }
    ];

    return (
        <section className="py-12 md:py-20 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12 md:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                        Platform
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Analytics </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                        Real-time insights and data-driven results that showcase the power of our platform in connecting job seekers with employers.
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}  
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                            viewport={{ once: true }}
                            className="bg-white p-5 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-3 sm:mb-4">
                                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center ${
                                    stat.color === 'blue' ? 'bg-blue-100' :
                                    stat.color === 'purple' ? 'bg-purple-100' :
                                    stat.color === 'green' ? 'bg-green-100' :
                                    'bg-orange-100'
                                }`}>
                                    <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${
                                        stat.color === 'blue' ? 'text-blue-600' :
                                        stat.color === 'purple' ? 'text-purple-600' :
                                        stat.color === 'green' ? 'text-green-600' :
                                        'text-orange-600'
                                    }`} />
                                </div>
                                <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                                    stat.growth.startsWith('+') ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'
                                }`}>
                                    {stat.growth}
                                </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                                {stat.value}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                        </motion.div>
                    ))}  
                </div>
            </div>
        </section>
    );
}

export default Analytics;