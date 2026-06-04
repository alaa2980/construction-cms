// resources/js/Components/Admin/Topbar.jsx
import { usePage, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Bell, ExternalLink, Shield } from 'lucide-react';

export default function Topbar() {
    const { url, props } = usePage();
    const { auth } = props;

    const userName = auth?.user?.name || 'Admin User';
    
    const userInitials = userName.charAt(0).toUpperCase();

    // Re-engineered structural routing check to maintain active title states even inside nested CRUD paths
    const getCurrentTitle = () => {
        if (url === '/admin/dashboard') return 'Dashboard Overview';
        if (url.startsWith('/admin/projects')) return 'Project Management';
        if (url.startsWith('/admin/services')) return 'Service Capabilities';
        if (url.startsWith('/admin/messages')) return 'Client Messages';
        if (url.startsWith('/admin/settings')) return 'Global Settings';
        return 'Administrative Panel';
    };

    return (
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm select-none">
            
            {/* Left Dynamic Section: Responsive Page Tracking */}
            <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-3"
            >
                {/* Structural Category Anchor Icon */}
                <div className="w-1.5 h-4 bg-gold rounded-full hidden sm:block" />
                <h1 className="text-base font-extrabold text-charcoal-dark uppercase tracking-tight font-sans">
                    {getCurrentTitle()}
                </h1>
            </motion.div>

            {/* Right Section: Enterprise Action Panel & Profile Frame */}
            <div className="flex items-center gap-6">
                
                {/* Micro Action Control Utilities */}
                <div className="flex items-center gap-2 border-r border-gray-100 pr-5">
                    {/* Seamless Shortcut Link to Frontend UI المعاينة الفورية للموقع */}
                    <a 
                        href="/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gold hover:bg-gray-50 rounded-lg transition-all duration-300 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                        title="View Live Website"
                    >
                        <span className="hidden sm:inline">View Site</span>
                        <ExternalLink size={14} />
                    </a>

                    {/* Notification Hub Micro Bell Trigger التنبيهات الذكية */}
                    <button 
                        className="p-2 text-gray-400 hover:text-charcoal hover:bg-gray-50 rounded-lg transition-all duration-300 relative focus:outline-none"
                        aria-label="Notifications"
                    >
                        <Bell size={16} />
                        {/* Dynamic Notification Signal Dot */}
                        <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-gold rounded-full border border-white animate-pulse" />
                    </button>
                </div>

                {/* Premium Corporate User Profile Block */}
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 group pl-2"
                >
                    <div className="flex flex-col text-right hidden sm:flex">
                        <span className="text-xs font-black text-charcoal-dark tracking-wide">{userName}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 justify-end mt-0.5">
                            <Shield size={10} className="text-gold" />
                            Super Admin
                        </span>
                    </div>

                    {/* Re-designed refined Avatar Badge with structural outline formatting */}
                    <div className="w-9 h-9 rounded-xl bg-charcoal-dark text-gold border border-white/10 shadow-md shadow-charcoal/10 flex items-center justify-center font-black text-sm tracking-wider hover:border-gold/50 transition-colors duration-300 select-none">
                        {userInitials}
                    </div>
                </motion.div>

            </div>
            
        </header>
    );
}