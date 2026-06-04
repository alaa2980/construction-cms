// resources/js/Pages/Frontend/Projects/Sections/ProjectHero.jsx
import { motion } from 'framer-motion';

export default function ProjectHero({ project }) {
    return (
        <section className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-charcoal-dark">
            {/* الصورة الأساسية مع تأثير زوم هادئ */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
            >
                <img 
                    src={project.cover_image} 
                    className="w-full h-full object-cover"
                    alt={project.title}
                />
                {/* طبقات العزل الفاخرة: حماية الهيدر من الأعلى والجمالية من الأسفل */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal-dark/70 via-transparent to-charcoal-dark/90" />
            </motion.div>

            {/* نصوص العنوان */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-end pb-16 md:pb-24">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 backdrop-blur-md border border-gold/30 text-gold-light text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                        {project.category?.name || 'Architectural Work'}
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-[1.1]">
                        {project.title}
                    </h1>
                </motion.div>
            </div>
        </section>
    );
}