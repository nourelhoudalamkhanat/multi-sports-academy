import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import {
  Building2,
  Plus,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Save,
  X,
  Trophy,
  UserCircle,
  Users,
  UserPlus,
  Medal,
  ArrowRight,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function EquipesIndex({ equipes = [], coachs = [], sports = [], athletes = [] }) {
    const { flash } = usePage().props;
    const [editingEquipe, setEditingEquipe] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    // Formulaire création/modification
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        sport_id: '',
        coach_id: '',
    });

    // Formulaire ajout athlète
    const { data: athleteData, setData: setAthleteData, post: postAthlete, processing: processingAthlete } = useForm({
        athlete_id: '',
    });

    const openCreate = () => {
        reset();
        setShowCreate(true);
        setEditingEquipe(null);
    };

    const openEdit = (equipe) => {
        setData({
            name: equipe.name,
            sport_id: equipe.sport_id,
            coach_id: equipe.coach_id,
        });
        setEditingEquipe(equipe);
        setShowCreate(false);
    };

    const closeForm = () => {
        setShowCreate(false);
        setEditingEquipe(null);
        reset();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (editingEquipe) {
            put(`/admin/equipes/${editingEquipe.id}`, {
                onSuccess: () => closeForm(),
            });
        } else {
            post('/admin/equipes', {
                onSuccess: () => closeForm(),
            });
        }
    };

    const addAthlete = (equipeId) => {
        if (!athleteData.athlete_id) return;
        postAthlete(`/admin/equipes/${equipeId}/add-athlete`, {
            preserveScroll: true,
            onSuccess: () => setAthleteData('athlete_id', ''),
        });
    };

    const getSportIcon = (sportName) => {
        const icons = {
            'Football': '⚽',
            'Basketball': '🏀',
            'volleyball': '🏐',
            'Volley-ball': '🏐',
            'Athlétisme': '🏃',
        };
        return icons[sportName] || '🏅';
    };

    return (
        <DashboardLayout>
            <Head title="Gestion des Équipes" />

            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building2 className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Gestion des Équipes
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            {equipes.length} équipe{equipes.length > 1 ? 's' : ''} au total
                        </p>
                    </div>
                    <button
                        onClick={openCreate}
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Créer une équipe
                    </button>
                </div>

                {/* Messages flash */}
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
                {(showCreate || editingEquipe) && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {editingEquipe ? (
                                        <>
                                            <Edit className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Modifier l'équipe
                                            </h2>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Créer une équipe
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

                        <form onSubmit={submitForm} className="p-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Nom de l'équipe *
                                    </label>
                                    <input 
                                        type="text" 
                                        value={data.name} 
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        placeholder="Ex: Lions, Eagles, Tigers..."
                                        required 
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Sport *
                                    </label>
                                    <select 
                                        value={data.sport_id} 
                                        onChange={(e) => setData('sport_id', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required
                                    >
                                        <option value="">Choisir un sport...</option>
                                        {sports.map(s => (
                                            <option key={s.id} value={s.id}>
                                                {s.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                        Coach *
                                    </label>
                                    <select 
                                        value={data.coach_id} 
                                        onChange={(e) => setData('coach_id', e.target.value)}
                                        className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                        required
                                    >
                                        <option value="">Choisir un coach...</option>
                                        {coachs.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-end gap-2">
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="px-6 py-2 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? (
                                            <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                                        ) : editingEquipe ? (
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

                {/* Liste des équipes */}
                {equipes.length > 0 ? (
                    <div className="space-y-5">
                        {equipes.map((equipe) => (
                            <div key={equipe.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-md transition-shadow">
                                {/* En-tête équipe */}
                                <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-slate-50 to-white dark:from-slate-800 dark:to-slate-800/50">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white text-lg">
                                                    {getSportIcon(equipe.sport?.name)}
                                                </div>
                                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                                                    {equipe.name}
                                                </h3>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                                                <span className="flex items-center gap-1">
                                                    <Trophy className="w-3.5 h-3.5" />
                                                    {equipe.sport?.name || 'Sport inconnu'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <UserCircle className="w-3.5 h-3.5" />
                                                    {equipe.coach?.name || 'Coach inconnu'}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {equipe.athletes?.length || 0} joueur(s)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => openEdit(equipe)}
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                                            >
                                                <Edit className="w-3.5 h-3.5" />
                                                Modifier
                                            </button>
                                            <Link
                                                href={`/admin/equipes/${equipe.id}`}
                                                method="delete"
                                                as="button"
                                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                                                onClick={(e) => { 
                                                    if (!confirm(`Supprimer l'équipe "${equipe.name}" ?`)) e.preventDefault(); 
                                                }}
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                                Supprimer
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {/* Ajouter un athlète */}
                                <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1">
                                            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">
                                                Ajouter un joueur
                                            </label>
                                            <select
                                                value={athleteData.athlete_id}
                                                onChange={(e) => setAthleteData('athlete_id', e.target.value)}
                                                className="w-full px-3 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors text-sm"
                                            >
                                                <option value="">Choisir un athlète...</option>
                                                {athletes.filter(a => !equipe.athletes?.some(ea => ea.id === a.id)).map(a => (
                                                    <option key={a.id} value={a.id}>
                                                        {a.name} - {a.level || 'N/A'}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button
                                            onClick={() => addAthlete(equipe.id)}
                                            disabled={!athleteData.athlete_id || processingAthlete}
                                            className="self-end px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                            Ajouter
                                        </button>
                                    </div>
                                </div>

                                {/* Joueurs de l'équipe */}
                                <div className="p-5">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Users className="w-4 h-4 text-yellow-500" />
                                        <h4 className="font-semibold text-slate-700 dark:text-slate-300">
                                            Effectif de l'équipe
                                        </h4>
                                        <span className="text-xs text-slate-400">
                                            ({equipe.athletes?.length || 0})
                                        </span>
                                    </div>
                                    
                                    {equipe.athletes && equipe.athletes.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {equipe.athletes.map((athlete) => (
                                                <div
                                                    key={athlete.id}
                                                    className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800"
                                                >
                                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                                                        {athlete.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="text-slate-700 dark:text-slate-300">
                                                        {athlete.name}
                                                    </span>
                                                    {athlete.level && (
                                                        <span className="text-xs text-slate-400 flex items-center gap-0.5">
                                                            <Medal className="w-3 h-3" />
                                                            {athlete.level}
                                                        </span>
                                                    )}
                                                    <Link
                                                        href={`/admin/equipes/${equipe.id}/remove-athlete/${athlete.id}`}
                                                        method="delete"
                                                        as="button"
                                                        className="ml-1 w-5 h-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 hover:text-red-700 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                                                        onClick={(e) => { 
                                                            if (!confirm(`Retirer ${athlete.name} de l'équipe ?`)) e.preventDefault(); 
                                                        }}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-slate-500 dark:text-slate-400">
                                            <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                                            <p className="text-sm">Aucun joueur dans cette équipe</p>
                                            <p className="text-xs">Ajoutez des athlètes pour former votre équipe</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                            <Building2 className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-xl font-medium text-slate-800 dark:text-white">Aucune équipe</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Commencez par créer votre première équipe.</p>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-yellow-400 text-slate-800 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Créer une équipe
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