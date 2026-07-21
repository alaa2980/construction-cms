// resources/js/Pages/Admin/Services/Index.jsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, CheckCircle2, AlertCircle, Wrench, FolderCog } from 'lucide-react';

export default function Index({ services = [] }) {
    return (
        <>
            <Head title="Services | Admin Workspace" />

            {/* ترويسة الصفحة */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="p-1.5 bg-gold/10 rounded-lg">
                            <Wrench size={18} className="text-gold" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal-dark tracking-tight">
                            Services Portfolio
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Configure, update, and manage the core services offered by your enterprise.
                    </p>
                </div>
                
                <Link
                    href="/admin/services/create"
                    className="inline-flex items-center justify-center gap-2 bg-charcoal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-charcoal transition-all duration-300 active:scale-[0.98]"
                >
                    <Plus size={18} strokeWidth={2.5} className="text-gold" />
                    <span>New Service</span>
                </Link>
            </div>

            {/* جدول عرض البيانات */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {services.length === 0 ? (
                    /* حالة الفراغ (Empty State) الاحترافية */
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                            <FolderCog size={28} className="text-gray-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-dark mb-1">No services found</h3>
                        <p className="text-sm text-gray-500 max-w-sm mb-6">
                            You haven't added any services yet. Get started by creating your first enterprise capability.
                        </p>
                        <Link
                            href="/admin/services/create"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-dark bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            <Plus size={16} />
                            Add First Service
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4">Service Title</th>
                                    <th className="px-6 py-4">Description</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right pr-8">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {services.map((service, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        key={service.id} 
                                        className="hover:bg-gray-50/80 transition-colors duration-200 group"
                                    >
                                        {/* عمود: عنوان الخدمة */}
                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-charcoal-dark group-hover:text-gold transition-colors duration-200">
                                                {service.title}
                                            </span>
                                        </td>

                                        {/* عمود: الوصف */}
                                        <td className="px-6 py-4 max-w-xs truncate text-gray-500 font-medium">
                                            <span className="truncate block max-w-md">
                                                {service.description || 'No description provided.'}
                                            </span>
                                        </td>

                                        {/* عمود: الحالة (Status) */}
                                        <td className="px-6 py-4">
                                            {service.is_active ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                                                    <CheckCircle2 size={14} className="text-emerald-500" strokeWidth={2.5} />
                                                    <span>Active</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                                                    <AlertCircle size={14} className="text-gray-400" strokeWidth={2.5} />
                                                    <span>Hidden</span>
                                                </span>
                                            )}
                                        </td>

                                        {/* عمود: الإجراءات */}
                                        <td className="px-6 py-4 text-right pr-8">
                                            <div className="inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                
                                                <Link 
                                                    href={`/admin/services/${service.id}/edit`}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Edit Service"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to delete this service?')) {
                                                            router.delete(`/admin/services/${service.id}`, { preserveScroll: true });
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Delete Service"
                                                >
                                                    <Trash2 size={16} />
                                                </button>

                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />