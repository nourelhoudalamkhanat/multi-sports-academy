import { Link } from '@inertiajs/react';  // ← AJOUTER CET IMPORT !

export default function Footer() {
    return (
        <footer style={{
            background: '#1f2937',
            color: 'white',
            padding: '20px',
            textAlign: 'center'
        }}>
            <p>© 2026 Académie Multisport - Tous droits réservés</p>
            <div style={{ marginTop: '10px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <Link href="/sports" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                    Sports
                </Link>
                <Link href="/tarifs" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                    Tarifs
                </Link>
                <Link href="/contact" style={{ color: '#9ca3af', textDecoration: 'none' }}>
                    Contact
                </Link>
            </div>
        </footer>
    );
}