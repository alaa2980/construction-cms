// resources/js/Pages/Admin/Projects/Index.jsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Plus, Edit2, Trash2, Star, Layers, User } from 'lucide-react';

export default function Index({ projects = [] }) {
    return (
        <>
            <Head title="Project Portfolio Administration" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 select-none">
                <div>
                    <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider flex items-center gap-2">
                        <Layers size={16} className="text-gold" />
                        Project Portfolio Canvas
                    </h2>
                    <p className="text-xs text-gray-400 mt-1 font-normal">Monitor, audit, and manage your dynamic construction and architecture showcase database.</p>
                </div>
                
                <Link
                    href="/admin/projects/create"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-dark to-gold text-charcoal-dark text-xs font-black uppercase tracking-wider px-5 py-3.5 rounded-xl shadow-lg shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 self-start sm:self-center"
                >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    <span>Add New Project</span>
                </Link>
            </div>

            {/* Re-engineered High-End Structural Table Workspace */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden backdrop-blur-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-[10px] font-black uppercase tracking-widest">
                                <th className="px-6 py-4.5">Project Blueprint</th>
                                <th className="px-6 py-4.5">Structural Category</th>
                                <th className="px-6 py-4.5">Corporate Client</th>
                                <th className="px-6 py-4.5 text-center">Featured Status</th>
                                <th className="px-6 py-4.5 text-right pr-8">Administrative Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-xs text-charcoal-dark font-bold tracking-wide">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center py-20 text-gray-400 font-medium">
                                        No structural projects registered found. Click "Add New Project" to initialize database production.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project, index) => (
                                    <motion.tr 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                        key={project.id} 
                                        
                                        // المعيار العالمي: توجيه برمي فوري لصفحة العرض عند نقر الصف
                                        onClick={() => router.visit(`/admin/projects/${project.id}/show`)}
                                        
                                        // كلاس cursor-pointer مع تأثير hover متناسق يضيء النص بالذهب
                                        className="hover:bg-gray-50/40 transition-colors duration-200 group cursor-pointer"
                                    >
                                        {/* Project Title and Master Image Frame */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex-shrink-0 shadow-sm relative">
                                                    <img src={project.cover_image} alt="" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                </div>
                                                <div className="flex flex-col">
                                                    {/* إضاءة ذهبية ناعمة لعنوان المشروع عند الـ hover فوق الصف */}
                                                    <span className="font-extrabold text-charcoal-dark text-sm tracking-tight group-hover:text-gold transition-colors duration-200">
                                                        {project.title}
                                                    </span>
                                                    <span className="text-[10px] text-gray-400 font-medium mt-0.5">ID: #{project.id}</span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Premium Architectural Badge Assignment */}
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-charcoal/5 text-charcoal-dark border border-gray-100/50">
                                                {project.category?.name || 'Unassigned'}
                                            </span>
                                        </td>

                                        {/* Client Name Metadata Field */}
                                        <td className="px-6 py-4 text-gray-500 font-medium">
                                            {project.client_name ? (
                                                <div className="flex items-center gap-1.5">
                                                    <User size={12} className="text-gray-300" />
                                                    <span>{project.client_name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-300 font-normal">Internal Assets</span>
                                            )}
                                        </td>

                                        {/* Precision Core Featured Star Indicator */}
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center">
                                                {project.is_featured === 1 || project.is_featured === true ? (
                                                    <div className="w-7 h-7 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold shadow-sm" title="Featured Work">
                                                        <Star className="w-3.5 h-3.5 fill-gold stroke-[2.5]" />
                                                    </div>
                                                ) : (
                                                    <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-300" title="Standard Catalog">
                                                        <Star className="w-3.5 h-3.5 stroke-[2]" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>

                                        {/* Refactored High-End Operation Action Center */}
                                        <td className="px-6 py-4 text-right pr-8 whitespace-nowrap">
                                            {/* حماية الأزرار معمارياً وتكتيكياً منعاً لتداخل النقرات الاختيارية */}
                                            <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                
                                                {/* Edit Facility Utility Link */}
                                                <Link 
                                                    href={`/admin/projects/${project.id}/edit`}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50/50 hover:border-blue-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Edit Specifications"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </Link>
                                                
                                                {/* Delete Destruction Utility Control */}
                                                <button 
                                                    onClick={() => {
                                                        if(confirm('Are you sure you want to permanently delete this project blueprint and purge all its registered gallery assets?')) {
                                                            router.delete(`/admin/projects/${project.id}`);
                                                        }
                                                    }}
                                                    className="w-8 h-8 rounded-lg bg-gray-50 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50/50 hover:border-red-100 flex items-center justify-center transition-all duration-300 focus:outline-none"
                                                    title="Purge Document"
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