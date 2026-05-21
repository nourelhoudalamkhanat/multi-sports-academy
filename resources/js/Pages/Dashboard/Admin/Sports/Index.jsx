import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';
import {
  Trophy,
  Plus,
  CheckCircle,
  Edit,
  Trash2,
  Image as ImageIcon,
  X,
  Save,
  FileText,
  Users,
  Upload,
  Eye,
  List,
  Calendar,
} from 'lucide-react';

export default function SportsIndex({ sports = [] }) {
    const { flash } = usePage().props;
    const [editing, setEditing] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [uploading, setUploading] = useState(false);

    const { data, setData, post, put, processing, reset } = useForm({
        name: '', description: '', image: '',
    });

    const openCreate = () => { reset(); setShowCreate(true); setEditing(null); };
    const openEdit = (sport) => { 
        setData({ name: sport.name, description: sport.description || '', image: sport.image || '' }); 
        setEditing(sport); setShowCreate(false); 
    };
    const closeForm = () => { setShowCreate(false); setEditing(null); reset(); };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        
        try {
            const res = await axios.post('/admin/sports/upload-image', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setData('image', res.data.path);
        } catch (err) {
            alert('Erreur upload image');
        }
        setUploading(false);
    };

    const submit = (e) => {
        e.preventDefault();
        if (editing) {
            put(`/admin/sports/${editing.id}`, { 
                preserveState: false,
                onSuccess: () => closeForm()
            });
        } else {
            post('/admin/sports', { 
                preserveState: false,
                onSuccess: () => closeForm()
            });
        }
    };

    return (
        <DashboardLayout>
            <Head title="Gestion des Sports" />
            
            <div className="space-y-6">
                {/* En-tête */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Gestion des Sports
                            </h1>
                        </div>
                        <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            {sports.length} sport{sports.length > 1 ? 's' : ''} au total
                        </p>
                    </div>
                    <button 
                        onClick={openCreate}
                        className="px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        Ajouter un sport
                    </button>
                </div>

                {/* Message flash */}
                {flash?.success && (
                    <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 flex items-center gap-2 animate-fadeIn">
                        <CheckCircle className="w-5 h-5" />
                        {flash.success}
                    </div>
                )}

                {/* Formulaire Création/Modification */}
                {(showCreate || editing) && (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {editing ? (
                                        <>
                                            <Edit className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Modifier le sport
                                            </h2>
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-5 h-5 text-yellow-500" />
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                                Créer un nouveau sport
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

                        <form onSubmit={submit} className="p-6 space-y-5">
                            {/* Nom du sport */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Nom du sport *
                                </label>
                                <input 
                                    type="text" 
                                    value={data.name} 
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                    required 
                                    placeholder="Ex: Football, Basketball, Tennis..."
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Description
                                </label>
                                <textarea 
                                    value={data.description} 
                                    onChange={(e) => setData('description', e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                    rows="3"
                                    placeholder="Description du sport, règles, particularités..."
                                />
                            </div>

                            {/* Image */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                    Image
                                </label>
                                <div className="flex items-center gap-4">
                                    <label className="flex-1">
                                        <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-yellow-400 transition-colors">
                                            <Upload className="w-5 h-5 text-slate-500" />
                                            <span className="text-sm text-slate-600 dark:text-slate-400">
                                                {uploading ? 'Upload en cours...' : 'Choisir une image'}
                                            </span>
                                        </div>
                                        <input 
                                            type="file" 
                                            accept="image/*" 
                                            onChange={handleImageUpload}
                                            className="hidden" 
                                            disabled={uploading}
                                        />
                                    </label>
                                    {data.image && (
                                        <div className="relative">
                                            <img 
                                                src={data.image} 
                                                alt="Aperçu" 
                                                className="w-16 h-16 rounded-lg object-cover shadow-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setData('image', '')}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                                {uploading && (
                                    <p className="text-sm text-yellow-600 mt-2 flex items-center gap-1">
                                        <Upload className="w-3 h-3 animate-pulse" />
                                        Téléchargement en cours...
                                    </p>
                                )}
                            </div>

                            {/* Boutons */}
                            <div className="flex gap-3 pt-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className="px-6 py-2.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {processing ? (
                                        <>...</>
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
                                    className="px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400"
                                >
                                    Annuler
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Liste des sports */}
                {sports.length > 0 ? (
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50 dark:bg-slate-700/50">
                                    <tr>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Image</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Sport</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Description</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Équipes</th>
                                        <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-300">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sports.map((sport) => (
                                        <tr key={sport.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                                            <td className="p-4">
                                                {sport.image ? (
                                                    <div className="relative">
                                                        <img 
                                                            src={sport.image} 
                                                            alt={sport.name} 
                                                            className="w-12 h-12 rounded-lg object-cover shadow-sm"
                                                        />
                                                        <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                            <Eye className="w-4 h-4 text-white" />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                                                        <ImageIcon className="w-6 h-6 text-slate-400" />
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                <div>
                                                    <p className="font-medium text-slate-800 dark:text-white">{sport.name}</p>
                                                    {sport.created_at && (
                                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                                            <Calendar className="w-3 h-3" />
                                                            Ajouté récemment
                                                        </p>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="max-w-xs">
                                                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                                                        {sport.description || '-'}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                                    <Users className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                                                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                                                        {sport.equipes_count || 0}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/sports/${sport.id}/criteres`}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200"
                                                        title="Gérer les critères d'évaluation"
                                                    >
                                                        <List className="w-3.5 h-3.5" />
                                                        Critères
                                                    </Link>
                                                    <button 
                                                        onClick={() => openEdit(sport)}
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-200"
                                                    >
                                                        <Edit className="w-3.5 h-3.5" />
                                                        Modifier
                                                    </button>
                                                    <Link 
                                                        href={`/admin/sports/${sport.id}`} 
                                                        method="delete" 
                                                        as="button"
                                                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200"
                                                        onClick={(e) => { 
                                                            if (!confirm(`Supprimer ${sport.name} ?`)) e.preventDefault(); 
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
                            <Trophy className="w-12 h-12 text-slate-400 dark:text-slate-500" />
                        </div>
                        <p className="text-xl font-medium text-slate-800 dark:text-white">Aucun sport</p>
                        <p className="mt-2 text-slate-500 dark:text-slate-400">Commencez par ajouter votre premier sport.</p>
                        <button
                            onClick={openCreate}
                            className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg bg-yellow-400 text-slate-800 shadow-md"
                        >
                            <Plus className="w-5 h-5" />
                            Ajouter un sport
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
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </DashboardLayout>
    );
}