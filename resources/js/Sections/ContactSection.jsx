// resources/js/Sections/ContactSection.jsx
import { motion } from 'framer-motion';
import { useForm } from '@inertiajs/react';
import SectionHeading from '@/Components/UI/SectionHeading';
import Button from '@/Components/UI/Button';
import { MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

// توكن الحركة المعماري الفاخر الموحد للموقع
const premiumEase = [0.16, 1, 0.3, 1];

export default function ContactSection({ settings = {}, isHome }) {
    const { __ } = useTrans();
    
    // استخراج القيم الديناميكية مع وضع قيم افتراضية للاحتياط
    const phone = settings.company_phone || '+967 772094945';
    const email = settings.company_email || 'info@constructionco.com';
    const address = settings.company_address || "60th Street, Sana'a, Yemen";

    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post(route('site.contact.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <section className="py-20 bg-white select-none">
            <div className="container mx-auto px-4">
                
                <SectionHeading 
                    title={isHome ? __('contact.title.home') : __('contact.title.page')} 
                    subtitle={__('contact.subtitle')}
                    align="center"
                />

                <div className="flex flex-col lg:flex-row gap-16 mt-16 max-w-6xl mx-auto">
                    
                    {/* Contact Information Side */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        shadow-sm
                        transition={{ duration: 0.8, ease: premiumEase }}
                        className="lg:w-1/3 space-y-8"
                    >
                        <h3 className="text-2xl font-bold text-charcoal-dark mb-6">{__('contact.info.heading')}</h3>
                        
                        {/* استخدام gap-4 بدلاً من space-x لتفادي مشاكل الاتجاهات RTL/LTR */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal-dark">{__('contact.info.location')}</h4>
                                <p className="text-charcoal-light text-sm mt-1 leading-relaxed">{address}</p>
                            </div>
                        </div>

                        {/* رقم هاتف تفاعلي وقابل للنقر حياً للمكالمات السريعة */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal-dark">{__('contact.info.phone')}</h4>
                                <p className="mt-1">
                                    <a 
                                        href={`tel:${phone}`} 
                                        className="text-charcoal-light hover:text-gold text-sm transition-colors duration-300 font-medium block"
                                    >
                                        {phone}
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* بريد إلكتروني تفاعلي حي يفتح تطبيقات الإيميل فوراً عند النقر */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 text-gold shadow-sm">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-bold text-charcoal-dark">{__('contact.info.email')}</h4>
                                <p className="mt-1">
                                    <a 
                                        href={`mailto:${email}`} 
                                        className="text-charcoal-light hover:text-gold text-sm transition-colors duration-300 font-medium block break-all"
                                    >
                                        {email}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form Side (تصميم الـ bg-accent الفخم) */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: premiumEase, delay: 0.1 }}
                        className="lg:w-2/3 bg-accent p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100"
                    >
                        {wasSuccessful && (
                            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-sm font-semibold animate-in fade-in">
                                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                                <span>{__('contact.form.success')}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal-dark mb-2">{__('contact.form.labels.name')}</label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={`w-full bg-white border text-sm rounded-md focus:ring-1 focus:ring-gold focus:border-gold block p-3 transition-colors outline-none ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                                        placeholder={__('contact.form.placeholders.name')} 
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-charcoal-dark mb-2">{__('contact.form.labels.email')}</label>
                                    <input 
                                        type="email" 
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className={`w-full bg-white border text-sm rounded-md focus:ring-1 focus:ring-gold focus:border-gold block p-3 transition-colors outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                                        placeholder={__('contact.form.placeholders.email')} 
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-charcoal-dark mb-2">{__('contact.form.labels.subject')}</label>
                                <input 
                                    type="text" 
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    className={`w-full bg-white border text-sm rounded-md focus:ring-1 focus:ring-gold focus:border-gold block p-3 transition-colors outline-none ${errors.subject ? 'border-red-500' : 'border-gray-300'}`} 
                                    placeholder={__('contact.form.placeholders.subject')} 
                                />
                                {errors.subject && <p className="text-red-500 text-xs mt-1 font-medium">{errors.subject}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-charcoal-dark mb-2">{__('contact.form.labels.message')}</label>
                                <textarea 
                                    rows="5" 
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    className={`w-full bg-white border text-sm rounded-md focus:ring-1 focus:ring-gold focus:border-gold block p-3 transition-colors resize-none outline-none ${errors.message ? 'border-red-500' : 'border-gray-300'}`} 
                                    placeholder={__('contact.form.placeholders.message')}
                                ></textarea>
                                {errors.message && <p className="text-red-500 text-xs mt-1 font-medium">{errors.message}</p>}
                            </div>

                            <Button type="submit" variant="primary" disabled={processing} className="w-full md:w-auto px-10 py-4">
                                {processing ? __('contact.form.buttons.sending') : __('contact.form.buttons.send')}
                            </Button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}