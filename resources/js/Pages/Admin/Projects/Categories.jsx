// resources/js/Pages/Admin/Categories/Index.jsx
import { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Layers, X, FolderKanban } from 'lucide-react';

export default function Index({ categories = [] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editId, setEditId] = useState(null);

    // استخدام processing لتعطيل الأزرار أثناء إرسال البيانات
    const { data, setData, post, put, errors, reset, clearErrors, processing } = useForm({
        name: '',
    });

    const openCreateModal = () => {
        reset();
        clearErrors();
        setEditId(null);
        setIsModalOpen(true);
    };

    const openEditModal = (category) => {
        clearErrors();
        setEditId(category.id);
        setData('name', category.name);
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const options = {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
            preserveScroll: true, // الحفاظ على موضع التمرير في الصفحة
        };

        if (editId) {
            put(`/admin/categories/${editId}`, options);
        } else {
            post('/admin/categories', options);
        }
    };

    return (
        <>
            <Head title="Categories | Admin Workspace" />

            {/* ترويسة الصفحة */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="p-1.5 bg-gold/10 rounded-lg">
                            <Layers size={18} className="text-gold" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal-dark tracking-tight">
                            Project Categories
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Organize and manage the categories used to classify your projects.
                    </p>
                </div>
                
                <button
                    onClick={openCreateModal}
                    className="inline-flex items-center justify-center gap-2 bg-charcoal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-charcoal transition-all duration-300 active:scale-[0.98] focus:outline-none"
                >
                    <Plus size={18} strokeWidth={2.5} className="text-gold" />
                    <span>New Category</span>
                </button>
            </div>

            {/* جدول عرض البيانات */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {categories.length === 0 ? (
                    /* حالة الفراغ (Empty State) */
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                            <FolderKanban size={28} className="text-gray-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-dark mb-1">No categories yet</h3>
                        <p className="text-sm text-gray-500 max-w-sm mb-6">
                            Categories help you organize your projects. Create your first category to get started.
                        </p>
                        <button
                            onClick={openCreateModal}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-dark bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            <Plus size={16} />
                            Add First Category
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 w-24">ID</th>
                                    <th className="px-6 py-4">Category Name</th>
                                    <th className="px-6 py-4 text-right pr-8 w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {categories.map((category, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        key={category.id} 
                                        className="hover:bg-gray-50/80 transition-colors duration-200 group"
                                    >
                                        <td className="px-6 py-4 text-gray-400 font-medium">
                                            #{category.id}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className="font-semibold text-charcoal-dark">
                                                {category.name}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-right pr-8">
                                            <div className="inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                
                                                <button 
                                                    onClick={() => openEditModal(category)}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Edit Category"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to delete this category?')) {
                                                            router.delete(`/admin/categories/${category.id}`, { preserveScroll: true });
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Delete Category"
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

            {/* نافذة الإضافة/التعديل (Modal) */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        
                        {/* الخلفية المظلمة */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !processing && setIsModalOpen(false)}
                            className="absolute inset-0 bg-charcoal-dark/40 backdrop-blur-sm"
                        />

                        {/* هيكل النافذة المنبثقة */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden"
                        >
                            {/* شريط العنوان */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                                <h3 className="text-base font-bold text-charcoal-dark flex items-center gap-2">
                                    <Layers size={18} className="text-gold" />
                                    {editId ? 'Edit Category' : 'Create New Category'}
                                </h3>
                                <button 
                                    onClick={() => !processing && setIsModalOpen(false)}
                                    disabled={processing}
                                    className="w-8 h-8 text-gray-400 hover:text-charcoal-dark hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors focus:outline-none disabled:opacity-50"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* نموذج الإدخال */}
                            <form onSubmit={handleSubmit} className="p-6">
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-charcoal-dark mb-2">
                                        Category Name
                                    </label>
                                    <input 
                                        type="text"
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="e.g., Commercial, Infrastructure"
                                        className={`w-full bg-white border ${errors.name ? 'border-red-300 focus:ring-red-100' : 'border-gray-200 focus:ring-gold/20 focus:border-gold'} rounded-xl px-4 py-3 text-sm text-charcoal-dark transition-all focus:outline-none focus:ring-4 disabled:bg-gray-50 disabled:text-gray-400`}
                                        autoFocus
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs font-medium mt-2">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>

                                {/* أزرار الإجراءات */}
                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        disabled={processing}
                                        className="px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition-all focus:outline-none disabled:opacity-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="px-6 py-2.5 bg-charcoal-dark text-white hover:bg-charcoal text-sm font-semibold rounded-xl shadow-sm transition-all focus:outline-none active:scale-[0.98] disabled:opacity-70 flex items-center gap-2"
                                    >
                                        {processing ? 'Saving...' : (editId ? 'Save Changes' : 'Create Category')}
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