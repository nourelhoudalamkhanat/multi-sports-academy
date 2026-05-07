import Header from '@/Components/Public/Header';
import Footer from '@/Components/Public/Footer';

export default function PublicLayout({ children }) {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Header />
            
            <main style={{ flexGrow: 1 }}>
                {children}
            </main>
            
            <Footer />
        </div>
    );
}