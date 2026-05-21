import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
  Calendar,
  Plus,
  CheckCircle,
  Edit,
  Trash2,
  Save,
  X,
  Clock,
  MapPin,
  Users,
  AlertCircle,
  CalendarDays,
  Timer,
} from 'lucide-react';

export default function SeancesIndex({ seances = [], equipes = [] }) {
    const { flash } = usePage().props;
    const [showCreate, setShowCreate] = useState(false);
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        equipe_id: '', date: '', heure_debut: '', heure_fin: '', lieu: '',
    });

    const openCreate = () => { reset(); setShowCreate(true); setEditing(null); };
    const openEdit = (s) => { 
        setData({ 
            equipe_id: s.equipe_id, 
            date: s.date, 
            heure_debut: s.heure_debut, 
            heure_fin: s.heure_fin, 
            lieu: s.lieu || '' 
        }); 
        setEditing(s); 
        setShowCreate(false); 
    };
    const closeForm = () => { setShowCreate(false); setEditing(null); reset(); };

    const submit = (e) => {
        e.preventDefault();
        if (editing) { 
            put(`/admin/seances/${editing.id}`, { onSuccess: closeForm }); 
        } else { 
            post('/admin/seances', { onSuccess: closeForm }); 
        }
    };

    const formatTime = (time) => {
        if (!time) return '-';
        return time.substring(0, 5);
    };

    const getDayStatus = (date) => {
        const today = new Date().toDateString();
        const seanceDate = new Date(date).toDateString();
        if (seanceDate === today) return { label: 'Aujourd\'hui', color: 'green' };
        if (new Date(date) > new Date()) return { label: 'À venir', color: 'blue' };
        return { label: 'Passée', color: 'gray' };
    };

    return (
        <DashboardLayout>
            <Head title="Gestion des Séances" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Gestion des Séances
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            {seances.length} séance{seances.length > 1 ? 's' : ''} au total
                            {seances.length > 0 && (
                                <span className="inline-flex items-center gap-1 text-blue-600 text-sm">
                                    <Clock className="w-3 h-3" />
                                    {seances.filter(s => new Date(s.date) >= new Date()).length} à venir
                                </span>
                            )}
                        </p>
                    </div>
                    <button 
                        onClick={openCreate}
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Planifier une séance
                    </button>
                </div>

                {/* Message flash */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-5 h-5" />
                        {flash.success}
                    </div>
                )}
                {flash?.error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 flex items-center gap-2 animate-fadeIn">
                        <AlertCircle className="w-5 h-5" />
                        {flash.error}
                    </div>
                )}

                {/* Formulaire création/modification */}
                {(showCreate || editing) && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {editing ? (
                                        <>
                                            <Edit className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Modifier la séance
                                            </h2>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Planifier une séance
                                            </h2>
                                        </>
                                    )}
                                </div>
                                <button 
                                    onClick={closeForm}
                                    className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>
                        </div>

                        <form onSubmit={submit} className="p-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Équipe *
                                    </label>
                                    <select 
                                        value={data.equipe_id} 
                                        onChange={(e) => setData('equipe_id', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required
                                    >
                                        <option value="">Choisir une équipe...</option>
                                        {equipes.map(e => (
                                            <option key={e.id} value={e.id}>
                                                {e.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Date *
                                    </label>
                                    <input 
                                        type="date" 
                                        value={data.date} 
                                        onChange={(e) => setData('date', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Heure début *
                                    </label>
                                    <input 
                                        type="time" 
                                        value={data.heure_debut} 
                                        onChange={(e) => setData('heure_debut', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Heure fin *
                                    </label>
                                    <input 
                                        type="time" 
                                        value={data.heure_fin} 
                                        onChange={(e) => setData('heure_fin', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required 
                                    />
                                </div>
                                
                                <div className="lg:col-span-1">
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Lieu
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.lieu} 
                                        onChange={(e) => setData('lieu', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        placeholder="Ex: Stade, Gymnase..."
                                    />
                                </div>
                                
                                <div className="lg:col-span-1 flex items-end gap-2">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-5 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                                        ) : editing ? (
                                            <>
                                                <Save className="w-4 h-4" />
                                                Sauvegarder
                                            </>
                                        ) : (
                                            <>
                                                <Plus className="w-4 h-4" />
                                                Créer
                                            </>
                                        )}
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={closeForm}
                                        className="px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                                    >
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Liste des séances */}
                {seances.length > 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Équipe</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Horaire</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Lieu</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Statut</th>
                                        <th className="p-4 text-center font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {seances.map((s) => {
                                        const status = getDayStatus(s.date);
                                        const statusColors = {
                                            green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
                                            blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
                                            gray: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
                                        };
                                        
                                        return (
                                            <tr key={s.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                                                            {s.equipe?.name?.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="font-medium text-slate-800 dark:text-white">
                                                            {s.equipe?.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {new Date(s.date).toLocaleDateString('fr-FR', { 
                                                                weekday: 'short', 
                                                                day: 'numeric', 
                                                                month: 'short' 
                                                            })}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Timer className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {formatTime(s.heure_debut)} - {formatTime(s.heure_fin)}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4 text-slate-400" />
                                                        <span className="text-slate-700 dark:text-slate-300">
                                                            {s.lieu || '-'}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[status.color]}`}>
                                                        <div className={`w-1.5 h-1.5 rounded-full bg-${status.color}-500 animate-pulse`}></div>
                                                        {status.label}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button 
                                                            onClick={() => openEdit(s)}
                                                            className="p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                                                            title="Modifier"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <Link 
                                                            href={`/admin/seances/${s.id}`} 
                                                            method="delete" 
                                                            as="button"
                                                            className="p-2 rounded-lg transition-all duration-300 hover:scale-110 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400"
                                                            title="Supprimer"
                                                            onClick={(e) => { 
                                                                if (!confirm(`Supprimer la séance du ${new Date(s.date).toLocaleDateString('fr-FR')} ?`)) e.preventDefault(); 
                                                            }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
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
                            <Calendar className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-xl font-medium text-slate-800 dark:text-white">Aucune séance</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Commencez par planifier votre première séance d'entraînement.</p>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-yellow-400 text-slate-800 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Planifier une séance
                        </button>
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