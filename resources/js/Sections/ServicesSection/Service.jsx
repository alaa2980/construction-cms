// resources/js/Pages/Site/Services/Sections/ServiceContentSection.jsx
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import Button from '@/Components/UI/Button';
import * as LucideIcons from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة الموحدة للهوية البصرية
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

export default function Service({ service }) {
    const { __ } = useTrans();
    
    // دالة ديناميكية ذكية لتوليد الأيقونة من الاسم المخزن في الداتابيز
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        if (!IconComponent) return <LucideIcons.Building2 className="w-10 h-10 stroke-[1.5]" />;
        return <IconComponent className="w-10 h-10 stroke-[1.5]" />;
    };

    return (
        <section className="py-24 bg-white select-none overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* شبكة التوزيع الهندسية المتزنة */}
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* العمود الأكبر (اليسار): الشرح والتفاصيل الفنية للخدمة */}
                    <div className="w-full lg:w-2/3">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: premiumEase }}
                        >
                            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold mb-6 block">
                                {__('service.single.overview')}
                            </span>
                            
                            {/* الوصف النصي النظيف بمسافات قراءة مريحة */}
                            <div className="text-gray-600 text-base md:text-lg leading-[1.85] font-medium whitespace-pre-wrap">
                                {service.description}
                            </div>
                        </motion.div>
                    </div>

                    {/* العمود الجانبي (اليمين): الهوية البصرية للخدمة ودعوة العمل */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-1/3 lg:sticky lg:top-32 space-y-8"
                    >
                        
                        {/* لوحة الأيقونة الهندسية الفاخرة */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, scale: 0.95, y: 20 },
                                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
                            }}
                            className="p-10 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col items-center justify-center text-center shadow-sm group cursor-default"
                        >
                            <div className="w-20 h-20 rounded-2xl bg-charcoal flex items-center justify-center text-gold mb-6 shadow-md transition-transform duration-500 ease-out group-hover:rotate-6">
                                {renderIcon(service.icon)}
                            </div>
                            
                            <h3 className="text-lg font-black text-charcoal-dark uppercase tracking-tight transition-colors duration-300 group-hover:text-gold">
                                {service.title}
                            </h3>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                                {__('service.single.certified')}
                            </span>
                        </motion.div>

                        {/* كرت التحويل الذكي والسريع المخصص لهذه الخدمة بالذات */}
                        <motion.div 
                            variants={{
                                hidden: { opacity: 0, y: 30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: premiumEase } }
                            }}
                            className="p-8 rounded-2xl bg-charcoal-dark text-white relative overflow-hidden shadow-xl"
                        >
                            <div className="relative z-10">
                                <h4 className="text-base font-black uppercase tracking-tight mb-3">
                                    {__('service.single.cta.title')}
                                </h4>
                                <p className="text-xs text-gray-400 leading-relaxed font-medium mb-6">
                                    {__('service.single.cta.desc')}
                                </p>
                                
                                <Link href={route('site.contact.index')} className="block">
                                    <Button variant="primary" className="w-full !bg-gradient-to-r !from-gold-dark !to-gold !text-charcoal-dark text-xs font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-gold/5 flex items-center justify-center gap-2 group transform hover:-translate-y-0.5 transition-all duration-300">
                                        <span>{__('service.single.cta.button')}</span>
                                        {/* السهم ينقلب اتجاهه في العربية وتنعكس حركته تلقائياً مع الـ Hover */}
                                        <ArrowRight size={13} className="transition-transform duration-300 stroke-[2.5] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                                    </Button>
                                </Link>
                            </div>
                            {/* لمسة توهج ذهبي ناعمة جداً وخلفية في الزاوية */}
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                        </motion.div>

                    </motion.div>

                </div>
            </div>
        </section>
    );
}