// resources/js/Sections/CtaSection.jsx
import { Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '@/Components/UI/Button';
import { useTrans } from '@/Hooks/useTrans';

export default function CtaSection() {
    const { __ } = useTrans();

    return (
        <section className="py-24 bg-charcoal-dark relative overflow-hidden select-none">
            
            {/* التوهج المعماري الساحر والخفي في الخلفية */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-6 text-center relative z-10">
                
                {/* العنوان السينمائي الفخم بحركة دخول انسيابية */}
                <motion.h2 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6"
                >
                    {__('cta.title.part1')}<span className="text-gold">{__('cta.title.part2')}</span>
                </motion.h2>
                
                {/* النص الوصفي */}
                <motion.p 
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                    className="text-gray-400 max-w-2xl mx-auto mb-10 font-medium text-sm md:text-base leading-relaxed"
                >
                    {__('cta.subtitle')}
                </motion.p>
                
                {/* الزر المعماري الفاخر الموجه للتواصل */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                >
                    <Link href={route('site.contact.index')} className="inline-block">
                        <Button variant="primary" className="!bg-gold !text-charcoal-dark font-black text-xs uppercase tracking-widest px-10 py-4 rounded-xl group shadow-xl shadow-gold/5 hover:shadow-gold/15 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                            <span>{__('cta.button')}</span>
                            {/* السهم ينقلب اتجاهه في العربية وتنعكس حركته تلقائياً */}
                            <ArrowRight className="transition-transform stroke-[2.5] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" size={14} />
                        </Button>
                    </Link>
                </motion.div>
                
            </div>
        </section>
    );
}