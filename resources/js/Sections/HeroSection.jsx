// resources/js/Components/Frontend/HeroSection.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight, Building2, ShieldCheck, Trophy } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Button from '@/Components/UI/Button';
import { useTrans } from '@/Hooks/useTrans';

export default function HeroSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { __ } = useTrans();

    const sliderData = [
        {
            id: 1,
            title: __('hero.slides.0.title'),
            subtitle: __('hero.slides.0.subtitle'),
            description: __('hero.slides.0.description'),
            image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80',
            tag: __('hero.slides.0.tag')
        },
        {
            id: 2,
            title: __('hero.slides.1.title'),
            subtitle: __('hero.slides.1.subtitle'),
            description: __('hero.slides.1.description'),
            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80',
            tag: __('hero.slides.1.tag')
        },
        {
            id: 3,
            title: __('hero.slides.2.title'),
            subtitle: __('hero.slides.2.subtitle'),
            description: __('hero.slides.2.description'),
            image: 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80',
            tag: __('hero.slides.2.tag')
        }
    ];

    // الهندسة المثالية للتايمر: حماية الذاكرة من الـ Memory Leaks والحفاظ على ثبات الـ 6 ثوانٍ كاملة
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % sliderData.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [sliderData.length]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % sliderData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + sliderData.length) % sliderData.length);
    };

    const textVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay }
        })
    };

    return (
        <section className="relative h-screen w-full bg-charcoal-dark overflow-hidden select-none flex flex-col justify-between">
            
            {/* Background Image Carousel Layer */}
            <div className="absolute inset-0 w-full h-full z-0">
                <AnimatePresence initial={false} mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: 'easeInOut' }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <motion.div 
                            initial={{ scale: 1 }}
                            animate={{ scale: 1.04 }}
                            transition={{ duration: 6, ease: 'linear' }}
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${sliderData[currentIndex].image})` }}
                        />
                        {/* غشاء التدرج اللوني المعماري الناعم لحماية وضوح الكلمات */}
                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/60 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-dark/70 via-transparent to-charcoal-dark/30" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Main Interactive Typographic Content Workspace */}
            <div className="relative z-10 container mx-auto px-8 md:px-16 lg:px-24 flex-1 flex items-center text-start pt-20">
                <div className="max-w-4xl">
                    
                    {/* Upper Minimal Dynamic Tag */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`tag-${currentIndex}`}
                            custom={0}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gold/10 border border-gold/20 text-gold-light text-[11px] font-black uppercase tracking-wider mb-6 shadow-sm backdrop-blur-sm"
                        >
                            <Building2 size={12} className="text-gold" />
                            <span>{sliderData[currentIndex].tag}</span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Architectural Dynamic Subtitle */}
                    <AnimatePresence mode="wait">
                        <motion.h4
                            key={`sub-${currentIndex}`}
                            custom={0.08}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-gold uppercase tracking-[0.2em] font-black text-[11px] md:text-xs mb-4"
                        >
                            {sliderData[currentIndex].subtitle}
                        </motion.h4>
                    </AnimatePresence>

                    {/* Main Cinematic Title */}
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={`title-${currentIndex}`}
                            custom={0.15}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-3xl md:text-5xl lg:text-5xl font-black text-white leading-[1.15] md:leading-[1.12] mb-6 tracking-tight uppercase"
                        >
                            {sliderData[currentIndex].title}
                        </motion.h1>
                    </AnimatePresence>

                    {/* Content Description */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${currentIndex}`}
                            custom={0.22}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="text-gray-300/90 text-xs md:text-sm lg:text-base max-w-2xl leading-relaxed mb-10 font-medium"
                        >
                            {sliderData[currentIndex].description}
                        </motion.p>
                    </AnimatePresence>

                    {/* Structural Call To Actions (CTA) Buttons */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`btns-${currentIndex}`}
                            custom={0.3}
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex flex-wrap items-center gap-4"
                        >
                            <Link href={route('site.portfolio.index')}>
                                <Button variant="primary" className="!bg-gradient-to-r !from-gold-dark !to-gold !text-charcoal-dark text-xs font-black uppercase tracking-wider px-8 py-4 shadow-xl shadow-gold/5 hover:shadow-gold/15 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 group rounded-xl">
                                    <span>{__('hero.buttons.explore')}</span>
                                    
                                    {/* السهم يلتف ليشير لليسار في العربية، وتتحرك حركته مع اتجاه رأسه الجديد */}
                                    <ArrowRight size={14} className="transition-transform duration-300 stroke-[2.5] group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
                                </Button>
                            </Link>

                            <Link href={route('site.contact.index')}>
                                <Button className="border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-wider px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-0.5">
                                    {__('hero.buttons.quote')}
                                </Button>
                            </Link>
                        </motion.div>
                    </AnimatePresence>

                </div>
            </div>

            {/* CLASSIC SIDE ARROWS */}
            {/* Left Side Floating Arrow (Go Back) */}
            <div className="absolute inset-y-0 left-6 z-20 hidden md:flex items-center">
                <button
                    onClick={handlePrev}
                    className="w-11 h-11 rounded-full border border-white/5 bg-charcoal-dark/20 hover:bg-charcoal-dark/60 backdrop-blur-md text-gray-400 hover:text-gold hover:border-gold/30 hover:scale-105 transition-all duration-300 flex items-center justify-center focus:outline-none shadow-xl"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={18} className="stroke-[2.5]" />
                </button>
            </div>

            {/* Right Side Floating Arrow (Go Forward) */}
            <div className="absolute inset-y-0 right-6 z-20 hidden md:flex items-center">
                <button
                    onClick={handleNext}
                    className="w-11 h-11 rounded-full border border-white/5 bg-charcoal-dark/20 hover:bg-charcoal-dark/60 backdrop-blur-md text-gray-400 hover:text-gold hover:border-gold/30 hover:scale-105 transition-all duration-300 flex items-center justify-center focus:outline-none shadow-xl"
                    aria-label="Next slide"
                >
                    <ChevronRight size={18} className="stroke-[2.5]" />
                </button>
            </div>

            {/* MINIMALIST PROGRESS DOTS - تم تصحيح الأبعاد لتصبح متجاوبة تماماً مع شاشات الجوال */}
            <div className="absolute bottom-6 md:bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-charcoal-dark/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/[0.02]">
                {sliderData.map((slide, index) => (
                    <button
                        key={slide.id}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none ${
                            index === currentIndex ? 'w-6 bg-gold' : 'w-1.5 bg-white/20 hover:bg-white/50'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Permanent Trust & Authority Footer Blueprint Bar */}
            <div className="relative z-20 w-full h-16 bg-charcoal-dark/80 backdrop-blur-md border-t border-white/5 hidden lg:block mt-auto select-none">
                <div className="container mx-auto h-full px-12 flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
                    <div className="flex items-center gap-2.5">
                        <Trophy size={13} className="text-gold animate-pulse" /> 
                        <span>{__('hero.trustBar.contractor')}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <ShieldCheck size={13} className="text-gold" /> 
                        <span>{__('hero.trustBar.compliance')}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Building2 size={13} className="text-gold" /> 
                        <span>{__('hero.trustBar.projects')}</span>
                    </div>
                </div>
            </div>

        </section>
    );
}