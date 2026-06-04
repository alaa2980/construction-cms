// resources/js/Pages/Frontend/Projects/Sections/ProjectContent.jsx
import { motion } from 'framer-motion';
import { User, Calendar, Layers, Clock } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة للموقع العام
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: premiumEase }
    }
};

export default function Project({ project }) {
    const { __ } = useTrans();

    return (
        <section className="py-24 bg-white select-none overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* العمود الأكبر (اليسار): قصة المشروع + معرض الصور المتكامل */}
                    <div className="w-full lg:w-2/3 space-y-24">
                        
                        {/* 1. الوصف الهندسي بنعومة الظهور */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: premiumEase }}
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold mb-6 block">
                                {__('project.narrative')}
                            </span>
                            <div className="text-gray-600 text-base md:text-lg leading-[1.85] font-medium whitespace-pre-wrap">
                                {project.description}
                            </div>
                        </motion.div>

                        {/* 2. معرض الصور الفرعي (Gallery Deck) مع تأثير ظهور متتابع فاخر */}
                        {project.images && project.images.length > 0 && (
                            <div className="pt-6">
                                <motion.span 
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="text-[11px] font-black uppercase tracking-[0.3em] text-gold mb-10 block"
                                >
                                    {__('project.visualPerspectives')} ({project.images.length})
                                </motion.span>
                                
                                <motion.div 
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {project.images.map((img, index) => (
                                        <motion.div 
                                            key={index} 
                                            variants={itemVariants}
                                            whileHover={{ y: -6 }}
                                            className="group relative h-[380px] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm transition-all duration-500 flex-1 cursor-zoom-in"
                                        >
                                            <img 
                                                src={img.image_path} 
                                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                                                alt={`Viewpoint ${index + 1}`}
                                                loading="lazy"
                                            />
                                            {/* تأثير عزل الإضاءة السينمائي الناعم عند الـ Hover */}
                                            <div className="absolute inset-0 bg-charcoal-dark/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        )}

                    </div>

                    {/* العمود الأيمن المتزن: لوحة المواصفات الفنية المثبتة (Sticky Spec Card) */}
                    <div className="w-full lg:w-1/3 sticky top-32">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
                            className="p-8 rounded-2xl bg-gray-50 border border-gray-100 space-y-8 shadow-sm relative overflow-hidden"
                        >
                            <h3 className="text-xs font-black uppercase tracking-widest text-charcoal-dark border-b border-gray-200/60 pb-4 relative z-10">
                                {__('project.specs.title')}
                            </h3>
                            
                            <div className="space-y-6 relative z-10">
                                <SpecItem 
                                    icon={<User size={15}/>} 
                                    label={__('project.specs.client')} 
                                    value={project.client_name || __('project.fallback.client')} 
                                />
                                <SpecItem 
                                    icon={<Layers size={15}/>} 
                                    label={__('project.specs.sector')} 
                                    value={project.category?.name || __('project.fallback.sector')} 
                                />
                                <SpecItem 
                                    icon={<Calendar size={15}/>} 
                                    label={__('project.specs.completion')} 
                                    value={project.completion_date || __('project.fallback.ongoing')} 
                                />
                                <SpecItem 
                                    icon={<Clock size={15}/>} 
                                    label={__('project.specs.published')} 
                                    value={project.created_at ? new Date(project.created_at).getFullYear() : __('project.fallback.recent')} 
                                />
                            </div>

                            {/* لمسة هالة توهج خلفية فائقة النعومة داخل الكرت */}
                            <div className="absolute -bottom-12 -right-12 w-28 h-28 bg-gold/5 rounded-full blur-2xl pointer-events-none" />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}

// مكون فرعي منظم لبنود المواصفات
function SpecItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-4 group/item">
            <div className="text-gold mt-1 stroke-[2.2] transition-transform duration-300 group-hover/item:scale-105">{icon}</div>
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{label}</span>
                <span className="text-sm font-bold text-charcoal-dark">{value}</span>
            </div>
        </div>
    );
}