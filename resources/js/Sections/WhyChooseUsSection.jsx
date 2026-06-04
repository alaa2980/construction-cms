// resources/js/Sections/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { ShieldCheck, Cpu, Clock, HardHat } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة الموحدة للهوية البصرية
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.1 }
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

export default function WhyChooseUs() {
    const { __ } = useTrans();

    const pillars = [
        {
            icon: Cpu,
            title: __('whyUs.pillars.precision.title'),
            desc: __('whyUs.pillars.precision.desc')
        },
        {
            icon: ShieldCheck,
            title: __('whyUs.pillars.autonomy.title'),
            desc: __('whyUs.pillars.autonomy.desc')
        },
        {
            icon: Clock,
            title: __('whyUs.pillars.timeliness.title'),
            desc: __('whyUs.pillars.timeliness.desc')
        },
        {
            icon: HardHat,
            title: __('whyUs.pillars.safety.title'),
            desc: __('whyUs.pillars.safety.desc')
        }
    ];

    return (
        <section className="py-20 bg-white text-charcoal-dark overflow-hidden select-none">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
                    
                    {/* العمود الأيسر: فلسفة التميز والصدارة العريضة */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: premiumEase }}
                        className="w-full lg:w-1/3 lg:sticky lg:top-36 space-y-6"
                    >
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold block">
                            {__('whyUs.tag')}
                        </span>
                        <h2 className="text-3xl md:text-4xl font-black text-charcoal-dark uppercase tracking-tight leading-[1.15]">
                            {__('whyUs.title')}
                        </h2>
                        <div className="w-16 h-[2px] bg-gold rounded-full" />
                        <p className="text-gray-500 text-sm font-medium leading-[1.8] pt-2">
                            {__('whyUs.description')}
                        </p>
                    </motion.div>

                    {/* العمود الأيمن: شبكة الميزات التنافسية الاستراتيجية الأربعة */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8"
                    >
                        {pillars.map((item, index) => {
                            return (
                                <motion.div
                                    key={index}
                                    variants={cardVariants}
                                    whileHover={{ y: -6 }}
                                    className="bg-accent/30 p-8 rounded-2xl border border-gray-100/60 hover:border-gold/30 hover:bg-white hover:shadow-xl hover:shadow-charcoal/[0.03] transition-all duration-500 flex flex-col relative overflow-hidden group"
                                >
                                    {/* بادج الأيقونة: يتحول لخلفية داكنة فخمة مع حركة Hover */}
                                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 mb-6 text-charcoal group-hover:bg-charcoal group-hover:text-gold transition-all duration-500 ease-out transform group-hover:rotate-3">
                                        <item.icon className="w-5 h-5 stroke-[1.8]" />
                                    </div>
                                    
                                    {/* العنوان الصارم والسميك */}
                                    <h3 className="text-base font-black text-charcoal-dark uppercase tracking-tight mb-3 group-hover:text-gold transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    
                                    {/* الوصف الفني العميق والواضح لثقل الشركة */}
                                    <p className="text-gray-500 leading-[1.75] text-xs font-medium flex-1">
                                        {item.desc}
                                    </p>

                                    {/* لمحة توهج خلفية ناعمة جداً تظهر عند الـ Hover في الزاوية */}
                                    <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}