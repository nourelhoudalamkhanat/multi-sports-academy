import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  Users,
  Plus,
  CheckCircle,
  TrendingUp,
  Calendar,
  Award,
  Edit,
  Trash2,
  UserPlus,
  Mail,
  Phone,
  Activity,
  Target,
  Medal,
} from 'lucide-react';

export default function AthletesIndex({ athletes = [] }) {
    const { flash } = usePage().props;

    const getLevelLabel = (level) => {
        switch(level) {
            case 'avance': return 'Avancé';
            case 'intermediaire': return 'Intermédiaire';
            case 'debutant': return 'Débutant';
            default: return level || 'N/A';
        }
    };

    const getLevelColor = (level) => {
        switch(level) {
            case 'avance': return { bg: '#D1FAE5', text: '#065F46', icon: Medal };
            case 'intermediaire': return { bg: '#DBEAFE', text: '#1E40AF', icon: Target };
            case 'debutant': return { bg: '#FEF3C7', text: '#92400E', icon: Activity };
            default: return { bg: '#F3F4F6', text: '#6B7280', icon: Activity };
        }
    };

    return (
        <DashboardLayout>
            <Head title="Gestion des Athlètes" />

            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Gestion des Athlètes
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {athletes.length} athlète{athletes.length > 1 ? 's' : ''} au total
                            
                        </p>
                    </div>
                    <Link
                        href="/admin/athletes/create"
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter un athlète
                    </Link>
                </div>

                {/* Message flash */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-5 h-5" />
                        {flash.success}
                    </div>
                )}

                {/* Tableau */}
                {athletes.length > 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Athlète</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Âge</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Niveau</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Équipes</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {athletes.map((athlete) => {
                                        const levelInfo = getLevelColor(athlete.level);
                                        const LevelIcon = levelInfo.icon;
                                        
                                        return (
                                            <tr key={athlete.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                            {athlete.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-slate-800 dark:text-white flex items-center gap-1">
                                                                {athlete.name}
                                                                {athlete.is_active && (
                                                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                                )}
                                                            </p>
                                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                                <Mail className="w-3 h-3" />
                                                                <span>{athlete.email}</span>
                                                            </div>
                                                            {athlete.phone && (
                                                                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                                    <Phone className="w-3 h-3" />
                                                                    <span>{athlete.phone}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {athlete.age ? `${athlete.age} ans` : '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                                                        style={{ backgroundColor: levelInfo.bg, color: levelInfo.text }}
                                                    >
                                                        <LevelIcon className="w-3 h-3" />
                                                        {getLevelLabel(athlete.level)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-1">
                                                        <Users className="w-4 h-4 text-slate-400" />
                                                        <span className="font-medium text-slate-700 dark:text-slate-300">
                                                            {athlete.equipes || '0'}
                                                        </span>
                                                        
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Link
                                                            href={`/admin/athletes/${athlete.id}/edit`}
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                                                        >
                                                            <Edit className="w-3.5 h-3.5" />
                                                            Modifier
                                                        </Link>
                                                        <Link
                                                            href={`/admin/athletes/${athlete.id}`}
                                                            method="delete"
                                                            as="button"
                                                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                                                            onClick={(e) => {
                                                                if (!confirm(`Supprimer ${athlete.name} ?`)) e.preventDefault();
                                                            }}
                                                        >
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                            Supprimer
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                            <Users className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-xl font-medium text-slate-800 dark:text-white">Aucun athlète</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Commencez par ajouter votre premier athlète.</p>
                        <Link
                            href="/admin/athletes/create"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-yellow-400 text-slate-800 shadow-md"
                        >
                            <UserPlus className="w-5 h-5" />
                            Ajouter un athlète
                        </Link>
                    </div>
                )}
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out;
                }
            `}</style>
        </DashboardLayout>
    );
}