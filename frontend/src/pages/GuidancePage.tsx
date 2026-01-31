import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { CheckCircle, Phone, Smartphone, Clock, HelpCircle, Shield } from 'lucide-react';

const AppointmentsPage = () => {
    const navigate = useNavigate();
    return (
        <Layout>
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">What You Should Do Next</h1>
                    <p className="text-gray-600 text-lg">Here's the guidance for your reported issue</p>
                </motion.div>

                <div className="space-y-6">
                    {/* Guidance Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card-premium flex items-start gap-4"
                    >
                        <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" fill="currentColor" />
                        <div>
                            <p className="text-lg leading-relaxed text-gray-900">
                                The garbage in your area <span className="font-bold">(RK Puram)</span> is managed by the{' '}
                                <span className="font-bold text-primary-600">South MCD</span>.
                            </p>
                        </div>
                    </motion.div>

                    {/* Authority Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-civic-beige rounded-2xl p-6 border-2 border-gray-200"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center border-2 border-primary-600">
                                <Shield className="w-8 h-8 text-primary-600" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                    South Delhi Municipal Corporation (SDMC)
                                </h3>
                                <p className="text-gray-600 font-medium">Waste Management Department</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="card-premium"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Contact South MCD:</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Phone className="w-5 h-5 text-primary-600" />
                                <div>
                                    <p className="text-sm text-gray-600">Helpline</p>
                                    <p className="text-lg font-bold text-gray-900">1533-05</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <Smartphone className="w-5 h-5 text-primary-600" />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-600">Mobile App</p>
                                    <p className="text-base font-semibold text-gray-900">Swachh Dilli App</p>
                                </div>
                                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                                    Open App →
                                </button>
                            </div>

                            <div className="text-sm text-gray-600 px-3">
                                <p><span className="font-semibold">Working hours:</span> Mon-Sat, 9 AM - 6 PM</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Timeline Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
                    >
                        <div className="flex items-start gap-3">
                            <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                            <div>
                                <p className="text-lg font-bold text-gray-900 mb-2">Expected Response: 24-48 hours</p>
                                <p className="text-sm text-gray-700">
                                    Call <span className="font-bold">1076</span> if no response in 48 hrs
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Human Verification Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="border-2 border-primary-200 bg-primary-50 rounded-xl p-4 flex items-center gap-3"
                    >
                        <CheckCircle className="w-5 h-5 text-primary-600" />
                        <span className="font-semibold text-primary-800">Reviewed by Civic Coordinator</span>
                    </motion.div>

                    {/* Tips Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="card-premium bg-amber-50 border-amber-200"
                    >
                        <div className="flex items-start gap-3">
                            <HelpCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-gray-900 mb-3">Tips:</h4>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span>Take clear photos of the issue from multiple angles</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span>Keep this reference number for tracking</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-amber-600 font-bold">•</span>
                                        <span>Check status in "My Issues" section regularly</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <div className="grid gap-3">
                        <button
                            onClick={() => navigate('/my-complaints')}
                            className="w-full py-4 text-lg bg-primary-600 text-white rounded-xl font-bold shadow-lg shadow-primary-200 hover:bg-primary-700 transition-all"
                        >
                            Track This Issue
                        </button>
                        <button
                            onClick={() => navigate('/report')}
                            className="w-full py-4 text-lg bg-white text-primary-600 border-2 border-primary-600 rounded-xl font-bold hover:bg-primary-50 transition-all"
                        >
                            Report Another Issue
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default AppointmentsPage;
