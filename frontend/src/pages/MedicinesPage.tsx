import { useState } from 'react';
import Layout from '../components/Layout';
import { motion, AnimatePresence } from 'framer-motion';
import {
    MapPin,
    CheckCircle,
    Clock,
    ChevronRight,
    MessageSquare,
    ThumbsUp,
    LoaderIcon
} from 'lucide-react';

// Mock Data
const MY_ISSUES = [
    {
        id: 'DL-CIV-8291',
        category: 'Waste Management',
        title: 'Garbage Pile at Market Entrance',
        location: 'Sector 14, Dwarka',
        date: '2 hours ago',
        status: 'verifying',
        timeline: [
            { stage: 'Reported', time: '10:30 AM', done: true },
            { stage: 'AI Verification', time: '10:31 AM', done: true },
            { stage: 'Authority Assigned', time: 'Pending', done: false },
            { stage: 'Resolved', time: 'Pending', done: false }
        ],
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&q=80&w=200',
        points: 50
    },
    {
        id: 'DL-CIV-3321',
        category: 'Water Supply',
        title: 'Pipeline Leakage on Main Road',
        location: 'Vasant Kunj Block C',
        date: 'Yesterday',
        status: 'in_progress',
        timeline: [
            { stage: 'Reported', time: 'Yesterday', done: true },
            { stage: 'AI Verification', time: 'Yesterday', done: true },
            { stage: 'Authority Assigned', time: 'DJB Unit 4', done: true },
            { stage: 'Resolution in Progress', time: 'Today', done: false }
        ],
        isEmergency: true,
        points: 100
    },
    {
        id: 'DL-CIV-1002',
        category: 'Street Light',
        title: 'Street Light Not Working',
        location: 'Saket Metro Station',
        date: '3 Days Ago',
        status: 'resolved',
        timeline: [
            { stage: 'Reported', time: '3 days ago', done: true },
            { stage: 'Assigned', time: '2 days ago', done: true },
            { stage: 'Fixed', time: 'Yesterday', done: true },
            { stage: 'Closed', time: 'Yesterday', done: true }
        ],
        points: 20
    }
];

const STATUS_CONFIG: Record<string, any> = {
    verifying: { label: 'Verifying', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: Clock },
    in_progress: { label: 'In Progress', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: LoaderIcon },
    resolved: { label: 'Resolved', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', icon: CheckCircle },
};

function LoaderIcon(props: any) {
    return (
        <div className="animate-spin">
            <Clock {...props} />
        </div>
    );
}

const MyComplaintsPage = () => {
    const [filter, setFilter] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

    const filteredIssues = filter === 'all'
        ? MY_ISSUES
        : MY_ISSUES.filter(i => i.status === filter);

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pb-20 pt-2 px-4">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Track Reports</h1>
                        <p className="text-gray-500 text-sm">Monitor status of your civic contributions</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100">
                            {MY_ISSUES.filter(i => i.status !== 'resolved').length} Active
                        </span>
                        <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">
                            {MY_ISSUES.filter(i => i.status === 'resolved').length} Resolved
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {['all', 'verifying', 'in_progress', 'resolved'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${filter === f
                                ? 'bg-gray-900 text-white border-gray-900 shadow-md transform scale-105'
                                : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                                }`}
                        >
                            {f.replace('_', ' ').toUpperCase()}
                        </button>
                    ))}
                </div>

                {/* List */}
                <motion.div layout className="space-y-4">
                    <AnimatePresence>
                        {filteredIssues.map((issue) => {
                            const StatusIcon = STATUS_CONFIG[issue.status].icon;
                            return (
                                <motion.div
                                    key={issue.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-all"
                                >
                                    <div className="p-5">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${STATUS_CONFIG[issue.status].bg} ${STATUS_CONFIG[issue.status].color} ${STATUS_CONFIG[issue.status].border} border`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {STATUS_CONFIG[issue.status].label}
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-400 font-bold">{issue.id}</span>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-primary-600 transition-colors">
                                                    {issue.title}
                                                </h3>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mb-3">
                                                    <MapPin className="w-3.5 h-3.5" />
                                                    {issue.location}
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mt-4">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
                                                        <span>Reported</span>
                                                        <span>Verified</span>
                                                        <span>Action</span>
                                                        <span>Resolved</span>
                                                    </div>
                                                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden flex">
                                                        {issue.timeline.map((item, idx) => (
                                                            <div
                                                                key={idx}
                                                                className={`h-full flex-1 border-r border-white last:border-0 transition-all duration-500 ${item.done ? 'bg-green-500' : 'bg-transparent'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Thumbnail */}
                                            <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm relative">
                                                <img src={issue.image || "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?auto=format&fit=crop&q=80&w=200"} alt="Issue" className="w-full h-full object-cover" />
                                                {issue.points > 0 && (
                                                    <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[9px] font-black px-1.5 py-0.5 rounded-bl-lg">
                                                        +{issue.points}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Accordion / Actions */}
                                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                                    >
                                        <span className="text-xs font-bold text-primary-600 flex items-center gap-1">
                                            View Timeline & Details
                                        </span>
                                        <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedIssue === issue.id ? 'rotate-90' : ''}`} />
                                    </div>

                                    {/* Expanded Details */}
                                    <AnimatePresence>
                                        {selectedIssue === issue.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="border-t border-gray-200 bg-white"
                                            >
                                                <div className="p-5 space-y-6">
                                                    <div>
                                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Detailed Timeline</h4>
                                                        <div className="relative pl-4 space-y-6 border-l-2 border-gray-100 ml-1.5">
                                                            {issue.timeline.map((step, idx) => (
                                                                <div key={idx} className="relative group">
                                                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all ${step.done ? 'bg-green-500 scale-125' : 'bg-gray-300'}`} />
                                                                    <p className={`text-sm font-bold ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.stage}</p>
                                                                    <p className="text-[10px] text-gray-400 font-mono mt-0.5">{step.time}</p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="flex gap-2">
                                                        <button className="flex-1 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-colors flex items-center justify-center gap-2">
                                                            <MessageSquare className="w-3.5 h-3.5" /> Chat with Authority
                                                        </button>
                                                        <button className="flex-1 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-xs font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                                                            <ThumbsUp className="w-3.5 h-3.5" /> Rate Response
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </Layout>
    );
};

export default MyComplaintsPage;
