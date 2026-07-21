// resources/js/Components/Admin/Sidebar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Briefcase, Wrench, Mail, Settings, 
    LogOut, ChevronLeft, ChevronRight, ChevronDown, Layers, List 
} from 'lucide-react';

// --------------------------------------------------------
// 1. مكون فرعي: NavItem (لتقليل التكرار وتنظيف الكود)
// --------------------------------------------------------
const NavItem = ({ href, icon: Icon, label, isActive, isCollapsed, onClick, className = '' }) => {
    const content = (
        <div className={`relative flex items-center rounded-lg transition-all duration-300 group cursor-pointer ${
            isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
        } ${
            isActive 
                ? 'bg-white/[0.04] text-gold shadow-inner border border-white/[0.02]' 
                : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
        } ${className}`}>
            
            {/* المؤشر الجانبي للعنصر النشط */}
            {isActive && (
                <motion.div 
                    layoutId="activeAdminLine" 
                    className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-gold to-gold-dark rounded-r-full" 
                    transition={{ type: "spring", stiffness: 300, damping: 30 }} 
                />
            )}
            
            <Icon className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${
                isActive ? 'text-gold' : 'text-gray-400 group-hover:text-white group-hover:scale-110'
            }`} />
            
            {!isCollapsed && <span className="text-sm font-medium tracking-wide">{label}</span>}
            
            {/* تلميح (Tooltip) يظهر فقط عندما تكون القائمة مطوية */}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 rounded-md bg-charcoal text-xs font-semibold text-white border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0 shadow-lg z-50 whitespace-nowrap">
                    {label}
                </div>
            )}
        </div>
    );

    if (onClick) {
        return <button onClick={onClick} className="w-full focus:outline-none">{content}</button>;
    }

    return <Link href={href} className="block w-full">{content}</Link>;
};

// --------------------------------------------------------
// 2. المكون الرئيسي: Sidebar
// --------------------------------------------------------
export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const { url } = usePage();
    
    const isProjectSectionActive = url.startsWith('/admin/projects') || url.startsWith('/admin/categories');
    const [isProjectsOpen, setIsProjectsOpen] = useState(isProjectSectionActive);

    useEffect(() => {
        if (isProjectSectionActive) setIsProjectsOpen(true);
    }, [url, isProjectSectionActive]);

    useEffect(() => {
        if (isCollapsed) setIsProjectsOpen(false);
        else if (isProjectSectionActive) setIsProjectsOpen(true);
    }, [isCollapsed, isProjectSectionActive]);

    const topMenuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    ];

    const bottomMenuItems = [
        { name: 'Services', icon: Wrench, href: '/admin/services' },
        { name: 'Messages', icon: Mail, href: '/admin/messages' },
        { name: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    return (
        <motion.aside 
            animate={{ width: isCollapsed ? 88 : 280 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-charcoal-dark border-r border-white/[0.03] text-white flex flex-col shadow-2xl h-screen sticky top-0 hidden md:flex select-none z-30 flex-shrink-0 relative"
        >
            {/* زر الطي / الفتح */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-4 top-8 w-8 h-8 rounded-full bg-charcoal border border-white/10 text-gray-400 hover:text-gold flex items-center justify-center shadow-lg transition-all duration-300 z-50 focus:outline-none hover:scale-110"
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? <ChevronRight size={16} strokeWidth={2.5} /> : <ChevronLeft size={16} strokeWidth={2.5} />}
            </button>

            {/* قسم الشعار (Header Block) */}
            <div className="h-24 flex items-center px-6 border-b border-white/[0.03] bg-charcoal-dark/50 overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center flex-shrink-0 shadow-inner">
                        <span className="font-black text-lg text-gold leading-none">C</span>
                    </div>
                    
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div 
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col"
                            >
                                <span className="text-base font-bold tracking-widest text-white uppercase">Construction</span>
                                <span className="text-[10px] uppercase tracking-widest text-gray-400 font-semibold mt-0.5">Admin Workspace</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* روابط التنقل */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
                
                {/* 1. القائمة العلوية */}
                {topMenuItems.map((item) => (
                    <NavItem 
                        key={item.name}
                        href={item.href}
                        icon={item.icon}
                        label={item.name}
                        isActive={url === item.href}
                        isCollapsed={isCollapsed}
                    />
                ))}

                {/* 2. قسم المشاريع (Dropdown) */}
                <div className="pt-2">
                    {/* إذا كان مغلقاً يتصرف كرابط مباشر، وإذا كان مفتوحاً يتصرف كزر أكورديون */}
                    {isCollapsed ? (
                        <NavItem 
                            href="/admin/projects"
                            icon={Briefcase}
                            label="Projects Setup"
                            isActive={isProjectSectionActive}
                            isCollapsed={isCollapsed}
                        />
                    ) : (
                        <div className="flex flex-col">
                            <button 
                                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 group focus:outline-none ${
                                    isProjectSectionActive 
                                        ? 'bg-white/[0.04] text-white border border-white/[0.02]' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Briefcase className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isProjectSectionActive ? 'text-gold' : 'group-hover:text-white'}`} />
                                    <span className="text-sm font-medium tracking-wide">Projects Setup</span>
                                </div>
                                <motion.div
                                    animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3, ease: "backOut" }}
                                    className={isProjectSectionActive ? "text-gold" : "text-gray-500 group-hover:text-white"}
                                >
                                    <ChevronDown size={16} strokeWidth={2.5} />
                                </motion.div>
                            </button>

                            {/* القائمة الفرعية */}
                            <AnimatePresence initial={false}>
                                {isProjectsOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden pl-5 mt-1 space-y-1 relative"
                                    >
                                        {/* خط جانبي زخرفي للقائمة الفرعية */}
                                        <div className="absolute left-7 top-0 bottom-0 w-[1px] bg-white/[0.05]" />

                                        <Link href="/admin/projects" className="block relative z-10">
                                            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                                url === '/admin/projects' || (url.startsWith('/admin/projects') && !url.includes('categories'))
                                                    ? 'text-gold bg-white/[0.03]' 
                                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                                            }`}>
                                                <List size={14} />
                                                <span className="text-[13px] font-medium">All Projects</span>
                                            </div>
                                        </Link>

                                        <Link href="/admin/categories" className="block relative z-10">
                                            <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                                                url.startsWith('/admin/categories') 
                                                    ? 'text-gold bg-white/[0.03]' 
                                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                                            }`}>
                                                <Layers size={14} />
                                                <span className="text-[13px] font-medium">Categories</span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* 3. القائمة السفلية */}
                <div className="pt-2">
                    {bottomMenuItems.map((item) => (
                        <NavItem 
                            key={item.name}
                            href={item.href}
                            icon={item.icon}
                            label={item.name}
                            isActive={url.startsWith(item.href)}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </div>
            </nav>

            {/* تذييل تسجيل الخروج */}
            <div className="p-4 border-t border-white/[0.03] bg-charcoal-dark/30">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className={`flex items-center w-full transition-all duration-300 rounded-lg group focus:outline-none ${
                        isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'
                    } text-gray-400 hover:text-red-400 hover:bg-red-500/[0.05] border border-transparent hover:border-red-500/10`}
                >
                    <LogOut className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-1" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }} 
                                exit={{ opacity: 0 }} 
                                className="text-sm font-medium whitespace-nowrap"
                            >
                                Logout Session
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>
            
        </motion.aside>
    );
}