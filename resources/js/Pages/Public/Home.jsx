import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function Home({ sports = [], equipes = [], stats = {} }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: 'athlete',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PublicLayout>
            <Head title="MSA - Académie Multisports" />

            {/* ==========================================
                SECTION 1 - HERO
            ========================================== */}
            <section className="relative min-h-screen flex items-center" 
                style={{ 
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(/images/hero-sports.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }}
            >
                <div className="max-w-7xl mx-auto px-4 py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-white">
                                MSA - <span style={{ color: '#FBBF24' }}>Académie Multisports</span>
                            </h1>
                            <p className="text-xl mb-8" style={{ color: '#6B7280' }}>
                                Une solution moderne pour gérer efficacement les coachs, les joueurs, les sports et les séances d'entraînement.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                    className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 text-center"
                                    style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                >
                                    Commencer
                                </button>
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('sports')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                                    className="px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 text-center border-2"
                                    style={{ borderColor: '#FBBF24', color: '#FBBF24' }}
                                >
                                    En savoir plus
                                </button>
                            </div>
                        </div>

                        <div className="p-8 rounded-2xl backdrop-blur-lg" 
                            style={{ 
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
                            }}
                        >
                            <h2 className="text-2xl font-bold mb-6 text-white">
                                Pourquoi choisir cette plateforme ?
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3" style={{ color: '#6B7280' }}>
                                    <span style={{ color: '#FBBF24' }}>✓</span> Coaching structuré et motivant
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#6B7280' }}>
                                    <span style={{ color: '#FBBF24' }}>✓</span> Analyse et suivi de progression
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#6B7280' }}>
                                    <span style={{ color: '#FBBF24' }}>✓</span> Développement physique et mental
                                </li>
                                <li className="flex items-center gap-3" style={{ color: '#6B7280' }}>
                                    <span style={{ color: '#FBBF24' }}>✓</span> Esprit d'équipe et compétition
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 2 - FONCTIONNALITÉS
            ========================================== */}
            <section id="programmes" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
                        Nos fonctionnalités
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: '/images/silouhette.png', title: 'Gestion des joueurs', desc: 'Ajoutez, modifiez et suivez les profils des joueurs' },
                            { icon: '/images/person.png', title: 'Gestion des coachs', desc: 'Gérez les coachs et leurs spécialités' },
                            { icon: '/images/calendar.png', title: 'Planification', desc: 'Organisez les séances d\'entraînement facilement' },
                            { icon: '/images/trophy.png', title: 'Multisports', desc: 'Support pour football, basketball, volleyball et plus' },
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white"
                                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            >
                                <div className="mb-4">
                                    <img src={feature.icon} alt={feature.title} className="w-16 h-16 object-contain" />
                                </div>
                                <h3 className="text-xl font-bold mb-3" style={{ color: '#0F172A' }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#6B7280' }}>
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 3 - SPORTS (DYNAMIQUE)
            ========================================== */}
            <section id="sports" className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
                        Nos Sports
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sports.length > 0 ? sports.map((sport) => (
                            <div 
                                key={sport.id}
                                className="rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:scale-105 cursor-pointer group"
                            >
                                <div className="h-48 relative overflow-hidden">
                                    <img 
                                        src={sport.image || '/images/default-sport.jpg'}
                                        alt={sport.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => { e.target.src = '/images/default-sport.jpg'; }}
                                    />
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                                
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2" style={{ color: '#0F172A' }}>
                                        {sport.name}
                                    </h3>
                                    <p style={{ color: '#6B7280' }}>
                                        {sport.description}
                                    </p>
                                </div>
                            </div>
                        )) : (
                            <div className="col-span-4 text-center py-10" style={{ color: '#6B7280' }}>
                                Aucun sport pour le moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 4 - STATISTIQUES (DYNAMIQUE)
            ========================================== */}
            <section id="statistiques" className="py-20" style={{ background: 'linear-gradient(135deg, #1D4ED8, #0F172A)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="text-white">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <img src="/images/woman.png" alt="Membres" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>
                                {stats.membres || 0}+
                            </div>
                            <div className="text-lg" style={{ color: '#6B7280' }}>Membres</div>
                        </div>
                        <div className="text-white">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <img src="/images/person.png" alt="Coachs" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>
                                {stats.coachs || 0}+
                            </div>
                            <div className="text-lg" style={{ color: '#6B7280' }}>Coachs</div>
                        </div>
                        <div className="text-white">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <img src="/images/trophy.png" alt="Sports" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>
                                {stats.sports || 0}
                            </div>
                            <div className="text-lg" style={{ color: '#6B7280' }}>Sports</div>
                        </div>
                        <div className="text-white">
                            <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <img src="/images/calendar.png" alt="Séances" className="w-10 h-10 object-contain" />
                            </div>
                            <div className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>
                                {stats.seances || 0}+
                            </div>
                            <div className="text-lg" style={{ color: '#6B7280' }}>Séances/Semaine</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==========================================
    SECTION 5 - ÉQUIPES (DYNAMIQUE)
========================================== */}
<section id="equipes" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
            Nos Équipes
        </h2>
        {equipes.length > 0 ? (
            <div className="overflow-x-auto rounded-xl shadow-lg">
                <table className="w-full">
                    <thead style={{ backgroundColor: '#0F172A', color: '#FBBF24' }}>
                        <tr>
                            <th className="p-4 text-left">Équipe</th>
                            <th className="p-4 text-left">Coach</th>
                            <th className="p-4 text-left">Joueurs</th>
                            <th className="p-4 text-left">Sport</th>
                        </tr>
                    </thead>
                    <tbody style={{ color: '#6B7280' }}>
                        {equipes.map((equipe) => (
                            <tr 
                                key={equipe.id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="p-4 font-medium" style={{ color: '#0F172A' }}>
                                    {equipe.nom}
                                </td>
                                <td className="p-4">{equipe.coach}</td>
                                <td className="p-4">{equipe.joueurs}</td>
                                <td className="p-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium"
                                        style={{ backgroundColor: '#1D4ED8', color: '#FFFFFF' }}
                                    >
                                        {equipe.sport}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <p className="text-center py-10" style={{ color: '#6B7280' }}>
                Aucune équipe pour le moment.
            </p>
        )}
    </div>
</section>

            {/* ==========================================
                SECTION 6 - INSCRIPTION
            ========================================== */}
            <section id="inscription" className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="max-w-2xl mx-auto px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#0F172A' }}>
                            Inscrivez-vous maintenant
                        </h2>
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>Nom complet</label>
                                <input 
                                    type="text" name="name" value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="Votre nom complet" style={{ color: '#0F172A' }} required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>Email</label>
                                <input 
                                    type="email" name="email" value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="votre@email.com" style={{ color: '#0F172A' }} required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>Vous êtes ?</label>
                                <select name="role" value={data.role} onChange={(e) => setData('role', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    style={{ color: '#0F172A' }}>
                                    <option value="athlete">🏃 Athlète / Joueur</option>
                                    <option value="coach">👨‍🏫 Coach</option>
                                </select>
                                <InputError message={errors.role} className="mt-2" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>Mot de passe</label>
                                <input 
                                    type="password" name="password" value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="••••••••" style={{ color: '#0F172A' }} required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>Confirmer le mot de passe</label>
                                <input 
                                    type="password" name="password_confirmation" value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="••••••••" style={{ color: '#0F172A' }} required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <Link href="/login" className="text-sm hover:underline" style={{ color: '#1D4ED8' }}>
                                    Déjà inscrit ?
                                </Link>
                                <button 
                                    type="submit"
                                    className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105"
                                    style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                    disabled={processing}
                                >
                                    {processing ? 'Inscription...' : "S'inscrire"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}