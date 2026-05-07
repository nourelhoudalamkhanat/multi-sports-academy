import { Link } from '@inertiajs/react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer style={{ backgroundColor: '#0F172A', color: '#FFFFFF' }}>
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Colonne 1 - Logo */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4" style={{ color: '#FBBF24' }}>
                            MSA
                        </h3>
                        <p style={{ color: '#6B7280' }}>
                            MultiSport Academy - Une solution moderne pour gérer votre académie.
                        </p>
                    </div>

                    {/* Colonne 2 - Liens rapides */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#FBBF24' }}>
                            Liens rapides
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="hover:text-yellow-400 transition-colors duration-300" style={{ color: '#6B7280' }}>
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link href="/programmes" className="hover:text-yellow-400 transition-colors duration-300" style={{ color: '#6B7280' }}>
                                    Programmes
                                </Link>
                            </li>
                            <li>
                                <Link href="/sports" className="hover:text-yellow-400 transition-colors duration-300" style={{ color: '#6B7280' }}>
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link href="/equipes" className="hover:text-yellow-400 transition-colors duration-300" style={{ color: '#6B7280' }}>
                                    Équipes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 3 - Contact */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#FBBF24' }}>
                            Contact
                        </h4>
                        <ul className="space-y-2" style={{ color: '#6B7280' }}>
                            <li>📧 contact@msa.ma</li>
                            <li>📱 +212 5XX-XXXXXX</li>
                            <li>📍 Casablanca, Maroc</li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Réseaux sociaux */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#FBBF24' }}>
                            Suivez-nous
                        </h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                📘
                            </a>
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                📷
                            </a>
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                ▶️
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-700 mt-8 pt-8 text-center" style={{ color: '#6B7280' }}>
                    <p>© {currentYear} MultiSport Academy. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
}