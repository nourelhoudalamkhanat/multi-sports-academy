import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import {
  LayoutDashboard,
  Users,
  UserCircle,
  Trophy,
  Users2,
  Calendar,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon,
  Activity,
} from 'lucide-react';

export default function DashboardLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth.user;
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const menuItems = [
        { label: 'Tableau de bord', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'Coachs', icon: UserCircle, href: '/admin/coachs' },
        { label: 'Athlètes', icon: Users, href: '/admin/athletes' },
        { label: 'Sports', icon: Trophy, href: '/admin/sports' },
        { label: 'Équipes', icon: Users2, href: '/admin/equipes' },
        { label: 'Séances', icon: Calendar, href: '/admin/seances' },
        { label: 'Évaluations', icon: TrendingUp, href: '/admin/evaluations' },
        { label: 'Paramètres', icon: Settings, href: '/admin/parametres' },
    ];

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bon matin';
        if (hour < 18) return 'Bon après-midi';
        return 'Bonne soirée';
    };

    return (
        <div className="flex h-screen" style={{ backgroundColor: isDarkMode ? '#0F172A' : '#F8FAFC' }}>
            {/* Sidebar */}
            <div className={`${sidebarOpen ? 'w-72' : 'w-24'} transition-all duration-500 ease-in-out flex flex-col backdrop-blur-xl bg-white/90 dark:bg-slate-900/90 shadow-2xl border-r border-gray-200 dark:border-gray-700`}>
                {/* Logo */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10" />
                        {sidebarOpen && (
                            <Link href="/" className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-800 dark:text-white">
                                    MSA
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">Administration</span>
                            </Link>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="p-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                {user.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-slate-900"></div>
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1">
                                <div className="font-semibold text-gray-800 dark:text-white text-sm">{user.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Administrateur</div>
                                <div className="text-xs text-green-600 dark:text-green-400 mt-1 flex items-center gap-1">
                                    <Activity className="w-2 h-2 fill-current" />
                                    Actif
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <nav className="flex-1 p-5 space-y-2 overflow-y-auto">
                    <div className="mb-4 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {sidebarOpen && 'Navigation principale'}
                    </div>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = window.location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center space-x-3 p-3 rounded-xl transition-all duration-300 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-yellow-400 to-blue-700 text-white shadow-lg transform scale-105'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:translate-x-1'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                {sidebarOpen && (
                                    <>
                                        <span className="flex-1 font-medium">{item.label}</span>
                                        {isActive && (
                                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                        )}
                                    </>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout */}
                <div className="p-5 border-t border-gray-200 dark:border-gray-700">
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="group w-full flex items-center space-x-3 p-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        {sidebarOpen && (
                            <>
                                <span className="flex-1 text-left">Déconnexion</span>
                                <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">↗</span>
                            </>
                        )}
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center space-x-6">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-transform hover:scale-110"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        
                        <div className="hidden md:block">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-blue-700 bg-clip-text text-transparent">
                                {getGreeting()}, {user.name.split(' ')[0]} 👋
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Prêt pour une nouvelle journée de succès ?
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        {/* Date avec animation */}
                        <div className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <div className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                                {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                            </div>
                        </div>

                        {/* Dark mode toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>

                        {/* Avatar mobile */}
                        <div className="md:hidden w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
                            {user.name.charAt(0)}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/30 via-transparent to-blue-50/30 dark:from-yellow-950/10 dark:via-transparent dark:to-blue-950/10 pointer-events-none"></div>
                    <div className="relative z-10 animate-fadeIn">
                        {children}
                    </div>
                </main>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out;
                }
            `}</style>
        </div>
    );
}