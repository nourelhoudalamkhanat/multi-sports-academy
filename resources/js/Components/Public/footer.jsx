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
                           MultiSport Academy — Un lieu pour grandir, s’entraîner et dépasser ses limites.</p>
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
                            <li>
                                <img src="/images/email.png" alt="Email" className="w-5 h-5 inline mr-2" />
                                multi_sport@msa.ma
                            </li>
                            <li>
                                <img src="/images/phone.png" alt="Phone" className="w-5 h-5 inline mr-2" />
                                +212 50 123 4567
                            </li>
                            <li>
                                <img src="/images/location.png" alt="Location" className="w-5 h-5 inline mr-2" />
                                Casablanca, Maroc
                            </li>
                        </ul>
                    </div>

                    {/* Colonne 4 - Réseaux sociaux */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4" style={{ color: '#FBBF24' }}>
                            Suivez-nous
                        </h4>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                <img src="/images/facebook.png" alt="Facebook" className="w-8 h-8" />
                            </a>
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                <img src="/images/instagram.png" alt="Instagram" className="w-8 h-8" />
                            </a>
                            <a href="#" className="hover:text-yellow-400 transition-colors duration-300 text-2xl" style={{ color: '#6B7280' }}>
                                <img src="/images/linkedin.png" alt="LinkedIn" className="w-8 h-8" />
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