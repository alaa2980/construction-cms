// resources/js/Sections/ProjectTimeline.jsx
import { motion } from 'framer-motion';
import { Compass, Cpu, HardHat, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/Components/UI/SectionHeading';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة الموحدة للهوية البصرية
const premiumEase = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

export default function ProjectTimeline({ pyValue = "20" }) {
    const { __ } = useTrans();

    const phases = [
        {
            phase: "01",
            icon: Compass,
            title: __('timeline.phases.01.title'),
            desc: __('timeline.phases.01.desc')
        },
        {
            phase: "02",
            icon: Cpu,
            title: __('timeline.phases.02.title'),
            desc: __('timeline.phases.02.desc')
        },
        {
            phase: "03",
            icon: HardHat,
            title: __('timeline.phases.03.title'),
            desc: __('timeline.phases.03.desc')
        },
        {
            phase: "04",
            icon: ShieldCheck,
            title: __('timeline.phases.04.title'),
            desc: __('timeline.phases.04.desc')
        }
    ];

    return (
        <section className={`py-${pyValue} bg-white text-charcoal-dark overflow-hidden select-none relative`}>
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* رأس السكشن الموحد المنسجم */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: premiumEase }}
                >
                    <SectionHeading 
                        tag={__('timeline.tag')}
                        title={__('timeline.title')} 
                        subtitle={__('timeline.subtitle')}
                        align="center"
                    />
                </motion.div>

                {/* الحاوية الهيكلية الكبرى للتايملاين */}
                <div className="relative mt-24 max-w-5xl mx-auto">
                    
                    {/* الخط المحوري الإنشائي المركزي للتايملاين (The Structural Axial Line) */}
                    <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-gray-100 via-gray-200 to-gray-100 md:-translate-x-[0.75px] pointer-events-none" />

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-16 md:space-y-24"
                    >
                        {phases.map((item, index) => {
                            const isEven = index % 2 === 0;
                            const IconComponent = item.icon;

                            return (
                                <div 
                                    key={index}
                                    className={`relative flex flex-col md:flex-row items-start ${
                                        isEven ? 'md:flex-row-reverse' : ''
                                    }`}
                                >
                                    {/* 1. الكتلة الفرعية: كرت البيانات المعماري الفاخر */}
                                    <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, x: isEven ? 30 : -30, y: 15 },
                                                visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.8, ease: premiumEase } }
                                            }}
                                            whileHover={{ y: -4 }}
                                            className="bg-accent/30 p-8 rounded-2xl border border-gray-100/70 hover:border-gold/30 hover:bg-white hover:shadow-xl hover:shadow-charcoal/[0.03] transition-all duration-500 relative group cursor-default"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-[10px] font-black tracking-widest text-gold uppercase bg-white px-3 py-1 border border-gray-100 rounded-md shadow-sm">
                                                    {__('timeline.phaseLabel')} {item.phase}
                                                </span>
                                                <div className="text-gray-300 group-hover:text-gold transition-colors duration-500">
                                                    <IconComponent className="w-5 h-5 stroke-[1.8]" />
                                                </div>
                                            </div>
                                            
                                            <h3 className="text-base font-black text-charcoal-dark uppercase tracking-tight mb-3 transition-colors duration-300 group-hover:text-gold">
                                                {item.title}
                                            </h3>
                                            
                                            <p className="text-gray-500 leading-[1.75] text-xs font-medium">
                                                {item.desc}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* 2. الكتلة الفرعية: نقطة التثبيت المحورية المركزية (The Axis Anchor Node) */}
                                    <div className="absolute left-4 md:left-1/2 top-8 -translate-x-[14px] md:-translate-x-1/2 z-10">
                                        <motion.div 
                                            variants={{
                                                hidden: { scale: 0.5, opacity: 0 },
                                                visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: premiumEase } }
                                            }}
                                            className="w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-md transition-all duration-500 hover:scale-110 group-hover:border-gold"
                                        >
                                            <div className="w-2.5 h-2.5 rounded-full bg-charcoal bg-gradient-to-b from-gold to-gold-dark" />
                                        </motion.div>
                                    </div>

                                    {/* مساحة تعويضية متزنة للجهة المقابلة في الشاشات الكبيرة لقوة التوزيع الهيكلي */}
                                    <div className="hidden md:block w-1/2" />
                                </div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
}