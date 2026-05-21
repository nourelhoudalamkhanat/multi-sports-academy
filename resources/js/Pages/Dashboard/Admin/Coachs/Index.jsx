import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import {
  UserCircle,
  Plus,
  CheckCircle,
  TrendingUp,
  Users,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  UserPlus,
  School,
  Mail,
  Phone,
  Award,
} from 'lucide-react';

export default function CoachsIndex({ coachs = [] }) {
    const { flash } = usePage().props;

    const getExperienceLabel = (years) => {
        if (!years) return '-';
        if (years < 2) return 'Débutant';
        if (years < 5) return 'Confirmé';
        if (years < 10) return 'Expérimenté';
        return 'Expert';
    };

    const getExperienceColor = (years) => {
        if (!years) return '#6B7280';
        if (years < 2) return '#10B981';
        if (years < 5) return '#3B82F6';
        if (years < 10) return '#8B5CF6';
        return '#F59E0B';
    };

    return (
        <DashboardLayout>
            <Head title="Gestion des Coachs" />

            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <UserCircle className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Gestion des Coachs
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {coachs.length} coach{coachs.length > 1 ? 's' : ''} au total
                           
                        </p>
                    </div>
                    <Link
                        href="/admin/coachs/create"
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-800 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter un coach
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
                {coachs.length > 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Coach</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Spécialité</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Expérience</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Équipes</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coachs.map((coach) => (
                                        <tr key={coach.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                                                        {coach.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-slate-800 dark:text-white flex items-center gap-1">
                                                            {coach.name}
                                                            {coach.is_active && (
                                                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                                            )}
                                                        </p>
                                                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                                                            <Mail className="w-3 h-3" />
                                                            <span>{coach.email}</span>
                                                        </div>
                                                        {coach.phone && (
                                                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                                                <Phone className="w-3 h-3" />
                                                                <span>{coach.phone}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                                                    <Award className="w-3 h-3" />
                                                    {coach.speciality || 'Non défini'}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                                        <div 
                                                            className="h-full rounded-full transition-all duration-500"
                                                            style={{ 
                                                                width: `${Math.min((coach.experience || 0) * 10, 100)}%`,
                                                                backgroundColor: getExperienceColor(coach.experience)
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                                        {coach.experience ? `${coach.experience} ans` : '-'}
                                                    </span>
                                                </div>
                                                {coach.experience && (
                                                    <span className="text-xs text-slate-400">
                                                        {getExperienceLabel(coach.experience)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1">
                                                    <Users className="w-4 h-4 text-slate-400" />
                                                    <span className="font-medium text-slate-700 dark:text-slate-300">
                                                        {coach.equipes?.length || 0}
                                                    </span>
                                                    <span className="text-sm text-slate-500">
                                                        équipe(s)
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/coachs/${coach.id}/edit`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                        Modifier
                                                    </Link>
                                                    <Link
                                                        href={`/admin/coachs/${coach.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                                                        onClick={(e) => {
                                                            if (!confirm(`Supprimer ${coach.name} ?`)) e.preventDefault();
                                                        }}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Supprimer
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                            <UserCircle className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-xl font-medium text-slate-800 dark:text-white">Aucun coach</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Commencez par ajouter votre premier coach.</p>
                        <Link
                            href="/admin/coachs/create"
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-800 shadow-md"
                        >
                            <UserPlus className="w-5 h-5" />
                            Ajouter un coach
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