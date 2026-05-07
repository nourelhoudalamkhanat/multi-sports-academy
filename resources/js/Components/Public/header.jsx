import { useState } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Fonction pour le scroll smooth
    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMenuOpen(false); // Fermer le menu mobile
    };

    return (
        <header className="sticky top-0 z-50" style={{ backgroundColor: '#0F172A' }}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <ApplicationLogo className="h-10 w-10" />
                        <Link 
                            href="/" 
                            className="text-2xl font-bold"
                            style={{ color: '#FBBF24' }}
                        >
                            MSA
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Accueil
                        </button>
                        <button 
                            onClick={() => scrollToSection('programmes')}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Programmes
                        </button>
                        <button 
                            onClick={() => scrollToSection('sports')}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Sports
                        </button>
                        <button 
                            onClick={() => scrollToSection('statistiques')}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Statistiques
                        </button>
                        <button 
                            onClick={() => scrollToSection('equipes')}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Équipes
                        </button>
                        {/*<button 
                            onClick={() => scrollToSection('inscription')}
                            className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer"
                        >
                            Inscription
                        </button>*/}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <button
                            type="button"
                            onClick={() => scrollToSection('inscription')}
                            className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                            style={{ 
                                backgroundColor: '#FBBF24', 
                                color: '#0F172A' 
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#F59E0B';
                                e.currentTarget.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#FBBF24';
                                e.currentTarget.style.transform = 'scale(1)';
                            }}
                        >
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-white hover:text-yellow-400"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4">
                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setIsMenuOpen(false); }}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Accueil
                            </button>
                            <button 
                                onClick={() => scrollToSection('programmes')}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Programmes
                            </button>
                            <button 
                                onClick={() => scrollToSection('sports')}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Sports
                            </button>
                            <button 
                                onClick={() => scrollToSection('statistiques')}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Statistiques
                            </button>
                            <button 
                                onClick={() => scrollToSection('equipes')}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Équipes
                            </button>
                            <button 
                                onClick={() => scrollToSection('inscription')}
                                className="text-white hover:text-yellow-400 transition-colors duration-300 bg-transparent border-none cursor-pointer text-left"
                            >
                                Inscription
                            </button>
                            <div className="flex flex-col space-y-2 pt-3 border-t border-gray-600">
                                <Link href="/login" className="text-white hover:text-yellow-400 transition-colors duration-300">Login</Link>
                                <button
                                    type="button"
                                    onClick={() => scrollToSection('inscription')}
                                    className="px-4 py-2 rounded-lg font-medium text-center transition-all duration-300"
                                    style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                >
                                    Sign Up
                                </button>
                                
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}