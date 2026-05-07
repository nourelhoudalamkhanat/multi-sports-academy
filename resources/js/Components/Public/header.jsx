import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50" style={{ backgroundColor: '#0F172A' }}>
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
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
                        <Link 
                            href="/" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Accueil
                        </Link>
                        <Link 
                            href="/programmes" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Programmes
                        </Link>
                        <Link 
                            href="/sports" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Sports
                        </Link>
                        <Link 
                            href="/equipes" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Équipes
                        </Link>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link 
                            href="/login" 
                            className="text-white hover:text-yellow-400 transition-colors duration-300"
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="px-4 py-2 rounded-lg font-medium transition-all duration-300"
                            style={{ 
                                backgroundColor: '#FBBF24', 
                                color: '#0F172A' 
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = '#F59E0B';
                                e.target.style.transform = 'scale(1.05)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = '#FBBF24';
                                e.target.style.transform = 'scale(1)';
                            }}
                        >
                            Sign Up
                        </Link>
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
                            <Link href="/" className="text-white hover:text-yellow-400 transition-colors duration-300">Accueil</Link>
                            <Link href="/programmes" className="text-white hover:text-yellow-400 transition-colors duration-300">Programmes</Link>
                            <Link href="/sports" className="text-white hover:text-yellow-400 transition-colors duration-300">Sports</Link>
                            <Link href="/equipes" className="text-white hover:text-yellow-400 transition-colors duration-300">Équipes</Link>
                            <div className="flex flex-col space-y-2 pt-3 border-t border-gray-600">
                                <Link href="/login" className="text-white hover:text-yellow-400 transition-colors duration-300">Login</Link>
                                <Link 
                                    href="/register" 
                                    className="px-4 py-2 rounded-lg font-medium text-center transition-all duration-300"
                                    style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}