// resources/js/Components/Layout/Footer.jsx
import { Link } from '@inertiajs/react';
import { Phone, Mail, MapPin, Shield, ShieldCheck, ArrowRight } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

export default function Footer({ settings = {} }) {
    const { currentLocale, __ } = useTrans();

    // استخراج القيم الديناميكية مع صياغة قيم افتراضية رصينة للاحتياط
    const phone = settings.company_phone || '+967 772094945';
    const email = settings.company_email || 'info@constructionco.com';
    const address = settings.company_address || "60th Street, Sana'a, Yemen";

    // روابط السوشيال ميديا مبنية بـ SVGs هندسية فاخرة مع تنعيم حركة الـ Hover لتصبح كالزبدة
    const socialLinks = [
        {
            name: 'Facebook',
            href: settings.facebook_url || '#',
            svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z"/></svg>
        },
        {
            name: 'Twitter / X',
            href: settings.twitter_url || '#',
            svg: <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        },
        {
            name: 'Instagram',
            href: settings.instagram_url || '#',
            svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
        },
        {
            name: 'LinkedIn',
            href: settings.linkedin_url || '#',
            svg: <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        }
    ];

    return (
        /* تعديل الـ pb-16 ليعطي توزيعًا متوازنًا ويقضي على الفراغ العشوائي بالأسفل */
        <footer className="bg-charcoal-dark text-white pt-24 pb-16 border-t border-white/[0.02] relative overflow-hidden select-none">
            {/* لمحة شبكية خافتة جداً في الخلفية لتعكس الطابع الهندسي */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
                
                {/* شبكة التوزيع الاستراتيجية الكبرى */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 items-start pb-16 border-b border-white/[0.03]">
                    
                    {/* العمود الأول: بيان هوية الشركة ومصداقيتها الدولية */}
                    <div className="space-y-6">
                        <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2.5">
                            <div className="w-6 h-6 border border-gold flex items-center justify-center rotate-45 flex-shrink-0 bg-gold/5 shadow-sm shadow-gold/10">
                                <span className="-rotate-45 block font-black text-[10px] text-gold">C</span>
                            </div>
                            <span className="tracking-tight font-black">CONSTRUCTION<span className="text-gold">CO.</span></span>
                        </h3>
                        <p className="text-xs text-gray-400 leading-[1.85] font-medium">
                            {__('footer.description')}
                        </p>
                        
                        {/* بادجات التوثيق والأمان الخفيفة لتعزيز الثقل البصري */}
                        <div className="flex items-center gap-4 pt-2 text-[10px] font-black uppercase tracking-wider text-gray-500">
                            <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-gold stroke-[2.5]" /> {__('footer.isoMapped')}</span>
                            <span className="flex items-center gap-1.5"><Shield size={13} className="text-gold stroke-[2.5]" /> {__('footer.oshaCompliant')}</span>
                        </div>
                    </div>

                    {/* العمود الثاني: القدرات والحلول الإنشائية (Core Capabilities) */}
                    <div className="space-y-5">
                        <div className="inline-block">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gold">{__('footer.sections.capabilities')}</h4>
                            <div className="w-6 h-[2px] bg-gold/40 mt-1.5 rounded-full" />
                        </div>
                        <ul className="space-y-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
                            <li className="hover:text-gold transition-colors duration-200 cursor-default flex items-center gap-1.5 group"><span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-gold transition-colors" />{__('footer.capabilities.infrastructure')}</li>
                            <li className="hover:text-gold transition-colors duration-200 cursor-default flex items-center gap-1.5 group"><span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-gold transition-colors" />{__('footer.capabilities.commercial')}</li>
                            <li className="hover:text-gold transition-colors duration-200 cursor-default flex items-center gap-1.5 group"><span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-gold transition-colors" />{__('footer.capabilities.industrial')}</li>
                            <li className="hover:text-gold transition-colors duration-200 cursor-default flex items-center gap-1.5 group"><span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-gold transition-colors" />{__('footer.capabilities.management')}</li>
                        </ul>
                    </div>

                    {/* العمود الثالث: روابط الملاحة والمسارات المباشرة (Navigation Grid) المحمية من الـ 404 */}
                    <div className="space-y-5">
                        <div className="inline-block">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gold">{__('footer.sections.navigation')}</h4>
                            <div className="w-6 h-[2px] bg-gold/40 mt-1.5 rounded-full" />
                        </div>
                        <ul className="space-y-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
                            {/* إضافة كلاس rtl:rotate-180 للسهم ليدور برمجياً وتلقائياً حسب لغة الصفحة الحالية */}
                            <li><Link href={route('site.home')} className="hover:text-gold transition-all duration-200 flex items-center group"><ArrowRight size={12} className="text-gold opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" />{__('footer.nav.home')}</Link></li>
                            <li><Link href={route('site.about')} className="hover:text-gold transition-all duration-200 flex items-center group"><ArrowRight size={12} className="text-gold opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" />{__('footer.nav.about')}</Link></li>
                            <li><Link href={route('site.services.index')} className="hover:text-gold transition-all duration-200 flex items-center group"><ArrowRight size={12} className="text-gold opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" />{__('footer.nav.services')}</Link></li>
                            <li><Link href={route('site.portfolio.index')} className="hover:text-gold transition-all duration-200 flex items-center group"><ArrowRight size={12} className="text-gold opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-all" />{__('footer.nav.portfolio')}</Link></li>
                        </ul>
                    </div>

                    {/* العمود الرابع: مركز القيادة والاتصال (Command Hub) بروابط حية ومباشرة */}
                    <div className="space-y-5">
                        <div className="inline-block">
                            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gold">{__('footer.sections.hqHub')}</h4>
                            <div className="w-6 h-[2px] bg-gold/40 mt-1.5 rounded-full" />
                        </div>
                        <ul className="space-y-4 text-xs font-bold text-gray-400 tracking-wide">
                            <li className="flex items-start gap-3 group">
                                <MapPin className="w-4 h-4 text-gold flex-shrink-0 stroke-[2] mt-0.5" />
                                <span className="text-gray-300 leading-relaxed group-hover:text-white transition-colors">{address}</span>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Phone className="w-4 h-4 text-gold flex-shrink-0 stroke-[2]" />
                                <a href={`tel:${phone}`} className="text-gray-300 group-hover:text-white transition-colors">{phone}</a>
                            </li>
                            <li className="flex items-center gap-3 group">
                                <Mail className="w-4 h-4 text-gold flex-shrink-0 stroke-[2]" />
                                <a href={`mailto:${email}`} className="text-gray-300 transition-colors duration-300 group-hover:text-gold cursor-pointer">{email}</a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* الشريط السفلي النهائي: الحقوق ومفاتيح التواصل الاجتماعي التفاعلية */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-12 pt-6 mb-0 md:mb-0">
                    
                    {/* حقوق الملكية المصقولة */}
                    <div className="text-[10px] font-bold uppercase tracking-widest text-gray-600 text-center md:text-start order-2 md:order-1">
                        &copy; {new Date().getFullYear()} {__('footer.rights')}
                    </div>

                    {/* روابط السوشيال ميديا الفاخرة المدمجة بالذهب والتأثير الميكروي السلس مع تنعيم ميكانيكي كامل للحركة */}
                    <div className="flex items-center gap-3 order-1 md:order-2">
                        {socialLinks.map((item, index) => (
                            <a 
                                key={index} 
                                href={item.href} 
                                target="_blank" 
                                rel="noreferrer" 
                                aria-label={item.name} 
                                className="w-8 h-8 bg-white/[0.02] border border-white/[0.04] text-gray-400 rounded-lg flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-gold hover:text-charcoal-dark hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gold/10"
                            >
                                {item.svg}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}