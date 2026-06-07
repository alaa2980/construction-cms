// resources/js/Sections/StatsSection.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة
const premiumEase = [0.16, 1, 0.3, 1];

// 🚀 الميزة الجديدة 1: مكون العدّاد الذكي (مبني بـ Framer Motion)
function Counter({ value }) {
    const ref = useRef(null);
    // مراقبة ظهور العنصر في الشاشة (مرة واحدة فقط)
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            // تشغيل حركة العد من 0 إلى الرقم النهائي
            const controls = animate(0, value, {
                duration: 2.5, // مدة العد (بطيئة وفخمة)
                ease: premiumEase,
                onUpdate(currentValue) {
                    setCount(Math.floor(currentValue));
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return <span ref={ref}>{count}</span>;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
};

const statItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: premiumEase }
    }
};

export default function StatsSection() {
    const { __ } = useTrans();

    // 🚀 التعديل هنا: فصلنا الرقم عن علامة الزائد (+) لكي نتمكن من عد الرقم رياضياً
    const stats = [
        { value: 15, suffix: "+", label: __('stats.innovation.label'), sub: __('stats.innovation.sub') },
        { value: 120, suffix: "+", label: __('stats.projects.label'), sub: __('stats.projects.sub') },
        { value: 45, suffix: "+", label: __('stats.fleet.label'), sub: __('stats.fleet.sub') },
        { value: 35, suffix: "+", label: __('stats.staff.label'), sub: __('stats.staff.sub') }
    ];

    return (
        <section className="py-24 bg-charcoal-dark text-white relative overflow-hidden select-none border-t border-b border-white/[0.02]">
            {/* اللمسات الهندسية الخلفية */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-80px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 divider-y sm:divider-y-0 text-center lg:text-start"
                >
                    {stats.map((stat, index) => (
                        <motion.div 
                            key={index}
                            variants={statItemVariants}
                            whileHover={{ y: -6 }}
                            className="space-y-3 p-6 rounded-2xl transition-all duration-500 hover:bg-white/[0.02] border border-transparent hover:border-white/[0.04] relative group overflow-hidden"
                        >
                            {/* الرقم الرقمي الضخم */}
                            <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold to-gold-dark tracking-tight relative z-10">
                                <span className="inline-block">
                                    <Counter value={stat.value} />
                                    <span>{stat.suffix}</span>
                                </span>
                            </p>
                            
                            {/* المسمى الوظيفي الرئيسي للعداد */}
                            <h4 className="text-xs font-black uppercase tracking-widest text-white pt-2 border-t border-white/5 max-w-[200px] mx-auto lg:mx-0 relative z-10">
                                {stat.label}
                            </h4>
                            
                            {/* الشرح المصغر: تم تفتيح اللون إلى gray-400 ليكون مقروءاً بوضوح على الخلفية الداكنة */}
                            <p className="text-[11px] text-gray-400 font-medium tracking-wide group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                                {stat.sub}
                            </p>

                            {/* الفاصل العمودي للشاشات الكبيرة فقط (تم إلغاء الفاصل الأفقي للموبايل والاعتماد على الفراغ) */}
                            {index !== stats.length - 1 && (
                                <div className="hidden lg:block absolute top-1/4 bottom-1/4 -end-4 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />
                            )}

                            {/* اللمسة الأخيرة: توهج ذهبي داخلي خافت جداً يظهر عند مرور الماوس */}
                            <div className="absolute inset-0 bg-gradient-to-b from-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}