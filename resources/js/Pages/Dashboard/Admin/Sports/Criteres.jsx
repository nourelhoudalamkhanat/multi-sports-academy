import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import {
  List,
  Plus,
  CheckCircle,
  Edit,
  Trash2,
  ArrowLeft,
  Save,
  X,
  Trophy,
  ClipboardList,
  Check,
  AlertCircle,
} from 'lucide-react';

export default function Criteres({ sport, criteres = [] }) {
    const { flash } = usePage().props;
    const [editing, setEditing] = useState(null);

    const { data, setData, post, put, processing, reset } = useForm({
        nom: '',
    });

    const openEdit = (c) => { setData('nom', c.nom); setEditing(c); };
    const cancelEdit = () => { reset(); setEditing(null); };

    const submitAdd = (e) => {
        e.preventDefault();
        post(`/admin/sports/${sport.id}/criteres`, { 
            preserveState: false,
            onSuccess: () => reset()
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        put(`/admin/criteres/${editing.id}`, {
            preserveState: false,
            onSuccess: () => { reset(); setEditing(null); }
        });
    };

    return (
        <DashboardLayout>
            <Head title={`Critères - ${sport.name}`} />
            
            <div className="space-y-6">
                {/* En-tête avec retour */}
                <div>
                    <Link 
                        href="/admin/sports" 
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Retour aux sports
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-600">
                            <ClipboardList className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Critères d'évaluation
                            </h1>
                            <div className="flex items-center gap-2 mt-1">
                                <Trophy className="w-4 h-4 text-yellow-500" />
                                <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                                    {sport.name}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2 ml-12">
                        <List className="w-4 h-4" />
                        {criteres.length} critère{criteres.length > 1 ? 's' : ''} au total
                    </p>
                </div>

                {/* Message flash */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-5 h-5" />
                        {flash.success}
                    </div>
                )}

                {/* Formulaire d'ajout */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                        <div className="flex items-center gap-2">
                            <Plus className="w-5 h-5 text-yellow-500" />
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                                Ajouter un critère
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-7">
                            Définissez les critères d'évaluation pour ce sport
                        </p>
                    </div>
                    
                    <form onSubmit={submitAdd} className="p-5">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Nom du critère
                                </label>
                                <input 
                                    type="text" 
                                    value={data.nom} 
                                    onChange={(e) => setData('nom', e.target.value)}
                                    className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                    placeholder="Ex: Vitesse, Technique, Endurance, Précision..."
                                    required 
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={processing}
                                className="sm:self-end px-6 py-2.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processing ? (
                                    <div className="w-5 h-5 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Plus className="w-4 h-4" />
                                )}
                                Ajouter
                            </button>
                        </div>
                    </form>
                </div>

                {/* Liste des critères */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50">
                        <div className="flex items-center gap-2">
                            <List className="w-5 h-5 text-yellow-500" />
                            <h2 className="font-semibold text-slate-700 dark:text-slate-300">
                                Liste des critères
                            </h2>
                        </div>
                    </div>
                    
                    {criteres.length > 0 ? (
                        <div className="divide-y divide-slate-100 dark:divide-slate-700">
                            {criteres.map((c, index) => (
                                <div key={c.id} className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3 flex-1">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                                                {index + 1}
                                            </div>
                                            {editing?.id === c.id ? (
                                                <input 
                                                    type="text" 
                                                    value={data.nom} 
                                                    onChange={(e) => setData('nom', e.target.value)}
                                                    className="flex-1 px-3 py-2 rounded-lg border-2 border-yellow-400 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none"
                                                    autoFocus
                                                />
                                            ) : (
                                                <span className="font-medium text-slate-800 dark:text-white text-lg">
                                                    {c.nom}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-2">
                                            {editing?.id === c.id ? (
                                                <>
                                                    <button 
                                                        onClick={submitEdit}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200"
                                                    >
                                                        <Save className="w-3.5 h-3.5" />
                                                        Sauvegarder
                                                    </button>
                                                    <button 
                                                        onClick={cancelEdit}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                        Annuler
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button 
                                                        onClick={() => openEdit(c)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                        Modifier
                                                    </button>
                                                    <Link 
                                                        href={`/admin/criteres/${c.id}`} 
                                                        method="delete" 
                                                        as="button"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                                                        onClick={(e) => { 
                                                            if (!confirm(`Supprimer le critère "${c.nom}" ?`)) e.preventDefault(); 
                                                        }}
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                        Supprimer
                                                    </Link>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <div className="inline-flex p-4 rounded-full bg-slate-100 dark:bg-slate-700 mb-4">
                                <ClipboardList className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                            </div>
                            <p className="text-xl font-medium text-slate-800 dark:text-white">Aucun critère</p>
                            <p className="mt-2 text-slate-500 dark:text-slate-400">
                                Commencez par ajouter votre premier critère pour ce sport.
                            </p>
                            <div className="mt-4 text-sm text-slate-400 flex items-center justify-center gap-1">
                                <AlertCircle className="w-4 h-4" />
                                Exemples: Vitesse, Technique, Endurance
                            </div>
                        </div>
                    )}
                </div>

                {/* Petit conseil */}
                {criteres.length > 0 && (
                    <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-start gap-3">
                            <div className="p-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                                <Check className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    💡 Conseil
                                </p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                    Les critères définis ici seront utilisés pour évaluer les athlètes lors des séances d'entraînement.
                                    Vous pouvez en ajouter autant que nécessaire.
                                </p>
                            </div>
                        </div>
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