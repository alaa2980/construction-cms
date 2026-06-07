// resources/js/Sections/Services.jsx
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '@/Components/UI/SectionHeading';
import { useTrans } from '@/Hooks/useTrans';

// المعيار العالمي للـ Easing للرأس فقط (الكروت أصبحت تعتمد على الفيزياء)
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        // 🌊 التعديل الأول: توسيع الفجوة الزمنية من 0.08 إلى 0.15 لعمل تأثير "الموجة" بوضوح
        transition: { staggerChildren: 0.15 } 
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        // 🧲 التعديل الثاني: استبدال التوقيت الخطي بـ "فيزياء الزنبرك" لظهور طبيعي جداً
        transition: { 
            type: "spring", 
            stiffness: 80, 
            damping: 15, 
            mass: 1 
        }
    }
};

export default function Services({ services = [], isHome = false }) {
    const { __ } = useTrans();
    
    // دالة ذكية لتوليد الأيقونة المخصصة
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        if (!IconComponent) return <LucideIcons.Building2 className="w-6 h-6 stroke-[1.5]" />;
        return <IconComponent className="w-6 h-6 stroke-[1.5]" />;
    };

    return (
        <section className="py-20 bg-white text-charcoal-dark select-none overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* رأس السكشن الانسيابي الموحد */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: premiumEase }}
                >
                    <SectionHeading 
                        tag={__('services.tag')}
                        title={isHome ? __('services.title.home') : __('services.title.page')} 
                        subtitle={__('services.subtitle')}
                        align="center"
                    />
                </motion.div>

                {/* Fluid Architectural Services Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-20"
                >
                    {services.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-gray-50/50 rounded-2xl text-gray-400 font-medium border border-dashed border-gray-200">
                            {__('services.empty')}
                        </div>
                    ) : (
                        services.map((service) => {
                            return (
                                <Link 
                                    key={service.id}
                                    href={route('site.services.show', service.id)}
                                    className="block group h-full"
                                >
                                    <motion.div 
                                        variants={cardVariants}
                                        // ⚡ التعديل الثالث: حركة Hover بفيزياء زنبركية مشدودة جداً لاستجابة فورية
                                        whileHover={{ 
                                            y: -8,
                                            transition: { type: "spring", stiffness: 400, damping: 25 }
                                        }}
                                        // 🛠️ الحل الجذري: إزالة transition-all التي تقتل Framer Motion، واستبدالها بـ transition-colors transition-shadow لحماية الظلال والألوان فقط وتقليل المدة لـ 300
                                        className="bg-white h-full p-7 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-charcoal/[0.05] transition-colors transition-shadow duration-300 flex flex-col relative overflow-hidden"
                                    >
                                        {/* الخط العلوي الذهبي */}
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold to-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left rtl:origin-right" />

                                        {/* البادج الهندسي للأيقونة: تم تسريع استجابته لـ 300ms ليكون Snappy */}
                                        <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 mb-6 text-charcoal group-hover:bg-gold group-hover:text-white group-hover:border-gold group-hover:shadow-lg group-hover:shadow-gold/30 transition-all duration-300 ease-out transform group-hover:-translate-y-1.5">
                                            {renderIcon(service.icon)}
                                        </div>
                                        
                                        {/* عنوان الخدمة */}
                                        <h3 className="text-lg font-extrabold text-charcoal-dark uppercase tracking-wide mb-3 group-hover:text-gold transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        
                                        {/* وصف الخدمة */}
                                        <p className="text-gray-500 leading-relaxed text-sm flex-1 font-medium line-clamp-3 mb-8">
                                            {service.description}
                                        </p>

                                        {/* زر الاستكشاف */}
                                        <div className="mt-auto flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-gray-400 group-hover:text-gold transition-colors duration-300">
                                            <span>{__('services.explore')}</span>
                                            <ArrowUpRight 
                                                size={16} 
                                                className="stroke-[2.5] transform group-hover:translate-x-1 group-hover:-translate-y-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1 transition-transform duration-300 ease-out" 
                                            />
                                        </div>

                                        {/* لمحة توهج خلفية */}
                                        <div className="absolute -bottom-10 -right-10 w-28 h-28 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rtl:-left-10 rtl:-right-auto" />
                                    </motion.div>
                                </Link>
                            );
                        })
                    )}
                </motion.div>
            </div>
        </section>
    );
}