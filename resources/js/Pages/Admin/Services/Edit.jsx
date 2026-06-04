// resources/js/Pages/Admin/Services/Edit.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, FileEdit } from 'lucide-react';

export default function Edit({ service }) {
    // Re-engineered enterprise form mapping using pristine server state data
    const { data, setData, put, processing, errors } = useForm({
        title: service.title || '',
        description: service.description || '',
        icon: service.icon || 'Building2',
        is_active: service.is_active,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(`/admin/services/${service.id}`);
    };

    return (
        <>
            <Head title={`Modify Capability: ${service.title}`} />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="mb-10 select-none">
                <Link
                    href="/admin/services"
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors duration-200"
                >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Back to Capabilities</span>
                </Link>
                <h2 className="text-base font-black text-charcoal-dark uppercase tracking-tight mt-3 flex items-center gap-2">
                    <FileEdit size={16} className="text-gold" />
                    Modify Capability Specifications
                </h2>
            </div>

            {/* Re-engineered High-End Minimalist Form Panel Workspace */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm max-w-2xl overflow-hidden backdrop-blur-sm">
                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    
                    {/* Service Master Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                            Capability Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`w-full bg-gray-50/40 border p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none ${
                                errors.title ? 'border-red-500 bg-red-50/10' : 'border-gray-100'
                            }`}
                        />
                        {errors.title && (
                            <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.title}</p>
                        )}
                    </div>

                    {/* Service Dynamic Description Abstract Area */}
                    <div>
                        <label htmlFor="description" className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                            Description Abstract
                        </label>
                        <textarea
                            id="description"
                            rows="6"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={`w-full bg-gray-50/40 border p-3 text-xs font-medium leading-relaxed rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none resize-none ${
                                errors.description ? 'border-red-500 bg-red-50/10' : 'border-gray-100'
                            }`}
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.description}</p>
                        )}
                    </div>

                    {/* System Deployment Status Select Selector */}
                    <div>
                        <label htmlFor="is_active" className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">
                            Deployment Visibility
                        </label>
                        <select
                            id="is_active"
                            value={data.is_active ? '1' : '0'}
                            onChange={(e) => setData('is_active', e.target.value === '1')}
                            className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none cursor-pointer"
                        >
                            <option value="1">Active (Visible on public enterprise catalog)</option>
                            <option value="0">Hidden (Staged in administrative database)</option>
                        </select>
                    </div>

                    {/* GLOBAL MASTER SYSTEM DEPLOYMENT TRIGGER BUTTON */}
                    <div className="pt-6 border-t border-gray-50 flex justify-end select-none">
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 bg-charcoal text-white text-xs font-black uppercase tracking-wider px-8 py-3.5 rounded-xl hover:bg-charcoal-dark disabled:opacity-50 shadow-md shadow-charcoal/10 hover:shadow-lg hover:shadow-charcoal/20 transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 focus:outline-none"
                        >
                            <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                            <span>{processing ? 'Deploying Adjustments...' : 'Update Capability'}</span>
                        </button>
                    </div>

                </form>
            </div>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} />