// resources/js/Components/Admin/Topbar.jsx
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Shield } from 'lucide-react';

export default function Topbar() {
    const { url, props } = usePage();
    const { auth } = props;

    const userName = auth?.user?.name || 'Admin User';
    const userInitials = userName.charAt(0).toUpperCase();
    
    // تحديد عنوان الصفحة الحالي بناءً على المسار
    const getCurrentTitle = () => {
        if (url === '/admin/dashboard') return 'Dashboard Overview';
        if (url.startsWith('/admin/projects')) return 'Project Management';
        if (url.startsWith('/admin/services')) return 'Service Capabilities';
        if (url.startsWith('/admin/messages')) return 'Client Messages';
        if (url.startsWith('/admin/settings')) return 'Global Settings';
        return 'Admin Workspace';
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm select-none">
            
            {/* القسم الأيمن (العنوان الديناميكي) */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
            >
                <div className="w-1.5 h-5 bg-gold rounded-full hidden sm:block" />
                <h1 className="text-lg font-bold text-charcoal-dark tracking-tight">
                    {getCurrentTitle()}
                </h1>
            </motion.div>

            {/* القسم الأيسر (أدوات التحكم والبروفايل) */}
            <div className="flex items-center gap-5">
                
                {/* أدوات الإجراءات السريعة */}
                <div className="flex items-center gap-2 border-r border-gray-200 pr-5">
                    {/* رابط معاينة الموقع الحي */}
                    <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2.5 text-gray-500 hover:text-gold hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-2 text-xs font-semibold"
                        title="View Live Website"
                    >
                        <span className="hidden sm:inline">View Site</span>
                        <ExternalLink size={16} strokeWidth={2} />
                    </a>

                    {/* زر التنبيهات */}
                    <button 
                        className="p-2.5 text-gray-500 hover:text-charcoal-dark hover:bg-gray-50 rounded-xl transition-all duration-200 relative focus:outline-none"
                        aria-label="Notifications"
                    >
                        <Bell size={18} strokeWidth={2} />
                        {/* نقطة الإشعار النشطة */}
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-gold rounded-full border-2 border-white animate-pulse" />
                    </button>
                </div>

                {/* كتلة ملف المستخدم الشخصي */}
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 pl-1"
                >
                    <div className="flex flex-col text-right hidden sm:flex">
                        <span className="text-sm font-bold text-charcoal-dark">{userName}</span>
                        <span className="text-xs font-medium text-gray-400 flex items-center gap-1 justify-end mt-0.5">
                            <Shield size={12} className="text-gold" strokeWidth={2.5} />
                            Super Admin
                        </span>
                    </div>

                    {/* شارة الأفاتار (Avatar) */}
                    <div className="w-10 h-10 rounded-xl bg-charcoal-dark text-gold border border-charcoal shadow-sm flex items-center justify-center font-bold text-base select-none">
                        {userInitials}
                    </div>
                </motion.div>

            </div>
            
        </header>
    );
}