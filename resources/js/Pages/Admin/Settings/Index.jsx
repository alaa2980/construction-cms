// resources/js/Pages/Admin/Settings/Index.jsx
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Save, Phone, Mail, MapPin, Share2, CheckCircle2, Sliders } from 'lucide-react';

export default function Index({ settings }) {
    // Initializing state with explicit server-side values mapped to database fields
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
            <Head title="Global System Settings" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="mb-10 select-none">
                <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider flex items-center gap-2">
                    <Sliders size={16} className="text-gold" />
                    Global System Configuration
                </h2>
                <p className="text-xs text-gray-400 mt-1 font-normal">Calibrate your core website properties, dynamic identity metadata, and social integration configurations.</p>
            </div>

            {/* Clean Enterprise Success Alert Status Card */}
            {wasSuccessful && (
                <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-emerald-500/[0.06] border border-emerald-500/10 text-emerald-600 rounded-xl flex items-center gap-3 text-xs font-bold uppercase tracking-wide max-w-3xl"
                >
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
                    <span>Configuration updated successfully. Adjustments are now deployed and live globally.</span>
                </motion.div>
            )}

            {/* Master Settings Workspace Grid Panel */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-3xl overflow-hidden backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="divide-y divide-gray-50">
                    
                    {/* SECTION 1: CORPORATE CHANNELS IDENTITY */}
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-2">
                            <Phone size={14} className="text-gold" />
                            <h3 className="text-xs font-black text-charcoal-dark uppercase tracking-wider">
                                Corporate Contact Directories
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Public Hot-Line Phone</label>
                                <input 
                                    type="text" 
                                    value={data.company_phone} 
                                    onChange={(e) => setData('company_phone', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="+966 50 000 0000"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Public Gateway Email Address</label>
                                <input 
                                    type="email" 
                                    value={data.company_email} 
                                    onChange={(e) => setData('company_email', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="info@enterprise.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Headquarters Blueprint Address</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    value={data.company_address} 
                                    onChange={(e) => setData('company_address', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 pl-10 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="Riyadh, Saudi Arabia"
                                />
                                <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3.5 top-3.5 stroke-[2]" />
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: DIGITAL CHANNELS SYNDICATION */}
                    <div className="p-8 space-y-6">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-2">
                            <Share2 size={14} className="text-gold" />
                            <h3 className="text-xs font-black text-charcoal-dark uppercase tracking-wider">
                                Digital Channels Syndication
                            </h3>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Facebook Portal Directory</label>
                                <input 
                                    type="url" 
                                    value={data.facebook_url} 
                                    onChange={(e) => setData('facebook_url', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="https://facebook.com/corporate-portal" 
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Twitter / X Channel Anchor</label>
                                <input 
                                    type="url" 
                                    value={data.twitter_url} 
                                    onChange={(e) => setData('twitter_url', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="https://x.com/corporate-channel" 
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">LinkedIn Enterprise Profile</label>
                                <input 
                                    type="url" 
                                    value={data.linkedin_url} 
                                    onChange={(e) => setData('linkedin_url', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="https://linkedin.com/company/enterprise-profile" 
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Instagram Enterprise Profile</label>
                                <input 
                                    type="url" 
                                    value={data.instagram_url} 
                                    onChange={(e) => setData('instagram_url', e.target.value)} 
                                    className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                                    placeholder="https://instagram.com/company/enterprise-profile" 
                                />
                            </div>
                        </div>
                    </div>

                    {/* GLOBAL MASTER DEPLOYMENT EXECUTION CONTROL */}
                    <div className="p-8 bg-gray-50/70 flex justify-end select-none">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-charcoal text-white text-xs font-black uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-charcoal-dark disabled:opacity-50 shadow-md shadow-charcoal/10 hover:shadow-lg hover:shadow-charcoal/20 transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 focus:outline-none"
                        >
                            <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{processing ? 'Deploying Adjustments...' : 'Save All Settings'}</span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />