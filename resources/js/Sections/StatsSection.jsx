// resources/js/Sections/StatsSection.jsx
import { motion } from 'framer-motion';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة والبطيئة لتعكس الثقل
const premiumEase = [0.16, 1, 0.3, 1];

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

    const stats = [
        { metric: "15+", label: __('stats.innovation.label'), sub: __('stats.innovation.sub') },
        { metric: "120+", label: __('stats.projects.label'), sub: __('stats.projects.sub') },
        { metric: "45+", label: __('stats.fleet.label'), sub: __('stats.fleet.sub') },
        { metric: "35+", label: __('stats.staff.label'), sub: __('stats.staff.sub') }
    ];

    return (
        <section className="py-24 bg-charcoal-dark text-white relative overflow-hidden select-none border-t border-b border-white/[0.02]">
            {/* اللمسات الهندسية الخلفية - هالات توهج ذهبية خافتة وفخمة جداً في الأطراف */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-gold/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                
                {/* شبكة توزيع العدادات الاستراتيجية */}
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
                            whileHover={{ y: -4 }}
                            className="space-y-3 p-4 rounded-2xl transition-all duration-500 hover:bg-white/[0.01] border border-transparent hover:border-white/[0.03]"
                        >
                            {/* الرقم الرقمي الضخم المتوهج بالذهب والخط السميك الصارم */}
                            <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gold-light via-gold to-gold-dark tracking-tight">
                                {stat.metric}
                            </p>
                            
                            {/* المسمى الوظيفي الرئيسي للعداد */}
                            <h4 className="text-xs font-black uppercase tracking-widest text-white pt-2 border-t border-white/5 max-w-[200px] mx-auto lg:mx-0">
                                {stat.label}
                            </h4>
                            
                            {/* الشرح المصغر الذي يعطي أبعاد بروفيشينال للشركة */}
                            <p className="text-[11px] text-gray-500 font-medium tracking-wide">
                                {stat.sub}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}