import PublicLayout from '@/Layouts/PublicLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Home() {
    const [formData, setFormData] = useState({
        nom: '',
        email: '',
        age: '',
        sport: '',
        message: ''
    });

    const sports = [
        { id: 1, name: 'Football', description: 'Programme complet de football pour tous les niveaux', image: '/images/sport-football.jpg' },
        { id: 2, name: 'Basketball', description: 'Entraînement intensif de basketball', image: '/images/sport-basketball.jpg' },
        { id: 3, name: 'Volleyball', description: 'Techniques avancées de volleyball', image: '/images/sport-volleyball.jpg' },
        { id: 4, name: 'Handball', description: 'Formation complète en handball', image: '/images/sport-handball.avif' },
    ];

    const stats = [
        { label: 'Membres', value: 250, icon: '👥' },
        { label: 'Coachs', value: 15, icon: '👨‍🏫' },
        { label: 'Sports', value: 4, icon: '🏅' },
        { label: 'Séances/Semaine', value: 40, icon: '📅' },
    ];

    const equipes = [
        { nom: 'Équipe A - Football', coach: 'Coach Ahmed', joueurs: 22, sport: 'Football' },
        { nom: 'Équipe B - Basketball', coach: 'Coach Sara', joueurs: 15, sport: 'Basketball' },
        { nom: 'Équipe C - Volleyball', coach: 'Coach Youssef', joueurs: 18, sport: 'Volleyball' },
    ];

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
                        {/* Partie Gauche */}
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

                        {/* Partie Droite - Glassmorphism Card */}
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
                                    <span style={{ color: '#FBBF24' }}>✓</span> Esprit d’équipe et compétitio
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
                            { icon: '👥', title: 'Gestion des joueurs', desc: 'Ajoutez, modifiez et suivez les profils des joueurs' },
                            { icon: '👨‍🏫', title: 'Gestion des coachs', desc: 'Gérez les coachs et leurs spécialités' },
                            { icon: '📅', title: 'Planification', desc: 'Organisez les séances d\'entraînement facilement' },
                            { icon: '🏅', title: 'Multisports', desc: 'Support pour football, basketball, volleyball et plus' },
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                className="p-6 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-2 bg-white"
                                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                            >
                                <div className="text-4xl mb-4">{feature.icon}</div>
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
                SECTION 3 - SPORTS 
            ========================================== */}
            <section id="sports" className="py-20" style={{ backgroundColor: '#F9FAFB' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
                        Nos Sports
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {sports.map((sport) => (
                            <div 
                                key={sport.id}
                                className="rounded-xl overflow-hidden shadow-lg bg-white transition-all duration-300 hover:scale-105 cursor-pointer group"
                            >
                              <div className="h-48 relative overflow-hidden">
                                     <img src={sport.image}
                                        alt={sport.name}
                                                 className="absolute inset-0 w-full h-full object-cover"/>

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
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 4 - STATISTIQUES
            ========================================== */}
            <section id="statistiques" className="py-20" style={{ background: 'linear-gradient(135deg, #1D4ED8, #0F172A)' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-white">
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-5xl font-bold mb-2" style={{ color: '#FBBF24' }}>
                                    {stat.value}+
                                </div>
                                <div className="text-lg" style={{ color: '#6B7280' }}>
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==========================================
                SECTION 5 - ÉQUIPES
            ========================================== */}
            <section id="equipes" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#0F172A' }}>
                        Nos Équipes
                    </h2>
                    <div className="overflow-x-auto rounded-xl shadow-lg">
                        <table className="w-full">
                            <thead style={{ backgroundColor: '#0F172A', color: '#FBBF24' }}>
                                <tr>
                                    <th className="p-4 text-left">Équipe</th>
                                    <th className="p-4 text-left">Coach</th>
                                    <th className="p-4 text-left">Joueurs</th>
                                    <th className="p-4 text-left">Sport</th>
                                    <th className="p-4 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ color: '#6B7280' }}>
                                {equipes.map((equipe, index) => (
                                    <tr 
                                        key={index} 
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
                                        <td className="p-4">
                                            <button className="px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                                                style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                            >
                                                Voir détails
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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
                        <form className="space-y-6">
                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>
                                    Nom complet
                                </label>
                                <input 
                                    type="text"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="Votre nom"
                                    style={{ color: '#0F172A' }}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>
                                    Email
                                </label>
                                <input 
                                    type="email"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="votre@email.com"
                                    style={{ color: '#0F172A' }}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>
                                    Âge
                                </label>
                                <input 
                                    type="number"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="Votre âge"
                                    style={{ color: '#0F172A' }}
                                />
                            </div>

                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>
                                    Sport
                                </label>
                                <select 
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    style={{ color: '#0F172A' }}
                                >
                                    <option value="">Choisir un sport</option>
                                    <option value="football">Football</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="volleyball">Volleyball</option>
                                    <option value="handball">Handball</option>
                                </select>
                            </div>

                            <div>
                                <label className="block mb-2 font-medium" style={{ color: '#0F172A' }}>
                                    Message
                                </label>
                                <textarea 
                                    rows="4"
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-300"
                                    placeholder="Votre message..."
                                    style={{ color: '#0F172A' }}
                                ></textarea>
                            </div>

                            <button 
                                type="submit"
                                className="w-full px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105"
                                style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                            >
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </PublicLayout>
    );
}