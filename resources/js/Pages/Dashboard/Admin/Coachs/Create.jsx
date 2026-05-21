import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CoachCreate({ sports = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        speciality: '',
        experience: '',
        bio: '',
        certification: '',
        phone: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/coachs');
    };

    return (
        <DashboardLayout>
            <Head title="Ajouter un coach" />

            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin/coachs" className="text-sm hover:underline" style={{ color: '#1D4ED8' }}>
                        ← Retour à la liste
                    </Link>
                    <h1 className="text-3xl font-bold mt-2" style={{ color: '#0F172A' }}>➕ Ajouter un coach</h1>
                </div>

                <form onSubmit={submit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
                    {/* Nom */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Nom complet *</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" required />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Email *</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" required />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Mot de passe */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Mot de passe *</label>
                        <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" required />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Spécialité */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Spécialité</label>
                        <select value={data.speciality} onChange={(e) => setData('speciality', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none">
                            <option value="">Choisir...</option>
                            {sports.map(sport => (
                                <option key={sport.id} value={sport.name}>{sport.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Expérience + Téléphone */}
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Expérience (années)</label>
                            <input type="number" value={data.experience} onChange={(e) => setData('experience', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Téléphone</label>
                            <input type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                        </div>
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Bio</label>
                        <textarea rows="3" value={data.bio} onChange={(e) => setData('bio', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                    </div>

                    {/* Certification */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Certification</label>
                        <input type="text" value={data.certification} onChange={(e) => setData('certification', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                    </div>

                    {/* Boutons */}
                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link href="/admin/coachs" className="px-6 py-3 rounded-lg text-sm font-medium" style={{ color: '#6B7280' }}>
                            Annuler
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                            style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}>
                            {processing ? 'Création...' : 'Créer le coach'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}