import { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { MapPin, Camera, Mic, Send, CheckCircle, Edit } from 'lucide-react';
import toast from 'react-hot-toast';

const HealthTrackerPage = () => {
    const [issue, setIssue] = useState('');
    const [location, setLocation] = useState('RK Puram, New Delhi');
    const [category] = useState('Waste Management – Garbage Collection');
    const [showResponse, setShowResponse] = useState(false);

    const handleSubmit = () => {
        if (!issue.trim()) {
            toast.error('Please describe your issue');
            return;
        }

        toast.success('Issue reported successfully!');
        // Navigate to guidance page or show confirmation
    };

    const handleIssueChange = (value: string) => {
        setIssue(value);
        if (value.length > 10 && !showResponse) {
            setShowResponse(true);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">Report an Issue</h1>
                    <p className="text-gray-600 text-lg">Describe your civic concern and we'll help you resolve it</p>
                </motion.div>

                <div className="space-y-6">
                    {/* Chat Interface */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* User Message */}
                        <div className="flex justify-end">
                            <div className="max-w-xl">
                                <textarea
                                    value={issue}
                                    onChange={(e) => handleIssueChange(e.target.value)}
                                    placeholder="Describe your issue (e.g., Garbage has not been collected in my area for two days)"
                                    className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-2xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* AI Response */}
                        {showResponse && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex justify-start"
                            >
                                <div className="max-w-xl bg-civic-beige px-5 py-4 rounded-2xl border border-gray-200">
                                    <p className="text-gray-800">Got it. Let me help you with this.</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Location Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="card-premium"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-600 mb-1">Detected Location:</p>
                                    <p className="text-lg font-bold text-gray-900">{location}</p>
                                </div>
                            </div>
                            <button className="text-blue-600 text-sm font-medium hover:text-blue-700 flex items-center gap-1">
                                <Edit className="w-4 h-4" />
                                Edit
                            </button>
                        </div>
                    </motion.div>

                    {/* Category Card */}
                    {showResponse && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="card-premium"
                        >
                            <p className="text-sm font-semibold text-gray-700 mb-3">Identified Issue Category</p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full">
                                <CheckCircle className="w-4 h-4" />
                                <span className="font-medium">{category}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Optional Inputs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="card-premium"
                    >
                        <p className="text-sm font-semibold text-gray-700 mb-4">Optional inputs</p>
                        <div className="grid gap-3">
                            <button className="flex items-center justify-center gap-3 px-5 py-3 border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 rounded-xl transition-all">
                                <Camera className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-700">Add Photo</span>
                            </button>
                            <button className="flex items-center justify-center gap-3 px-5 py-3 border-2 border-gray-300 hover:border-primary-500 hover:bg-primary-50 rounded-xl transition-all">
                                <Mic className="w-5 h-5 text-gray-600" />
                                <span className="font-medium text-gray-700">Add Voice Note</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* AI Transparency */}
                    <p className="text-xs text-center text-gray-500 px-4">
                        Auto-classified using AI • Verified by civic rules
                    </p>

                    {/* Submit Button */}
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleSubmit}
                        className="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                        <Send className="w-5 h-5" />
                        Submit Issue
                    </motion.button>
                </div>
            </div>
        </Layout>
    );
};

export default HealthTrackerPage;
