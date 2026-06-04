// resources/js/Sections/AboutSection.jsx
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/Components/UI/SectionHeading';
import { useTrans } from '@/Hooks/useTrans';

// توكنات الحركة الهندسية الفاخرة للموقع العام
const premiumEase = [0.16, 1, 0.3, 1];

const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const listItemVariants = {
    hidden: { opacity: 0, x: -15 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: premiumEase }
    }
};

export default function AboutSection({ pyValue = "20", isHome }) {
    const { __ } = useTrans();

    const coreValues = [
        __('about.values.0'),
        __('about.values.1'),
        __('about.values.2'),
        __('about.values.3')
    ];

    return (
        <section className={`py-${pyValue} bg-white text-charcoal-dark overflow-hidden select-none`}>
            <div className="container mx-auto px-6 lg:px-12">
                
                {/* Unified SectionHeading with premium tag rendering */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: premiumEase }}
                >
                    <SectionHeading
                        tag={__('about.tag')}
                        title={isHome ? __('about.title.home') : __('about.title.page')}
                        subtitle={__('about.subtitle')}
                        align="center"
                    />
                </motion.div>

                {/* Content Layout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mt-24">
                    
                    {/* Left Column: Text Specifications */}
                    <div className="w-full space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: premiumEase }}
                        >
                            <h3 className="text-2xl md:text-3xl font-black text-charcoal-dark uppercase tracking-tight mb-6">
                                {__('about.heading')}
                            </h3>
                            
                            <p className="text-gray-500 text-sm md:text-base leading-[1.8] mb-5 font-medium">
                                {__('about.paragraph1')}
                            </p>
                            
                            <p className="text-gray-500 text-sm md:text-base leading-[1.8] mb-8 font-medium">
                                {__('about.paragraph2')}
                            </p>
                        </motion.div>

                        {/* Core Values with Staggered Interactive Micro Indicators */}
                        <motion.ul 
                            variants={listContainerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-8 mt-8"
                        >
                            {coreValues.map((value, index) => (
                                <motion.li 
                                    key={index} 
                                    variants={listItemVariants}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center gap-3 text-charcoal-dark font-bold text-sm tracking-wide group cursor-default"
                                >
                                    <CheckCircle2 size={15} className="text-gold group-hover:scale-110 transition-transform duration-300 flex-shrink-0 stroke-[2.5]" />
                                    <span className="transition-colors duration-300 group-hover:text-gold">{value}</span>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </div>

                    {/* Right Column: Architectural Image & Premium Stats Frame */}
                    <div className="w-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
                            className="relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-charcoal/[0.04] transition-all duration-500 h-[440px] md:h-[500px] bg-gray-50 border border-gray-100/70 group"
                        >
                            {/* Smooth micro zoom on card hover */}
                            <img
                                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2071&auto=format&fit=crop"
                                alt={__('about.imageAlt')}
                                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                                loading="lazy"
                            />
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}