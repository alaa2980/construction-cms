// resources/js/Pages/Admin/Services/Index.jsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Cpu } from 'lucide-react';

export default function Index({ services = [] }) {
    return (
        <>
            <Head title="Service Capabilities Administration" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 select-none">
                <div>
                    <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider flex items-center gap-2">
                        <Cpu size={16} className="text-gold" />
                        Enterprise Capabilities Blueprint
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 font-normal">Configure, update, and deploy the core industrial services offered by your enterprise.</p>
                </div>
                
                <Link
                    href="/admin/services/create"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold text-charcoal-dark text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-center"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add New Service</span>
                </Link>
            </div>

            {/* Re-engineered Data Table Workspace */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4.5">Capability Title</th>
                                <th className="px-6 py-4.5">Description Abstract</th>
                                <th className="px-6 py-4.5">Deployment Status</th>
                                <th className="px-6 py-4.5 text-right pr-8">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-charcoal-dark font-bold tracking-wide">
                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center py-20 text-gray-400 font-medium">
                                        No active enterprise capabilities found. Click "Add New Service" to initialize system records.
                                    </td>
                                </tr>
                            ) : (
                                services.map((service, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                        key={service.id} 
                                        className="hover:bg-gray-50/40 transition-colors duration-200 group"
                                    >
                                        {/* Dynamic Service Title */}
                                        <td className="px-6 py-5 font-extrabold text-charcoal-dark text-sm tracking-tight group-hover:text-gold transition-colors duration-200">
                                            {service.title}
                                        </td>

                                        {/* Description Abstract with strict typography safeguards */}
                                        <td className="px-6 py-5 max-w-md text-gray-400 font-medium leading-relaxed">
                                            <p className="line-clamp-2">{service.description || 'No definition abstract registered.'}</p>
                                        </td>

                                        {/* High-End Soft Minimal Status Badge */}
                                        <td className="px-6 py-5">
                                            {service.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-emerald-500/[0.06] text-emerald-600 border border-emerald-500/10">
                                                    <CheckCircle2 className="w-3 h-3 stroke-[2.5]" />
                                                    <span>Active</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-gray-500/[0.06] text-gray-400 border border-gray-500/10">
                                                    <AlertCircle className="w-3 h-3 stroke-[2.5]" />
                                                    <span>Hidden</span>
                                                </span>
                                            )}
                                        </td>

                                        {/* Refactored High-End Operation Action Center */}
                                        <td className="px-6 py-5 text-right pr-8 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-2">
                                                
                                                {/* Edit Facility Utility Link */}
                                                <Link 
                                                    href={`/admin/services/${service.id}/edit`}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50/50 hover:border-blue-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Modify Capability"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </Link>
                                                
                                                {/* Delete Destruction Utility Control */}
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to permanently delete this service capability and purge it from the external directory?')) {
                                                            router.delete(`/admin/services/${service.id}`);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50/50 hover:border-red-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Purge Capability"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>

                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />