// resources/js/Sections/PartnersSection.jsx
import { Building2, Layers, HardHat, Compass, Box, Anchor } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

export default function PartnersSection() {
    const { __ } = useTrans();

    // مصفوفة شركاء النجاح بأيقونات معمارية وصياغة نصوص تفرض ثقل الشراكات الاستراتيجية
    const partners = [
        { icon: Building2, name: __('partners.list.apex') },
        { icon: Layers, name: __('partners.list.matrix') },
        { icon: HardHat, name: __('partners.list.titan') },
        { icon: Compass, name: __('partners.list.vertex') },
        { icon: Box, name: __('partners.list.omni') },
        { icon: Anchor, name: __('partners.list.nordic') }
    ];

    // نقوم بتكرار المصفوفة لضمان استمرارية الشريط اللامتناهي بدون أي فجوات بصرية أثناء الدوران
    const infinitePartners = [...partners, ...partners, ...partners];

    return (
        <section className="py-16 bg-charcoal-dark text-white overflow-hidden select-none border-b border-white/[0.02] relative">
            
            {/* اللمسة الإشارية العلوية الخفيفة */}
            <div className="container mx-auto px-6 mb-8 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 block">
                    {__('partners.tag')}
                </span>
            </div>

            {/* حاوية الشريط المتحرك ميكانيكياً */}
            <div className="relative w-full flex overflow-x-hidden group/track">
                
                {/* طبقات التظليل الضبابي الجانبي (Fading Edge Gradients) لراحة العين وثبات الأبعاد */}
                <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-charcoal-dark to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-charcoal-dark to-transparent z-10 pointer-events-none" />

                {/* 🌐 تم استبدال space-x بـ gap لإنهاء مشكلة التداخل في العربي نهائياً وتأمين تباعد العناصر الفاخر */}
                <div className="flex gap-16 md:gap-24 whitespace-nowrap animate-infinite-scroll group-hover/track:[animation-play-state:paused] py-4 pr-16 md:pr-24">
                    {infinitePartners.map((partner, index) => {
                        const IconComponent = partner.icon;
                        
                        return (
                            <div 
                                key={index}
                                className="inline-flex items-center gap-3 group/item cursor-default transition-all duration-500 transform hover:-translate-y-0.5"
                            >
                                {/* أيقونة الشريك: رمادية في الوضع الطبيعي وتتوهج بالذهب بمرونة قوية */}
                                <IconComponent className="w-5 h-5 text-gray-600 group-hover/item:text-gold transition-colors duration-500 stroke-[1.8]" />
                                
                                {/* اسم الشركة الشريكة بصياغة تيبوجرافي صارمة ونظيفة */}
                                <span className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 group-hover/item:text-white transition-colors duration-500">
                                    {partner.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>

            {/* حقن ستايل الـ CSS الخاص بالأنيميشن اللامتناهي ليعمل في السايدبار تلقائياً وبأمان مطلق */}
            <style jsx global>{`
                /* الحركة الافتراضية للغة الإنجليزية (LTR) */
                @keyframes infiniteScrollLTR {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.3333%); }
                }

                /* الحركة المعكوسة للغة العربية (RTL) */
                @keyframes infiniteScrollRTL {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(33.3333%); }
                }

                /* تطبيق الحركة الافتراضية LTR */
                .animate-infinite-scroll {
                    animation: infiniteScrollLTR 35s linear infinite;
                }

                /* 🌐 السحر هنا: تبديل الحركة أوتوماتيكياً عندما يكون الموقع عربي RTL */
                [dir="rtl"] .animate-infinite-scroll,
                :global([dir="rtl"]) .animate-infinite-scroll {
                    animation: infiniteScrollRTL 35s linear infinite;
                }
            `}</style>
        </section>
    );
}