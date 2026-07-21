// resources/js/Pages/Admin/Settings/Index.jsx
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Phone, Mail, MapPin, Share2, CheckCircle2, Sliders } from 'lucide-react';

export default function Index({ settings = {} }) {
    const { data, setData, post, processing, wasSuccessful } = useForm({
        company_phone: settings.company_phone || '',
        company_email: settings.company_email || '',
        company_address: settings.company_address || '',
        facebook_url: settings.facebook_url || '',
        twitter_url: settings.twitter_url || '',
        linkedin_url: settings.linkedin_url || '',
        instagram_url: settings.instagram_url || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/settings', { preserveScroll: true });
    };

    return (
        <>
            <Head title="Settings | Admin Workspace" />

            {/* ترويسة الصفحة */}
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-1">
                    <div className="p-1.5 bg-gold/10 rounded-lg">
                        <Sliders size={18} className="text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl font-bold text-charcoal-dark tracking-tight">
                        System Settings
                    </h2>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    Configure your core website properties, contact details, and social media links.
                </p>
            </div>

            {/* تنبيه النجاح */}
            {wasSuccessful && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-2xl flex items-center gap-3 text-sm font-medium max-w-3xl shadow-sm"
                >
                    <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" strokeWidth={2.5} />
                    <span>Settings updated successfully. Changes are now live globally.</span>
                </motion.div>
            )}

            {/* لوحة النموذج الرئيسية */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm max-w-3xl overflow-hidden">
                <form onSubmit={handleSubmit} className="divide-y divide-gray-100">
                    
                    {/* القسم الأول: معلومات التواصل */}
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
                            <Phone size={16} className="text-gold" />
                            <h3 className="text-sm font-bold text-charcoal-dark">
                                Contact Information
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">Phone Number</label>
                                <input 
                                    type="text" 
                                    value={data.company_phone} 
                                    onChange={(e) => setData('company_phone', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="+966 50 000 0000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">Email Address</label>
                                <input 
                                    type="email" 
                                    value={data.company_email} 
                                    onChange={(e) => setData('company_email', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="info@enterprise.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-charcoal-dark mb-2">Headquarters Address</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={data.company_address} 
                                    onChange={(e) => setData('company_address', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 pl-10 pr-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="Riyadh, Saudi Arabia"
                                />
                                <MapPin size={16} className="text-gray-400 absolute left-3.5 top-3.5" />
                            </div>
                        </div>
                    </div>

                    {/* القسم الثاني: وسائل التواصل الاجتماعي */}
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-100 pb-3 mb-2">
                            <Share2 size={16} className="text-gold" />
                            <h3 className="text-sm font-bold text-charcoal-dark">
                                Social Media Profiles
                            </h3>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">Facebook URL</label>
                                <input 
                                    type="url" 
                                    value={data.facebook_url} 
                                    onChange={(e) => setData('facebook_url', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="https://facebook.com/your-page" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">Twitter / X URL</label>
                                <input 
                                    type="url" 
                                    value={data.twitter_url} 
                                    onChange={(e) => setData('twitter_url', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="https://x.com/your-handle" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">LinkedIn URL</label>
                                <input 
                                    type="url" 
                                    value={data.linkedin_url} 
                                    onChange={(e) => setData('linkedin_url', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="https://linkedin.com/company/your-company" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-charcoal-dark mb-2">Instagram URL</label>
                                <input 
                                    type="url" 
                                    value={data.instagram_url} 
                                    onChange={(e) => setData('instagram_url', e.target.value)} 
                                    className="w-full bg-white border border-gray-200 px-4 py-3 text-sm text-charcoal-dark rounded-xl focus:border-gold focus:ring-4 focus:ring-gold/20 outline-none transition-all" 
                                    placeholder="https://instagram.com/your-profile" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* زر الحفظ */}
                    <div className="p-6 bg-gray-50/50 flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-charcoal-dark text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-charcoal disabled:opacity-50 shadow-sm transition-all duration-300 focus:outline-none active:scale-[0.98]"
                        >
                            <Save size={16} strokeWidth={2.5} className="text-gold" />
                            <span>{processing ? 'Saving Changes...' : 'Save Settings'}</span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />