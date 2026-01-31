import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Phone,
    Calendar,
    Award,
    Trophy,
    Star,
    Zap,
    TrendingUp,
    Shield,
    MapPin,
    Crown
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ACHIEVEMENTS = [
    { id: 1, title: 'First Report', icon: MapPin, color: 'text-blue-600', bg: 'bg-blue-100', desc: 'Reported your first issue' },
    { id: 2, title: 'Waste Warrior', icon: TrashIcon, color: 'text-green-600', bg: 'bg-green-100', desc: '5 verified waste reports' },
    { id: 3, title: 'Super Verifier', icon: Shield, color: 'text-purple-600', bg: 'bg-purple-100', desc: 'Validated 10 issues' },
    { id: 4, title: 'Streak Master', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-100', desc: 'Active for 7 days in a row' },
];

function TrashIcon(props: any) {
    return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>;
}

const LEADERBOARD = [
    { rank: 1, name: 'Suresh Kumar', points: 4500, avatar: 'SK' },
    { rank: 2, name: 'Priya Singh', points: 3820, avatar: 'PS' },
    { rank: 3, name: 'You', points: 2450, avatar: 'You', active: true },
    { rank: 4, name: 'Amit Verma', points: 2100, avatar: 'AV' },
];

const ProfilePage = () => {
    const { user } = useAuthStore();
    const currentPoints = 2450;
    const nextLevelPoints = 3000;
    const progress = (currentPoints / nextLevelPoints) * 100;

    return (
        <Layout>
            <div className="max-w-4xl mx-auto pb-20 pt-2 px-4">
                {/* Header */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Your Impact</h1>
                        <p className="text-gray-500 text-sm">Level 3 • Green Citizen</p>
                    </div>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <User className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

                {/* Main Stats Card */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 text-white shadow-xl mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                        <Trophy className="w-40 h-40 transform rotate-12" />
                    </div>

                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center bg-white/10 text-2xl font-bold">
                                {user?.name?.charAt(0) || 'R'}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold">{user?.name || 'Rohit Sharma'}</h2>
                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                    <MapPin className="w-3.5 h-3.5" /> Dwarka, New Delhi
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total XP</span>
                                <span className="text-3xl font-bold text-green-400">{currentPoints}</span>
                            </div>
                            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
                            </div>
                            <p className="text-right text-xs text-gray-400 mt-1.5 font-medium">
                                {nextLevelPoints - currentPoints} points to Level 4
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-sm">
                                <div className="text-2xl font-bold">12</div>
                                <div className="text-[10px] text-gray-300 font-bold uppercase">Reports</div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-sm">
                                <div className="text-2xl font-bold text-green-400">8</div>
                                <div className="text-[10px] text-gray-300 font-bold uppercase">Resolved</div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-sm">
                                <div className="text-2xl font-bold text-yellow-400">4</div>
                                <div className="text-[10px] text-gray-300 font-bold uppercase">Badges</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Achievements */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary-600" /> Recent Badges
                </h3>
                <div className="grid grid-cols-2 gap-3 mb-8">
                    {ACHIEVEMENTS.map((badge) => (
                        <div key={badge.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-start gap-3">
                            <div className={`p-2.5 rounded-xl ${badge.bg} ${badge.color}`}>
                                <badge.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-gray-900 leading-tight">{badge.title}</h4>
                                <p className="text-[10px] text-gray-500 mt-1 leading-tight">{badge.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Leaderboard */}
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary-600" /> Neighborhood Top Citizens
                </h3>
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    {LEADERBOARD.map((p, idx) => (
                        <div key={idx} className={`flex items-center p-4 border-b border-gray-50 last:border-0 ${p.active ? 'bg-primary-50' : ''}`}>
                            <div className="w-8 font-bold text-gray-400 text-center">#{p.rank}</div>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mr-4 ${idx === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    idx === 1 ? 'bg-gray-100 text-gray-700' :
                                        idx === 2 ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                }`}>
                                {idx === 0 ? <Crown className="w-5 h-5" /> : p.avatar}
                            </div>
                            <div className="flex-1">
                                <h4 className={`font-bold text-sm ${p.active ? 'text-primary-700' : 'text-gray-900'}`}>{p.name}</h4>
                            </div>
                            <div className="font-bold text-gray-600 text-sm">{p.points.toLocaleString()} pts</div>
                        </div>
                    ))}
                </div>

                <button className="w-full mt-8 py-4 bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                    View Full Profile Settings
                </button>
            </div>
        </Layout>
    );
};

export default ProfilePage;
