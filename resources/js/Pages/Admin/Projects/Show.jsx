// resources/js/Pages/Admin/Projects/Show.jsx
import { Head, Link, router } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { 
    ArrowLeft, Edit2, Trash2, Calendar, User, 
    Layers, Star, Globe, Clock, Image as ImageIcon, 
    FileText // التعديل الصافي: استبدال الأيقونة المنهارة بأيقونة معيارية مستقرة
} from 'lucide-react';

export default function Show({ project }) {

    // تنسيق التاريخ بأسلوب إداري فاخر
    const formatDate = (dateString) => {
        if (!dateString) return 'Not Specified';
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <>
            <Head title={`Project Specifications: ${project.title}`} />

            {/* شريط التوجيه العلوي - معيار التصفح العالمي */}
            <div className="mb-10 select-none">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors duration-200"
                >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Back to Portfolio Canvas</span>
                </Link>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-3">
                    <h2 className="text-base font-black text-charcoal-dark uppercase tracking-tight flex items-center gap-2">
                        <Globe size={16} className="text-gold" />
                        Project Detailed Specifications
                    </h2>
                    
                    {/* أزرار الإجراءات السريعة في الهيدر */}
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/admin/projects/${project.id}/edit`}
                            className="inline-flex items-center gap-2 bg-charcoal text-white text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-charcoal-dark shadow-md transition-all duration-300"
                        >
                            <Edit2 size={12} />
                            Modify Blueprint
                        </Link>
                        <button
                            onClick={() => confirm('Purge this project from database?') && router.delete(`/admin/projects/${project.id}`)}
                            className="inline-flex items-center gap-2 bg-white border border-red-100 text-red-500 text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-red-50 transition-all duration-300"
                        >
                            <Trash2 size={12} />
                            Purge Record
                        </button>
                    </div>
                </div>
            </div>

            {/* الهيكل الرئيسي المقسم (3:1) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* العمود الأكبر (اليسار): المحتوى البصري والهندسي */}
                <div className="lg:col-span-2 space-y-8">
                    
                    {/* لوحة العرض السينمائية (Cover Image Hero) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 group"
                    >
                        <img 
                            src={project.cover_image} 
                            alt={project.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        {/* غشاء لوني لإبراز التفاصيل */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/60 via-transparent to-transparent" />
                        
                        {/* شارة التميز العائمة (Featured Badge) */}
                        {project.is_featured && (
                            <div className="absolute top-6 left-6 inline-flex items-center gap-2 bg-gold text-charcoal-dark px-4 py-2 rounded-full shadow-xl backdrop-blur-md border border-white/20">
                                <Star size={14} className="fill-charcoal-dark stroke-[2.5]" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Featured Work</span>
                            </div>
                        )}

                        <div className="absolute bottom-8 left-8">
                            <h1 className="text-3xl font-black text-white tracking-tight uppercase drop-shadow-md">
                                {project.title}
                            </h1>
                        </div>
                    </motion.div>

                    {/* الوصف الهندسي الكامل (Technical Abstract) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                            <FileText size={16} className="text-gold" /> {/* تم تعديل الأيقونة هنا بنقاء */}
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-widest">Structural Abstract & Description</h3>
                        </div>
                        <div className="text-gray-500 text-sm leading-loose font-medium whitespace-pre-wrap">
                            {project.description || 'No technical abstract registered for this project.'}
                        </div>
                    </motion.div>

                    {/* معرض الصور الفرعي (Gallery Deck) */}
                    {project.images && project.images.length > 0 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm"
                        >
                            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                                <ImageIcon size={16} className="text-gold" />
                                <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-widest">Asset Catalog Gallery ({project.images.length})</h3>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {project.images.map((img, i) => (
                                    <div 
                                        key={img.id} 
                                        className="aspect-square rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
                                    >
                                        <img 
                                            src={img.image_path} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                                            alt={`Viewpoint ${i + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* العمود الجانبي (اليمين): البيانات الرقمية الملمومة */}
                <div className="space-y-6 select-none">
                    
                    {/* كرت تصنيف المشروع (Classification) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                    >
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <Layers size={14} className="text-gold" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</span>
                                </div>
                                <span className="text-xs font-black text-charcoal-dark uppercase bg-gray-50 px-3 py-1 rounded-md border border-gray-100">
                                    {project.category?.name || 'Unclassified'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-50 pb-4">
                                <div className="flex items-center gap-2">
                                    <User size={14} className="text-gold" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Client</span>
                                </div>
                                <span className="text-xs font-bold text-charcoal-dark">
                                    {project.client_name || 'Internal Asset'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Calendar size={14} className="text-gold" />
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Completed</span>
                                </div>
                                <span className="text-xs font-bold text-charcoal-dark">
                                    {formatDate(project.completion_date)}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* كرت الميتا والوقت (System Metadata) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-charcoal-dark p-6 rounded-2xl shadow-xl text-white"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4 border-b border-white/[0.04] pb-3">
                                <Clock size={14} className="text-gold" />
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gold opacity-80">Database Production Log</h3>
                            </div>
                            <div className="flex flex-col gap-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                <div className="flex justify-between">
                                    <span>System ID:</span>
                                    <span className="text-white font-mono">#{project.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Added On:</span>
                                    <span className="text-white">{formatDate(project.created_at)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Slug Path:</span>
                                    <span className="text-white normal-case italic font-medium opacity-60">/{project.slug}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}

Show.layout = page => <AdminLayout children={page} />