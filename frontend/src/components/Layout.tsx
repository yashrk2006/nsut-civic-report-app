import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Leaf,
    Home,
    FileText,
    List,
    User,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = [
        { name: 'Home', href: '/home', icon: Home },
        { name: 'Report Issue', href: '/report', icon: FileText },
        { name: 'My Complaints', href: '/my-complaints', icon: List },
        { name: 'Profile', href: '/profile', icon: User },
    ];

    const handleLogout = () => {
        logout();
        toast.success('Logged out successfully');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
                <div className="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-6">
                        <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-3">
                            <span className="text-lg font-bold text-gray-900">
                                Civic Assistant
                            </span>
                            <p className="text-xs text-gray-600">Delhi</p>
                        </div>
                    </div>

                    <div className="mt-8 flex-grow flex flex-col">
                        <nav className="flex-1 px-4 space-y-2">
                            {navigation.map((item) => {
                                const isActive = location.pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all ${isActive
                                            ? 'bg-primary-600 text-white shadow-lg'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        <item.icon
                                            className={`mr-3 flex-shrink-0 h-6 w-6 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'
                                                }`}
                                        />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="flex-shrink-0 px-4">
                        <div className="card p-4 mb-4 bg-civic-beige">
                            <div className="flex items-center">
                                <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-bold">
                                    {user?.name?.charAt(0) || 'U'}
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {user?.name || 'User'}
                                    </p>
                                    <p className="text-xs text-green-600 font-medium">
                                        Green Citizen
                                    </p>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile header */}
            <div className="lg:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
                <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                            <Leaf className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <span className="text-base font-bold text-gray-900">Civic Assistant</span>
                            <p className="text-xs text-gray-600">Delhi</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-4 space-y-2 border-t"
                    >
                        {navigation.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl ${isActive
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <item.icon className="mr-3 h-5 w-5" />
                                    {item.name}
                                </Link>
                            );
                        })}
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl"
                        >
                            <LogOut className="mr-3 h-5 w-5" />
                            Logout
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Main content */}
            <div className="lg:pl-72">
                <main className="py-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;
