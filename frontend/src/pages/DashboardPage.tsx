import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FileText,
    CheckCircle,
    Clock,
    AlertTriangle,
    TrendingUp,
    Award,
    MapPin,
    Bell
} from 'lucide-react';
import Layout from '../components/Layout';
import { useAuthStore } from '../store/authStore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardPage = () => {
    const { user } = useAuthStore();
    const [stats, setStats] = useState({
        totalReports: 0,
        resolvedIssues: 0,
        pendingIssues: 0,
        civicPoints: 0
    });

    const [activityData, setActivityData] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setStats({
                totalReports: 12,
                resolvedIssues: 8,
                pendingIssues: 4,
                civicPoints: 450
            });

            // Mock activity data
            setActivityData([
                { day: 'Mon', reports: 2, resolved: 1 },
                { day: 'Tue', reports: 1, resolved: 2 },
                { day: 'Wed', reports: 3, resolved: 1 },
                { day: 'Thu', reports: 2, resolved: 2 },
                { day: 'Fri', reports: 1, resolved: 1 },
                { day: 'Sat', reports: 2, resolved: 0 },
                { day: 'Sun', reports: 1, resolved: 1 },
            ]);
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
        }
    };

    const statCards = [
        {
            title: 'Total Reports',
            value: stats.totalReports,
            icon: FileText,
            color: 'from-blue-500 to-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            title: 'Resolved Issues',
            value: stats.resolvedIssues,
            icon: CheckCircle,
            color: 'from-green-500 to-green-600',
            bgColor: 'bg-green-50'
        },
        {
            title: 'Pending Issues',
            value: stats.pendingIssues,
            icon: Clock,
            color: 'from-orange-500 to-orange-600',
            bgColor: 'bg-orange-50'
        },
        {
            title: 'Civic Points',
            value: stats.civicPoints,
            icon: Award,
            color: 'from-purple-500 to-purple-600',
            bgColor: 'bg-purple-50'
        }
    ];

    return (
        <Layout>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                        Namaste, {user?.name?.split(' ')[0] || 'Citizen'}! 🙏
                    </h1>
                    <p className="text-gray-600 text-base md:text-lg">
                        Your civic contributions are making Delhi better
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="card-premium overflow-hidden"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <p className="text-xs md:text-sm font-medium text-gray-600 mb-1">
                                        {stat.title}
                                    </p>
                                    <p className="text-2xl md:text-3xl font-bold text-gray-900">
                                        {stat.value}
                                    </p>
                                </div>
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                                    <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                                </div>
                            </div>
                            <div className="mt-3 md:mt-4 flex items-center text-xs md:text-sm text-green-600">
                                <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                                <span>Active</span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-4 md:gap-6 mb-8">
                    {/* Activity Chart */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card-premium"
                    >
                        <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-primary-600" />
                            Weekly Activity
                        </h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis dataKey="day" stroke="#888" style={{ fontSize: '12px' }} />
                                <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="reports"
                                    stroke="#2E7D32"
                                    strokeWidth={3}
                                    dot={{ fill: '#2E7D32', r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </motion.div>

                    {/* Quick Actions */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="card-premium"
                    >
                        <h3 className="text-lg md:text-xl font-bold mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl hover:shadow-md transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <FileText className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="text-sm md:text-base font-semibold text-gray-900">Report Issue</div>
                                    <div className="text-xs md:text-sm text-gray-600">Submit a civic complaint</div>
                                </div>
                            </button>

                            <button className="w-full flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="text-sm md:text-base font-semibold text-gray-900">View on Map</div>
                                    <div className="text-xs md:text-sm text-gray-600">See issues nearby</div>
                                </div>
                            </button>

                            <button className="w-full flex items-center gap-3 p-3 md:p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-all group">
                                <div className="w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    <Award className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left flex-1">
                                    <div className="text-sm md:text-base font-semibold text-gray-900">View Rewards</div>
                                    <div className="text-xs md:text-sm text-gray-600">Check civic points</div>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Recent Activity & Alerts */}
                <div className="grid lg:grid-cols-2 gap-4 md:gap-6">
                    {/* Recent Reports */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-premium"
                    >
                        <h3 className="text-lg md:text-xl font-bold mb-4 flex items-center gap-2">
                            <Bell className="w-5 h-5 text-primary-600" />
                            Recent Updates
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <div className="flex-1">
                                    <div className="text-sm md:text-base font-medium">Waste Collection Resolved</div>
                                    <div className="text-xs text-gray-600">RK Puram - Yesterday</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full">+50 pts</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                                <Clock className="w-5 h-5 text-orange-600" />
                                <div className="flex-1">
                                    <div className="text-sm md:text-base font-medium">Street Light Issue</div>
                                    <div className="text-xs text-gray-600">Connaught Place - 2 days ago</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-orange-200 text-orange-800 rounded-full">Pending</span>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                <AlertTriangle className="w-5 h-5 text-blue-600" />
                                <div className="flex-1">
                                    <div className="text-sm md:text-base font-medium">Water Leak Reported</div>
                                    <div className="text-xs text-gray-600">Janakpuri - 3 days ago</div>
                                </div>
                                <span className="text-xs px-2 py-1 bg-blue-200 text-blue-800 rounded-full">In Progress</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Civic Tip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card-premium bg-gradient-to-br from-primary-600 to-green-600 text-white"
                    >
                        <h3 className="text-lg md:text-xl font-bold mb-4">🌿 Civic Tip of the Day</h3>
                        <p className="mb-4 text-sm md:text-base text-white/90 leading-relaxed">
                            Report issues promptly to help authorities respond faster. Add photos and precise locations for quicker resolution. Every report makes Delhi cleaner and greener!
                        </p>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-white/80">
                            <span>Green Citizen Level 3</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
