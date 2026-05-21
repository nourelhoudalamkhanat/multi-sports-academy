import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import {
  Settings,
  CheckCircle,
  User,
  Mail,
  Phone,
  Save,
  Lock,
  Key,
  AlertCircle,
  Shield,
  UserCircle,
} from 'lucide-react';

export default function Parametres({ admin }) {
    const { flash } = usePage().props;

    // Formulaire profil
    const { data: profil, setData: setProfil, put: putProfil, processing: processingProfil, errors: errorsProfil } = useForm({
        name: admin.name,
        email: admin.email,
        phone: admin.phone || '',
    });

    // Formulaire mot de passe
    const { data: password, setData: setPassword, put: putPassword, processing: processingPassword, errors: errorsPassword, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submitProfil = (e) => {
        e.preventDefault();
        putProfil('/admin/parametres/profil', { preserveState: false });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword('/admin/parametres/password', {
            preserveState: false,
            onSuccess: () => resetPassword(),
        });
    };

    return (
        <DashboardLayout>
            <Head title="Paramètres" />
            
            <div className="max-w-3xl mx-auto space-y-8">
                {/* En-tête */}
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-400 to-blue-600">
                            <Settings className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
                                Paramètres
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400">
                                Gérez votre profil administrateur
                            </p>
                        </div>
                    </div>
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

                {/* Formulaire Profil */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                        <div className="flex items-center gap-2">
                            <UserCircle className="w-5 h-5 text-yellow-500" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                Modifier le profil
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-7">
                            Mettez à jour vos informations personnelles
                        </p>
                    </div>
                    
                    <form onSubmit={submitProfil} className="p-5 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    Nom complet *
                                </div>
                            </label>
                            <input 
                                type="text" 
                                value={profil.name} 
                                onChange={(e) => setProfil('name', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                required 
                                placeholder="Votre nom"
                            />
                            {errorsProfil.name && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errorsProfil.name}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4" />
                                    Adresse email *
                                </div>
                            </label>
                            <input 
                                type="email" 
                                value={profil.email} 
                                onChange={(e) => setProfil('email', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                required 
                                placeholder="votre@email.com"
                            />
                            {errorsProfil.email && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errorsProfil.email}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4" />
                                    Téléphone
                                </div>
                            </label>
                            <input 
                                type="text" 
                                value={profil.phone} 
                                onChange={(e) => setProfil('phone', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                placeholder="+33 6 12 34 56 78"
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            disabled={processingProfil}
                            className="px-6 py-2.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processingProfil ? (
                                <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <Save className="w-4 h-4" />
                            )}
                            Sauvegarder les modifications
                        </button>
                    </form>
                </div>

                {/* Formulaire Mot de passe */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-5 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20">
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-yellow-500" />
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                                Changer le mot de passe
                            </h2>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-7">
                            Assurez-vous d'utiliser un mot de passe sécurisé
                        </p>
                    </div>
                    
                    <form onSubmit={submitPassword} className="p-5 space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Key className="w-4 h-4" />
                                    Mot de passe actuel *
                                </div>
                            </label>
                            <input 
                                type="password" 
                                value={password.current_password} 
                                onChange={(e) => setPassword('current_password', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                required 
                                placeholder="Votre mot de passe actuel"
                            />
                            {errorsPassword.current_password && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errorsPassword.current_password}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Nouveau mot de passe *
                                </div>
                            </label>
                            <input 
                                type="password" 
                                value={password.password} 
                                onChange={(e) => setPassword('password', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                required 
                                placeholder="Minimum 8 caractères"
                            />
                            {errorsPassword.password && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errorsPassword.password}
                                </p>
                            )}
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                <div className="flex items-center gap-2">
                                    <Lock className="w-4 h-4" />
                                    Confirmer le mot de passe *
                                </div>
                            </label>
                            <input 
                                type="password" 
                                value={password.password_confirmation} 
                                onChange={(e) => setPassword('password_confirmation', e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border-2 border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-white focus:border-yellow-400 focus:outline-none transition-colors" 
                                required 
                                placeholder="Répétez votre nouveau mot de passe"
                            />
                            {errorsPassword.password_confirmation && (
                                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    {errorsPassword.password_confirmation}
                                </p>
                            )}
                        </div>
                        
                        <div className="flex items-center gap-3 pt-2">
                            <button 
                                type="submit" 
                                disabled={processingPassword}
                                className="px-6 py-2.5 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-md flex items-center gap-2 bg-yellow-400 text-slate-800 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {processingPassword ? (
                                    <div className="w-4 h-4 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <Save className="w-4 h-4" />
                                )}
                                Changer le mot de passe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Information supplémentaire */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-yellow-50 to-blue-50 dark:from-yellow-900/20 dark:to-blue-900/20 border border-yellow-200 dark:border-yellow-800">
                    <div className="flex items-start gap-3">
                        <div className="p-1 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                            <Shield className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                🔒 Sécurité
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                Pour des raisons de sécurité, changez votre mot de passe régulièrement. 
                                N'utilisez pas le même mot de passe que sur d'autres sites.
                            </p>
                        </div>
                    </div>
                </div>
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