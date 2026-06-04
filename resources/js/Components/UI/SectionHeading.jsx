// resources/js/Components/UI/SectionHeading.jsx
import { motion } from 'framer-motion';
import { cn } from '@/Utils/cn';

export default function SectionHeading({ 
    title, 
    subtitle, 
    tag, // Optional custom badge overlay string
    align = 'center', 
    className 
}) {
    // Determine structural alignment styles dynamically
    const alignmentStyles = {
        center: 'text-center items-center',
        left: 'text-left items-start',
        right: 'text-right items-end',
    };

    return (
        <div className={cn('flex flex-col mb-16', alignmentStyles[align], className)}>
            
            {/* Conditional Premium Tag/Badge Rendering */}
            {tag && (
                <motion.span
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-xs font-bold text-gold uppercase tracking-widest block mb-3"
                >
                    {tag}
                </motion.span>
            )}

            {/* Refactored Title with balanced typographic dimensions */}
            <motion.h2 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-charcoal-dark tracking-tight"
            >
                {title}
            </motion.h2>
            
            {/* Refactored Minimalist Gold Divider Line */}
            <motion.div 
                initial={{ opacity: 0, width: 0 }}
                whileInView={{ opacity: 1, width: "5rem" }} // Balanced modern architectural length
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="h-[3px] bg-gold rounded-full mt-3.5 mb-5"
            />

            {/* Refactored Subtitle with highly accurate responsive sizing */}
            {subtitle && (
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed"
                >
                    {subtitle}
                </motion.p>
            )}
        </div>
    );
}