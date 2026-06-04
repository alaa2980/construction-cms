// resources/js/Components/Frontend/Header.jsx
import { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, PhoneCall, Clock, Mail } from 'lucide-react';
import Button from '@/Components/UI/Button';
import { useTrans } from '@/Hooks/useTrans';

export default function Header({ settings = {} }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hoveredPath, setHoveredPath] = useState(null);
    
    const email = settings.company_email || 'info@constructionco.com';
    const phone = settings.company_phone || '+967 772094945';

    const { currentLocale, getSwitchLanguageUrl, __ } = useTrans();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // استخدام أسماء الروابط (Route Names) المحددة في web.php بدلاً من الروابط الثابتة
    const navLinks = [
        { name: __('nav.home'), routeName: 'site.home' },
        { name: __('nav.about'), routeName: 'site.about' },
        { name: __('nav.services'), routeName: 'site.services.index' },
        { name: __('nav.portfolio'), routeName: 'site.portfolio.index' }, 
        { name: __('nav.contact'), routeName: 'site.contact.index' },
    ];

    const changeLanguage = (e, nextLocale) => {
        e.preventDefault();
        
        const currentPath = window.location.pathname; 
        const pathSegments = currentPath.split('/'); 
        
        pathSegments[1] = nextLocale; 
        
        const newPath = pathSegments.join('/');
        
        window.location.href = window.location.origin + newPath + window.location.search;
    };

    return (
        <>
            <motion.header
                initial={{ y: -120, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md flex flex-col ${
                    isScrolled
                        ? 'bg-charcoal-dark/90 shadow-2xl border-b border-gold/10 py-3.5'
                        : 'bg-charcoal-dark/15 border-b border-white/[0.02] py-0 shadow-sm' 
                }`}
            >
{/* ─── INTEGRATED TOPBAR COMPONENT ─── */}
                <div className={`bg-charcoal-dark/95 border-b border-white/[0.03] text-gray-400 px-6 lg:px-12 select-none text-[11px] font-bold uppercase tracking-widest hidden md:block transition-all duration-500 ease-in-out ${
                    isScrolled ? 'h-0 py-0 opacity-0 overflow-hidden border-none' : 'py-2.5 opacity-100 h-auto'
                }`}>
                    <div className="container mx-auto flex justify-between items-center max-w-7xl">
                        {/* ─── المواعيد وساعات التشغيل والإيميل المطور ─── */}
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 text-gray-400/80">
                                <Clock size={12} className="text-gold stroke-[2.5]" />
                                <span>{__('header.workingHours')}</span>
                            </span>
                            
                            {/* جعل الإيميل رابطاً قابلاً للنقر مع دمج الخط الفاصل ليزول تلقائياً عند الاختفاء */}
                            {settings.company_email && (
                                /* 🌐 تم تحويل border-l و pl-6 إلى border-s و ps-6 لينضبط الخط الفاصل تلقائياً في العربي */
                                <span className="hidden lg:flex items-center gap-2 text-gray-400/80 border-s border-white/[0.06] ps-6">
                                    <Mail size={12} className="text-gold stroke-[2.5]" />
                                    <a 
                                        href={`mailto:${email}`}
                                        className="lowercase transition-colors duration-300 hover:text-white cursor-pointer"
                                    >
                                        {email}
                                    </a>
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-5">
                            {/* ضبطنا المارجن الخارجي ليكون مرناً مع الاتجاه بدلاً من mr-2 الجامد */}
                            <span className="text-gray-500 me-2 text-[10px]">
                                {__('header.hqLine')}:{' '}
                                <a 
                                    href={`tel:${phone}`} 
                                    className="text-gray-300 font-black tracking-normal hover:text-gold transition-colors duration-300"
                                Dad>
                                    {phone}
                                </a>
                            </span>
                            
                            {/* تعديل الـ transitions هنا لتتحرك الأيقونات بنعومة مذهلة */}
                            {/* 🌐 تم تحويل border-l و pl-5 إلى border-s و ps-5 لينقلب الفاصل قبل أيقونات السوشيال ميديا */}
                            <div className="flex items-center gap-4 border-s border-white/[0.06] ps-5">
                                <a href={settings.facebook_url || '#'} target="_blank" rel="noreferrer" className="hover:text-gold transition-all duration-300 ease-in-out transform hover:scale-110 block">
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
                                </a>
                                <a href={settings.twitter_url || '#'} target="_blank" rel="noreferrer" className="hover:text-gold transition-all duration-300 ease-in-out transform hover:scale-110 block">
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                                <a href={settings.linkedin_url || '#'} target="_blank" rel="noreferrer" className="hover:text-gold transition-all duration-300 ease-in-out transform hover:scale-110 block">
                                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                                </a>
                            </div>

                            {/* زر تبديل اللغة الاحترافي للكمبيوتر */}
                            {/* 🌐 تم تحويل border-l و pl-5 إلى border-s و ps-5 لينضبط فاصل اللغة الأخير */}
                            <div className="border-s border-white/[0.06] ps-5 flex items-center">
                                {currentLocale === 'en' ? (
                                    <a 
                                        href={getSwitchLanguageUrl('ar')}
                                        onClick={(e) => changeLanguage(e, 'ar')}
                                        className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors duration-300 font-bold"
                                    >
                                        <span className="text-[10px] bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded uppercase tracking-normal hover:border-gold/30">
                                            {__('header.language.switchToAr')}
                                        </span>
                                    </a>
                                ) : (
                                    <a 
                                        href={getSwitchLanguageUrl('en')}
                                        onClick={(e) => changeLanguage(e, 'en')}
                                        className="flex items-center gap-1.5 text-gray-400 hover:text-gold transition-colors duration-300 font-bold"
                                    >
                                        <span className="text-[10px] bg-white/[0.03] border border-white/[0.06] px-1.5 py-0.5 rounded uppercase tracking-normal hover:border-gold/30">
                                            {__('header.language.switchToEn')}
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── MAIN NAVBAR CONTAINER ─── */}
                <div className={`container mx-auto px-6 lg:px-12 flex justify-between items-center w-full transition-all duration-500 ${
                    !isScrolled ? 'py-5' : 'py-0'
                }`}>
                    <div className="flex items-center gap-2 select-none">
                        <Link href={route('site.home')} className="group relative flex items-center gap-3">
                            <div className="w-9 h-9 border-2 border-gold flex items-center justify-center rotate-45 group-hover:rotate-180 transition-transform duration-700 ease-in-out">
                                <span className="-rotate-45 block font-black text-base text-gold group-hover:scale-110 transition-transform">C</span>
                            </div>
                            <div className="flex flex-col text-start">
                                <span className="text-lg font-black tracking-wider text-white group-hover:text-gold transition-colors duration-300">
                                    {__('header.logo.title')}
                                </span>
                                <span className="text-[9px] uppercase tracking-[0.25em] text-gold-light/90 font-bold">
                                    {__('header.logo.subtitle')}
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* روابط التصفح للكمبيوتر (Desktop) */}
                    <nav className="hidden md:flex items-center gap-1 font-semibold select-none">
                        {navLinks.map((link) => {
                            // 💡 شرط ذكي: يضيء الأب إذا كنا بالصفحة الرئيسية أو أي صفحة تابعة لها (تفاصيل)
                            const rootRouteName = link.routeName.replace('.index', '');
                            const isActive = route().current(link.routeName) || route().current(`${rootRouteName}.*`);
                            
                            return (
                                <Link
                                    key={link.routeName}
                                    href={route(link.routeName)}
                                    onMouseEnter={() => setHoveredPath(link.routeName)}
                                    onMouseLeave={() => setHoveredPath(null)}
                                    className={`relative px-4 py-2 text-xs font-black uppercase tracking-wider transition-colors duration-300 rounded-lg ${
                                        isActive ? 'text-gold' : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    <span className="relative z-10">{link.name}</span>
                                    
                                    {hoveredPath === link.routeName && (
                                        <motion.span
                                            layoutId="navHover"
                                            className="absolute inset-0 bg-white/[0.06] rounded-lg -z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: 'spring', stiffness: 350, damping: 32 }}
                                        />
                                    )}
                                    
                                    {isActive && (
                                        <motion.span 
                                            layoutId="activeLine"
                                            className="absolute bottom-[-2px] left-4 right-4 h-[2px] bg-gradient-to-r from-gold to-gold-dark rounded-full"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-4 select-none">
                        <Link href={route('site.contact.index')}>
                            <Button variant="primary" className="!bg-gradient-to-r !from-gold-dark !to-gold !text-charcoal-dark text-xs font-black uppercase tracking-wider px-6 py-3 shadow-lg shadow-gold/10 hover:shadow-gold/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 rounded-xl">
                                <PhoneCall size={13} className="stroke-[2.5]" />
                                {__('common.buttons.requestConsultation')}
                            </Button>
                        </Link>
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-300 hover:text-gold transition-colors focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* نافذة الموبايل المنبثقة المحسنة والمطابقة للمعاير العالمية */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-x-0 top-[70px] z-40 md:hidden bg-charcoal-dark/95 backdrop-blur-xl border-b border-gold/10 px-6 py-8 shadow-2xl"
                    >
                        <nav className="flex flex-col gap-4 text-start">
                            {navLinks.map((link) => {
                                // 💡 نفس الشرط الذكي يطبق هنا أيضاً لشاشات الهواتف الجوالة
                                const rootRouteName = link.routeName.replace('.index', '');
                                const isActive = route().current(link.routeName) || route().current(`${rootRouteName}.*`);
                                
                                return (
                                    <Link
                                        key={link.routeName}
                                        href={route(link.routeName)}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`text-sm font-black uppercase tracking-wider py-2.5 pl-4 border-l-2 transition-all rounded-r-lg ${
                                            isActive 
                                                ? 'border-gold text-gold bg-gold/[0.03]' 
                                                : 'border-transparent text-gray-300 hover:text-white hover:bg-white/[0.01]'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            
                            <div className="pt-4 border-t border-white/[0.04] mt-2 flex flex-col gap-4">
                                <Link href={route('site.contact.index')} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Button variant="primary" className="w-full !bg-gradient-to-r !from-gold-dark !to-gold !text-charcoal-dark text-xs font-black uppercase tracking-wider justify-center py-3.5 rounded-xl shadow-xl shadow-gold/5">
                                        {__('common.buttons.requestConsultation')}
                                    </Button>
                                </Link>

                                {/* 🌐 زر تبديل اللغة المخصص للموبايل بتصميم متناسق */}
                                <div className="flex justify-center pt-2">
                                    {currentLocale === 'en' ? (
                                        <a 
                                            href={getSwitchLanguageUrl('ar')}
                                            onClick={(e) => changeLanguage(e, 'ar')}
                                            className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-gold transition-colors duration-300 font-bold w-full py-2.5 border border-white/[0.06] rounded-xl bg-white/[0.02]"
                                        >
                                            <span className="text-[11px] uppercase tracking-wider">
                                                {__('header.language.mobileChangeToAr')}<span className="text-gold font-black">{__('header.language.switchToAr')}</span>
                                            </span>
                                        </a>
                                    ) : (
                                        <a 
                                            href={getSwitchLanguageUrl('en')}
                                            onClick={(e) => changeLanguage(e, 'en')}
                                            className="flex items-center justify-center gap-1.5 text-gray-400 hover:text-gold transition-colors duration-300 font-bold w-full py-2.5 border border-white/[0.06] rounded-xl bg-white/[0.02]"
                                        >
                                            <span className="text-[11px] uppercase tracking-wider">
                                                {__('header.language.mobileChangeToEn')}<span className="text-gold font-black">{__('header.language.switchToEn')}</span>
                                            </span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}