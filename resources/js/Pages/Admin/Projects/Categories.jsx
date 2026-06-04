// resources/js/Pages/Admin/Categories/Index.jsx
import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Layers, X } from 'lucide-react';

export default function Index({ categories = [] }) {
    // حالات إدارة الـ Modal الداخلي للإضافة والتعديل
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // استخدام useForm من Inertia للتعامل النقي مع البيانات
    const { data, setData, post, put, errors, reset, clearErrors } = useForm({
        name: '',
    });

    // فتح المودال للإضافة
    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditId(null);
        setIsModalOpen(true);
    };

    // فتح المودال للتعديل مع تعبئة البيانات تلقائياً
    const openEditModal = (category) => {
        clearErrors();
        setEditId(category.id);
        setData('name', category.name);
        setIsModalOpen(true);
    };

    // معالجة إرسال البيانات (إضافة أو تحديث)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId) {
            put(`/admin/categories/${editId}`, {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        } else {
            post('/admin/categories', {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                }
            });
        }
    };

    return (
        <>
            <Head title="Structural Categories Administration" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 select-none">
                <div>
                    <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider flex items-center gap-2">
                        <Layers size={16} className="text-gold" />
                        Project Portfolio Categories
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 font-normal">Monitor, audit, and configure structural taxonomy divisions across your showcase database.</p>
                </div>
                
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold text-charcoal-dark text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-center focus:outline-none"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add New Category</span>
                </button>
            </div>

            {/* Re-engineered High-End Structural Table Workspace */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4.5 w-1/4">System ID</th>
                                <th className="px-6 py-4.5 w-2/4">Category Designation Name</th>
                                <th className="px-6 py-4.5 text-right pr-8 w-1/4">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-charcoal-dark font-bold tracking-wide">
                            {categories.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center py-20 text-gray-400 font-medium">
                                        No taxonomy categories registered found. Click "Add New Category" to initialize production.
                                    </td>
                                </tr>
                            ) : (
                                categories.map((category, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                        key={category.id} 
                                        className="hover:bg-gray-50/40 transition-colors duration-200 group"
                                    >
                                        {/* Category Identification ID */}
                                        <td className="px-6 py-4 text-gray-400 font-medium">
                                            #{category.id}
                                        </td>

                                        {/* Category Title designation */}
                                        <td className="px-6 py-4">
                                            <span className="font-extrabold text-charcoal-dark text-sm tracking-tight group-hover:text-gold transition-colors duration-200">
                                                {category.name}
                                            </span>
                                        </td>

                                        {/* Operation Action Center */}
                                        <td className="px-6 py-4 text-right pr-8 whitespace-nowrap">
                                            <div className="inline-flex items-center gap-2">
                                                
                                                {/* Edit Facility Trigger */}
                                                <button 
                                                    onClick={() => openEditModal(category)}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50/50 hover:border-blue-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Edit Designation"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                
                                                {/* Purge Destruction Action */}
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to permanently delete this category? Projects assigned to it might become unlinked.')) {
                                                            router.delete(`/admin/categories/${category.id}`);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50/50 hover:border-red-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Purge Category"
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

            {/* Premium Interactive Modal Layer (AnimatePresence Frame) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        
                        {/* الخلفية المعتمة الحركية الفخمة */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-charcoal-dark/60 backdrop-blur-sm"
                        />

                        {/* هيكل لوحة الفورم المنبثقة الصارمة */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                            className="bg-white rounded-2xl border border-gray-100 shadow-2xl w-full max-w-md p-8 relative z-10 overflow-hidden select-none"
                        >
                            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                                <h3 className="text-xs font-black text-charcoal-dark uppercase tracking-widest flex items-center gap-2">
                                    <Layers size={14} className="text-gold" />
                                    {editId ? 'Modify Designation' : 'Initialize Category'}
                                </h3>
                                <button 
                                    onClick={() => setIsModalOpen(false)}
                                    className="w-7 h-7 text-gray-400 hover:text-charcoal-dark hover:bg-gray-50 rounded-lg flex items-center justify-center transition-colors focus:outline-none"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-wider text-gray-400 mb-2">
                                        Category Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        placeholder="e.g., Infrastructure, Commercial Towers"
                                        className={`w-full bg-gray-50/50 border ${errors.name ? 'border-red-300 focus:ring-red-50' : 'border-gray-200 focus:ring-gold/20 focus:border-gold'} rounded-xl px-4 py-3.5 text-xs font-bold text-charcoal-dark transition-all focus:outline-none focus:ring-4`}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-[11px] font-medium mt-2 flex items-center gap-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-5 py-3 border border-gray-200 text-charcoal-dark text-xs font-black uppercase tracking-wider rounded-xl hover:bg-gray-50 transition-all focus:outline-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-charcoal text-white hover:bg-charcoal-dark text-xs font-black uppercase tracking-wider rounded-xl shadow-md transition-all focus:outline-none transform hover:-translate-y-0.5"
                                    >
                                        {editId ? 'Update Matrix' : 'Commit Production'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />