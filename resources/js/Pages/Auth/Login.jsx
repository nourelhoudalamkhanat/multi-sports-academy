import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Connexion" />

            <div className="min-h-screen flex" style={{ backgroundColor: '#0F172A' }}>
                
                {/* ==========================================
                    PARTIE GAUCHE - Image/Décoration
                ========================================== */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                    {/* Image de fond sportive */}
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ 
                            backgroundImage: 'url(/images/hero-sports.jpg)',
                        }}
                    ></div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(29,78,216,0.7) 100%)' }}></div>
                    
                    {/* Contenu */}
                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <Link href="/" className="mb-16">
                            <h1 className="text-7xl font-black tracking-tighter" style={{ color: '#FBBF24' }}>
                                MSA
                            </h1>
                        </Link>
                        
                        <h2 className="text-5xl font-bold mb-6 leading-tight">
                            Prêt à repousser<br />vos <span style={{ color: '#FBBF24' }}>limites</span> ?
                        </h2>
                        
                        <p className="text-xl mb-12 leading-relaxed" style={{ color: '#94a3b8' }}>
                            Rejoignez l'académie qui transforme les passionnés en athlètes d'exception.
                        </p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8">
                            <div>
                                <div className="text-4xl font-black" style={{ color: '#FBBF24' }}>250+</div>
                                <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>Athlètes actifs</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black" style={{ color: '#FBBF24' }}>15+</div>
                                <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>Coachs experts</div>
                            </div>
                            <div>
                                <div className="text-4xl font-black" style={{ color: '#FBBF24' }}>4</div>
                                <div className="text-sm mt-1" style={{ color: '#94a3b8' }}>Disciplines</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    PARTIE DROITE - Formulaire
                ========================================== */}
                <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
                    <div className="w-full max-w-md">
                        
                        {/* Logo Mobile */}
                        <div className="lg:hidden text-center mb-10">
                            <Link href="/">
                                <h1 className="text-5xl font-black tracking-tighter" style={{ color: '#FBBF24' }}>MSA</h1>
                            </Link>
                        </div>

                        {/* En-tête */}
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-white mb-3">
                                Content de vous revoir !
                            </h2>
                            <p style={{ color: '#94a3b8' }} className="text-lg">
                                Connectez-vous pour accéder à votre espace
                            </p>
                        </div>

                        {/* Message de statut */}
                        {status && (
                            <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-3">
                                <span className="text-xl">✅</span>
                                {status}
                            </div>
                        )}

                        {/* Formulaire */}
                        <form onSubmit={submit} className="space-y-6">
                            
                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                    Adresse email
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: '#64748b' }}>
                                        📧
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-600 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                                        style={{ 
                                            backgroundColor: '#1e293b',
                                            borderColor: errors.email ? '#ef4444' : '#334155'
                                        }}
                                        placeholder="votre@email.com"
                                        autoComplete="username"
                                        required
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                        <span>⚠️</span> {errors.email}
                                    </p>
                                )}
                            </div>

                            {/* Mot de passe */}
                            <div>
                                <label className="block text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl" style={{ color: '#64748b' }}>
                                        🔒
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 text-white placeholder-gray-500 focus:border-yellow-400 focus:outline-none transition-all duration-300"
                                        style={{ 
                                            backgroundColor: '#1e293b',
                                            borderColor: errors.password ? '#ef4444' : '#334155'
                                        }}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        required
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-sm mt-2 flex items-center gap-2">
                                        <span>⚠️</span> {errors.password}
                                    </p>
                                )}
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-500 bg-gray-700 text-yellow-400 focus:ring-yellow-400 focus:ring-offset-0 cursor-pointer"
                                    />
                                    <span className="ml-3 text-sm" style={{ color: '#94a3b8' }}>
                                        Se souvenir de moi
                                    </span>
                                </label>

                                {canResetPassword && (
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm font-medium hover:underline transition-colors"
                                        style={{ color: '#FBBF24' }}
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                )}
                            </div>

                            {/* Bouton */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
                                style={{ 
                                    backgroundColor: '#FBBF24', 
                                    color: '#0F172A',
                                    boxShadow: '0 10px 30px rgba(251,191,36,0.3)'
                                }}
                            >
                                {processing ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        Connexion...
                                    </>
                                ) : (
                                    <>
                                        Se connecter
                                    </>
                                )}
                            </button>

                            {/* Séparateur */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t" style={{ borderColor: '#334155' }}></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4" style={{ backgroundColor: '#0F172A', color: '#64748b' }}>
                                        ou
                                    </span>
                                </div>
                            </div>

                            {/* Lien Inscription */}
                            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: '#1e293b', border: '1px solid #334155' }}>
                                <p className="text-white font-medium mb-2">
                                    Nouveau sur MSA ?
                                </p>
                                <Link
                                    href="/register"
                                    className="inline-flex items-center gap-2 font-bold text-lg hover:underline transition-all duration-300"
                                    style={{ color: '#FBBF24' }}
                                >
                                    Créer un compte gratuit
                                    <span className="text-xl">✨</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}