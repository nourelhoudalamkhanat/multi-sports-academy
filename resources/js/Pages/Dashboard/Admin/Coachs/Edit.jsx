import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function CoachEdit({ coach, sports = [] }) {
    const { data, setData, put, processing, errors } = useForm({
        name: coach.name,
        email: coach.email,
        password: '',
        speciality: coach.speciality || '',
        experience: coach.experience || '',
        bio: coach.bio || '',
        certification: coach.certification || '',
        phone: coach.phone || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/coachs/${coach.id}`);
    };

    return (
        <DashboardLayout>
            <Head title={`Modifier ${coach.name}`} />

            <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                    <Link href="/admin/coachs" className="text-sm hover:underline" style={{ color: '#1D4ED8' }}>
                        ← Retour à la liste
                    </Link>
                    <h1 className="text-3xl font-bold mt-2" style={{ color: '#0F172A' }}>✏️ Modifier {coach.name}</h1>
                </div>

                <form onSubmit={submit} className="bg-white rounded-xl shadow-sm p-8 space-y-6">
                    {/* Mêmes champs que Create mais avec put et valeurs pré-remplies */}
                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Nom complet *</label>
                        <input type="text" value={data.name} onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" required />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Email *</label>
                        <input type="email" value={data.email} onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" required />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>
                            Mot de passe <span className="text-gray-400">(laisser vide pour ne pas changer)</span>
                        </label>
                        <input type="password" value={data.password} onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

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

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Bio</label>
                        <textarea rows="3" value={data.bio} onChange={(e) => setData('bio', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: '#0F172A' }}>Certification</label>
                        <input type="text" value={data.certification} onChange={(e) => setData('certification', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-4">
                        <Link href="/admin/coachs" className="px-6 py-3 rounded-lg text-sm font-medium" style={{ color: '#6B7280' }}>
                            Annuler
                        </Link>
                        <button type="submit" disabled={processing}
                            className="px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 disabled:opacity-50"
                            style={{ backgroundColor: '#FBBF24', color: '#0F172A' }}>
                            {processing ? 'Mise à jour...' : 'Sauvegarder'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}