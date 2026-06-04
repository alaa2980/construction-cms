// resources/js/Components/Site/PageHeader.jsx
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

export default function PageHeader({ title, currentPage, bgImage }) {
    const { __ } = useTrans();
    
    // Default abstract structural image fallback if no dynamic image is passed
    const defaultBg = "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80";

    return (
        /* 💡 تم زيادة الارتفاع الكلي والحد الأدنى هنا لتعويض البادينج الجديد والحفاظ على اتزان الخلفية بصرياً */
        <div className="relative h-[42vh] min-h-[290px] md:h-[46vh] w-full bg-charcoal-dark overflow-hidden flex items-center select-none">
            
            {/* Background Image Layer with subtle cinematic structural feel */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat opacity-40 scale-102"
                    style={{ backgroundImage: `url(${bgImage || defaultBg})` }}
                />
                {/* Premium dark architectural mask overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark via-charcoal-dark/70 to-charcoal-dark/90" />
                <div className="absolute inset-0 bg-charcoal-dark/30 backdrop-blur-[2px]" />
            </div>

            {/* Content Container - 💡 تم زيادة الـ pt هنا لتدفع العنوان لأسفل الهيدر الثابت بنعومة فائقة */}
            <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col justify-center text-start pt-24 md:pt-32">
                
                {/* Elegant Dynamic Page Title */}
                <motion.h1 
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="text-3xl md:text-4xl lg:text-4xl font-extrabold text-white tracking-tight mb-4"
                >
                    {title}
                </motion.h1>

                {/* International Standard Breadcrumbs Navigation Path */}
                <motion.nav 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                    className="flex items-center gap-2 text-xs md:text-sm font-semibold tracking-wide"
                >
                    <Link 
                        href={route('site.home')} 
                        className="text-gray-400 hover:text-gold transition-colors duration-200"
                    >
                        {__('breadcrumbs.home')}
                    </Link>
                    
                    {/* الأيقونة هنا تلتف لتشير إلى اليسار في النسخة العربية تماشياً مع اتجاه القراءة */}
                    <ChevronRight size={14} className="text-gray-600 rtl:rotate-180" />
                    
                    <span className="text-gold font-bold">
                        {currentPage}
                    </span>
                </motion.nav>

                {/* Sleek architectural dynamic micro border light bottom indicator */}
                <div className="absolute bottom-[-100px] left-6 lg:left-12 w-24 h-[2px] bg-gradient-to-r from-gold to-transparent opacity-30" />
            </div>
        </div>
    );
}