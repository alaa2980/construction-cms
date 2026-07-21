// resources/js/Pages/Admin/Projects/Index.jsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Star, Layers, User, FolderOpen } from 'lucide-react';

export default function Index({ projects = [] }) {
    return (
        <>
            <Head title="Projects | Admin Workspace" />

            {/* ترويسة الصفحة (Header) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <div className="flex items-center gap-2.5 mb-1">
                        <div className="p-1.5 bg-gold/10 rounded-lg">
                            <Layers size={18} className="text-gold" strokeWidth={2.5} />
                        </div>
                        <h2 className="text-xl font-bold text-charcoal-dark tracking-tight">
                            Projects Portfolio
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 font-medium">
                        Manage, update, and organize your construction showcase and client deliverables.
                    </p>
                </div>
                
                <Link
                    href="/admin/projects/create"
                    className="inline-flex items-center justify-center gap-2 bg-charcoal-dark text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-charcoal transition-all duration-300 active:scale-[0.98]"
                >
                    <Plus size={18} strokeWidth={2.5} className="text-gold" />
                    <span>New Project</span>
                </Link>
            </div>

            {/* مساحة عرض البيانات (Data Table Workspace) */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {projects.length === 0 ? (
                    /* حالة الفراغ (Empty State) الاحترافية */
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                            <FolderOpen size={28} className="text-gray-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-dark mb-1">No projects found</h3>
                        <p className="text-sm text-gray-500 max-w-sm mb-6">
                            Your portfolio is currently empty. Get started by creating your first project to showcase your work.
                        </p>
                        <Link
                            href="/admin/projects/create"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal-dark bg-gray-50 hover:bg-gray-100 border border-gray-200 px-4 py-2 rounded-lg transition-colors duration-200"
                        >
                            <Plus size={16} />
                            Add First Project
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-4 rounded-tl-2xl">Project</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Client</th>
                                    <th className="px-6 py-4 text-center">Featured</th>
                                    <th className="px-6 py-4 text-right pr-8 rounded-tr-2xl">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm">
                                {projects.map((project, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        key={project.id} 
                                        onClick={() => router.visit(`/admin/projects/${project.id}/show`)}
                                        className="hover:bg-gray-50/80 transition-colors duration-200 group cursor-pointer"
                                    >
                                        {/* عمود: المشروع */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0 relative">
                                                    {project.cover_image ? (
                                                        <img src={project.cover_image} alt={project.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                            <Layers size={20} />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-charcoal-dark group-hover:text-gold transition-colors duration-200">
                                                        {project.title}
                                                    </span>
                                                    <span className="text-xs text-gray-400 mt-0.5">
                                                        ID: {project.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* عمود: الفئة (Category) */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                                                {project.category?.name || 'Uncategorized'}
                                            </span>
                                        </td>

                                        {/* عمود: العميل (Client) */}
                                        <td className="px-6 py-4 text-gray-500 font-medium">
                                            {project.client_name ? (
                                                <div className="flex items-center gap-2">
                                                    <User size={14} className="text-gray-400" />
                                                    <span>{project.client_name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-xs">Internal Project</span>
                                            )}
                                        </td>

                                        {/* عمود: مميز (Featured) */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                {project.is_featured === 1 || project.is_featured === true ? (
                                                    <Star size={18} className="fill-gold text-gold" />
                                                ) : (
                                                    <Star size={18} className="text-gray-300" strokeWidth={1.5} />
                                                )}
                                            </div>
                                        </td>

                                        {/* عمود: الإجراءات (Actions) */}
                                        <td className="px-6 py-4 text-right pr-8">
                                            {/* إيقاف انتشار النقر لمنع فتح الصفحة عند الضغط على أزرار التعديل والحذف */}
                                            <div className="inline-flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" onClick={(e) => e.stopPropagation()}>
                                                
                                                <Link 
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Edit Project"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
                                                            router.delete(`/admin/projects/${project.id}`);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors duration-200 focus:outline-none"
                                                    title="Delete Project"
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