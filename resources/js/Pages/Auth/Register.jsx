import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'athlete', // ← AJOUTÉ
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Inscription" />

            <div className="min-h-screen flex items-center justify-center py-12 px-4" 
                style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1D4ED8 100%)' }}>
                
                <div className="w-full max-w-md mx-auto">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <Link href="/">
                            <h1 className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>MSA</h1>
                        </Link>
                        <h2 className="text-2xl font-bold text-white">Inscription</h2>
                        <p className="text-sm mt-1" style={{ color: '#6B7280' }}>Créez votre compte MSA Academy</p>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8">
                        <form onSubmit={submit} className="space-y-5">
                            {/* Nom */}
                            <div>
                                <InputLabel htmlFor="name" value="Nom complet" style={{ color: '#0F172A' }} />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="Votre nom complet"
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            {/* Email */}
                            <div>
                                <InputLabel htmlFor="email" value="Email" style={{ color: '#0F172A' }} />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="votre@email.com"
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            {/* Rôle - AJOUTÉ */}
                            <div>
                                <InputLabel htmlFor="role" value="Vous êtes ?" style={{ color: '#0F172A' }} />
                                <select
                                    id="role"
                                    name="role"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    style={{ color: '#0F172A', padding: '8px 12px' }}
                                >
                                    <option value="athlete">🏃 Athlète / Joueur</option>
                                    <option value="coach">👨‍🏫 Coach</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>

                            {/* Mot de passe */}
                            <div>
                                <InputLabel htmlFor="password" value="Mot de passe" style={{ color: '#0F172A' }} />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            {/* Confirmation mot de passe */}
                            <div>
                                <InputLabel htmlFor="password_confirmation" value="Confirmer le mot de passe" style={{ color: '#0F172A' }} />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    placeholder="••••••••"
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>

                            {/* Boutons */}
                            <div className="flex items-center justify-between pt-2">
                                <Link
                                    href={route('login')}
                                    className="text-sm hover:underline"
                                    style={{ color: '#1D4ED8' }}
                                >
                                    Déjà inscrit ?
                                </Link>

                                <PrimaryButton 
                                    className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                    disabled={processing}
                                >
                                    {processing ? 'Inscription...' : "S'inscrire"}
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}