import PublicLayout from '@/Layouts/PublicLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <PublicLayout>
            <Head title="Accueil" />
            
            {/* Hero Section */}
            <div style={{
                background: 'linear-gradient(to right, #2563eb, #7c3aed)',
                color: 'white',
                padding: '80px 20px',
                textAlign: 'center'
            }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
                    🏃‍♂️ Bienvenue à l'Académie Multisport
                </h1>
                <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: '0.95' }}>
                    Développez votre passion pour le sport avec nos coachs experts
                </p>
                <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                    <a 
                        href="/sports" 
                        style={{
                            background: 'white',
                            color: '#2563eb',
                            padding: '12px 30px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        Découvrir les sports
                    </a>
                    <a 
                        href="/inscription" 
                        style={{
                            background: '#059669',
                            color: 'white',
                            padding: '12px 30px',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 'bold'
                        }}
                    >
                        S'inscrire
                    </a>
                </div>
            </div>

            {/* Section Sports */}
            <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ textAlign: 'center', fontSize: '2rem', marginBottom: '40px' }}>
                    Nos Sports
                </h2>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(3, 1fr)', 
                    gap: '30px' 
                }}>
                    {/* Carte Football */}
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>⚽</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Football</h3>
                        <p style={{ color: '#666' }}>À partir de 200 DH/mois</p>
                    </div>

                    {/* Carte Basketball */}
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏀</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Basketball</h3>
                        <p style={{ color: '#666' }}>À partir de 200 DH/mois</p>
                    </div>

                    {/* Carte Natation */}
                    <div style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        textAlign: 'center'
                    }}>
                        <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏊</div>
                        <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Natation</h3>
                        <p style={{ color: '#666' }}>À partir de 250 DH/mois</p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}