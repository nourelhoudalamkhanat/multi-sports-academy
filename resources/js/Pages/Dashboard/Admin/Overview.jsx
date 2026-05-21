import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import {
  Users,
  UserCircle,
  Trophy,
  Building2,
  Calendar,
  Plus,
  TrendingUp,
  Activity,
  Sparkles,
  Zap,
  Clock,
} from 'lucide-react';

export default function AdminDashboard({ stats, derniersInscrits }) {
    const statCards = [
        { label: 'Athlètes', value: stats.athletes || 0, icon: Users, color: '#3B82F6', bg: '#EFF6FF' },
        { label: 'Coachs', value: stats.coachs || 0, icon: UserCircle, color: '#10B981', bg: '#ECFDF5' },
        { label: 'Sports', value: stats.sports || 0, icon: Trophy, color: '#F59E0B', bg: '#FFFBEB' },
        { label: 'Équipes', value: stats.equipes || 0, icon: Building2, color: '#8B5CF6', bg: '#F5F3FF' },
        { label: 'Séances', value: stats.seances || 0, icon: Calendar, color: '#EF4444', bg: '#FEF2F2' },
    ];

    const quickAccessLinks = [
        { label: 'Ajouter un coach', icon: UserCircle, href: '/admin/coachs/create', color: '#10B981' },
        { label: 'Ajouter un athlète', icon: Users, href: '/admin/athletes/create', color: '#3B82F6' },
        { label: 'Créer une équipe', icon: Building2, href: '/admin/equipes/create', color: '#8B5CF6' },
        { label: 'Planifier une séance', icon: Calendar, href: '/admin/seances/create', color: '#EF4444' },
    ];

    const getRoleBadgeStyle = (role) => {
        if (role === 'coach') {
            return { bg: '#D1FAE5', text: '#065F46' };
        }
        return { bg: '#DBEAFE', text: '#1E40AF' };
    };

    const getRoleLabel = (role) => {
        return role === 'coach' ? 'Coach' : 'Athlète';
    };

    return (
        <DashboardLayout>
            <Head title="Tableau de bord" />

            <div className="space-y-8">
                {/* En-tête avec bienvenue */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                            Tableau de bord
                        </h1>
                        <p className="mt-1 text-slate-500 dark:text-slate-400">
                            Voici un aperçu de votre académie aujourd'hui.
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 rounded-full">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="text-sm text-slate-600 dark:text-slate-300">
                            Dernière mise à jour : {new Date().toLocaleTimeString('fr-FR')}
                        </span>
                    </div>
                </div>

                {/* Cartes statistiques */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {statCards.map((card, index) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={index}
                                className="rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 group"
                                style={{ backgroundColor: card.bg }}
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                         style={{ backgroundColor: `${card.color}15` }}>
                                        <Icon className="w-6 h-6" style={{ color: card.color }} />
                                    </div>
                                    <span className="text-3xl font-black" style={{ color: card.color }}>
                                        {card.value}
                                    </span>
                                </div>
                                <p className="font-medium text-slate-700">
                                    {card.label}
                                </p>
                                
                            </div>
                        );
                    })}
                </div>

                {/* Section des derniers inscrits + accès rapide */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Derniers inscrits */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-500" />
                                Derniers inscrits
                            </h2>
                            <Link href="/admin/athletes" className="text-sm text-blue-600 hover:text-blue-700 transition-colors">
                                Voir tout →
                            </Link>
                        </div>
                        
                        {derniersInscrits && derniersInscrits.length > 0 ? (
                            <div className="space-y-3">
                                {derniersInscrits.map((user, idx) => {
                                    const roleStyle = getRoleBadgeStyle(user.role);
                                    return (
                                        <div key={user.id} 
                                             className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 transition-all hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-slate-800 dark:text-white">{user.name}</p>
                                                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                            <span className="px-3 py-1 rounded-full text-xs font-medium"
                                                style={{ backgroundColor: roleStyle.bg, color: roleStyle.text }}
                                            >
                                                {getRoleLabel(user.role)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                                <p>Aucun inscrit récent.</p>
                            </div>
                        )}
                    </div>

                    {/* Accès rapide */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 transition-all hover:shadow-md">
                        <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                            <Zap className="w-5 h-5 text-yellow-500" />
                            Accès rapide
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {quickAccessLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="group p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 hover:shadow-md bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700/50 dark:to-slate-800/50"
                                    >
                                        <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 transition-transform group-hover:scale-110"
                                             style={{ backgroundColor: `${link.color}15` }}>
                                            <Icon className="w-6 h-6" style={{ color: link.color }} />
                                        </div>
                                        <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {link.label}
                                        </div>
                                        <div className="text-xs text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            Cliquer pour ajouter →
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        
                        {/* Petit conseil */}
                        <div className="mt-6 p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                            <p className="text-xs text-slate-600 dark:text-slate-300 text-center">
                                💡 Astuce : Utilisez les raccourcis pour gagner du temps
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}