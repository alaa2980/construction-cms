import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import SectionHeading from '@/Components/UI/SectionHeading';
import { useTrans } from '@/Hooks/useTrans';

// المعيار العالمي للـ Easing الفاخر للموقع العام
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: { 
        opacity: 1, 
        y: 0,
        scale: 1,
        transition: { duration: 0.8, ease: premiumEase }
    }
};

export default function Services({ services = [], isHome = false }) {
    const { __ } = useTrans();
    
    // دالة ذكية لتوليد الأيقونة المخصصة من قاعدة البيانات مباشرة مع فصيل حماية آمن
    const renderIcon = (iconName) => {
        const IconComponent = LucideIcons[iconName];
        if (!IconComponent) return <LucideIcons.Building2 className="w-5 h-5 stroke-[1.8]" />;
        return <IconComponent className="w-5 h-5 stroke-[1.8]" />;
    };

    return (
        <section className="py-20 bg-white text-charcoal-dark select-none overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* رأس السكشن الانسيابي الموحد للهوية البصرية */}
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

                {/* Light, Clean Services Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-24"
                >
                    {services.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-gray-50/50 rounded-2xl text-gray-400 font-medium border border-dashed border-gray-100">
                            {__('services.empty')}
                        </div>
                    ) : (
                        services.map((service) => {
                            return (
                                <Link 
                                    key={service.id}
                                    href={route('site.services.show', service.id)}
                                    className="block group"
                                >
                                    <motion.div 
                                        variants={cardVariants}
                                        whileHover={{ y: -8 }}
                                        className="bg-accent/30 h-full p-8 rounded-2xl border border-gray-100/70 hover:border-gold/30 hover:bg-white hover:shadow-xl hover:shadow-charcoal/[0.03] transition-all duration-500 flex flex-col relative overflow-hidden group"
                                    >
                                        {/* البادج الهندسي للأيقونة: يتحول لخلفية داكنة فخمة مع حركة Hover */}
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 mb-8 text-charcoal group-hover:bg-charcoal group-hover:text-gold transition-all duration-500 ease-out transform group-hover:rotate-3">
                                            {renderIcon(service.icon)}
                                        </div>
                                        
                                        {/* عنوان الخدمة: يضيء بالذهب الخالص بسلاسة خطية */}
                                        <h3 className="text-lg font-black text-charcoal-dark uppercase tracking-tight mb-4 group-hover:text-gold transition-colors duration-300">
                                            {service.title}
                                        </h3>
                                        
                                        {/* وصف الخدمة المقصوص ديناميكياً لراحة العين وثبات أبعاد الشبكة */}
                                        <p className="text-gray-500 leading-[1.75] text-sm flex-1 font-medium line-clamp-3 mb-6">
                                            {service.description}
                                        </p>

                                        {/* سهم الاستكشاف الإشاري المخفي: ينبثق بنعومة فائقة عند تمرير الماوس */}
                                        <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gold opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <span>{__('services.explore')}</span>
                                            <ArrowUpRight size={13} className="stroke-[2.5] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                                        </div>

                                        {/* لمحة توهج خلفية ناعمة جداً تظهر عند الـ Hover في الزاوية */}
                                        <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
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