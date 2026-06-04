// resources/js/Components/Admin/Sidebar.jsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutDashboard, Briefcase, Wrench, Mail, Settings, 
    LogOut, ChevronLeft, ChevronRight, ChevronDown, Layers, List 
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
    const { url } = usePage();
    
    // فحص ذكي: هل الرابط الحالي يتبع قطاع المشاريع أو الفئات؟
    const isProjectSectionActive = url.startsWith('/admin/projects') || url.startsWith('/admin/categories');

    // حالة إدارة فتح وإغلاق القائمة المنسدلة للمشاريع
    const [isProjectsOpen, setIsProjectsOpen] = useState(isProjectSectionActive);

    // مزامنة ذكية: إذا تغير الرابط من الخارج أو فُتحت الصفحة، تأكد من مطابقة حالة القائمة
    useEffect(() => {
        if (isProjectSectionActive) {
            setIsProjectsOpen(true);
        }
    }, [url]);

    // مزامنة إضافية: إذا لُمّ السايدبار، اقفل القائمة المنسدلة منعاً للتشويه البصري
    useEffect(() => {
        if (isCollapsed) {
            setIsProjectsOpen(false);
        } else if (isProjectSectionActive) {
            setIsProjectsOpen(true);
        }
    }, [isCollapsed]);

    // مصفوفة الروابط الأساسية
    const topMenuItems = [
        { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
    ];

    const bottomMenuItems = [
        { name: 'Services', icon: Wrench, href: '/admin/services' },
        { name: 'Messages', icon: Mail, href: '/admin/messages' },
        { name: 'Settings', icon: Settings, href: '/admin/settings' },
    ];

    // دالة مرنة لتوليد زر المشاريع الذكي بناءً على حالة الـ Collapse
    const renderProjectsTrigger = () => {
        const contentClasses = `w-full flex items-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 relative focus:outline-none ${
            isCollapsed ? 'justify-center py-3.5 px-0' : 'px-4 py-3 justify-between'
        } ${isProjectSectionActive ? 'bg-white/[0.02] text-white border border-white/[0.01]' : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'}`;

        const innerContent = (
            <>
                <div className="flex items-center gap-3.5">
                    <Briefcase className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isProjectSectionActive ? 'text-gold' : 'text-gray-400 group-hover:text-white'}`} />
                    {!isCollapsed && <span>Projects Setup</span>}
                </div>
                {!isCollapsed && (
                    <motion.div
                        animate={{ rotate: isProjectsOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-gray-500 group-hover:text-white"
                    >
                        <ChevronDown size={14} className="stroke-[2.5]" />
                    </motion.div>
                )}
                {/* التلميح العائم الذكي يوضح للمدير التوجيه المباشر المتاح */}
                {isCollapsed && (
                    <div className="absolute left-20 px-2.5 py-1.5 rounded-md bg-charcoal text-[10px] font-black uppercase tracking-wider text-white border border-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 shadow-xl z-50 whitespace-nowrap">
                        Go to All Projects
                    </div>
                )}
            </>
        );

        // إذا كان السايدبار مغلقاً، يتحول الزر تلقائياً لرابط توجيه مباشر للمشاريع
        if (isCollapsed) {
            return (
                <Link href="/admin/projects" className="block w-full">
                    <div className={contentClasses}>
                        {innerContent}
                    </div>
                </Link>
            );
        }

        // إذا كان السايدبار مفتوحاً، يتصرف كزر أكورديون عادي لفتح وإغلاق القائمة الفرعية
        return (
            <button type="button" onClick={() => setIsProjectsOpen(!isProjectsOpen)} className={contentClasses}>
                {innerContent}
            </button>
        );
    };

    return (
        <motion.aside 
            animate={{ width: isCollapsed ? 80 : 256 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-charcoal-dark border-r border-white/[0.04] text-white flex flex-col shadow-2xl h-screen sticky top-0 hidden md:flex select-none z-30 flex-shrink-0 relative"
        >
            
            {/* GLOBAL MASTER FLOATING TOGGLE TRIGGER */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute right-[-14px] top-7 w-7 h-7 rounded-full bg-charcoal border border-white/[0.06] text-gray-400 hover:text-gold flex items-center justify-center shadow-md transition-all duration-300 z-50 focus:outline-none hover:scale-110"
                aria-label="Toggle Sidebar"
            >
                {isCollapsed ? <ChevronRight size={13} className="stroke-[3]" /> : <ChevronLeft size={13} className="stroke-[3]" />}
            </button>

            {/* Premium Header Block */}
            <div className="h-20 flex items-center px-5 border-b border-white/[0.04] bg-charcoal-dark/50 overflow-hidden whitespace-nowrap">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 border border-gold/60 flex items-center justify-center rotate-45 flex-shrink-0">
                        <span className="-rotate-45 block font-black text-xs text-gold">C</span>
                    </div>
                    
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-col text-left"
                            >
                                <span className="text-sm font-black tracking-wider text-white">CONSTRUCTION</span>
                                <span className="text-[9px] uppercase tracking-widest text-gold font-bold opacity-80">Admin Workspace</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            
            {/* Navigation Links Stack */}
            <nav className="flex-1 px-3 py-8 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
                
                {/* 1. Dashboard Link */}
                {topMenuItems.map((item) => {
                    const isActive = url === item.href;
                    return (
                        <Link key={item.name} href={item.href} className="relative block group">
                            <div className={`flex items-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${
                                isCollapsed ? 'justify-center py-3.5 px-0' : 'px-4 py-3 gap-3.5'
                            } ${isActive ? 'bg-white/[0.03] text-gold font-black shadow-inner border border-white/[0.02]' : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'}`}>
                                {isActive && (
                                    <motion.div layoutId="activeAdminLine" className="absolute left-0 top-3 bottom-3 w-[2.5px] bg-gradient-to-b from-gold to-gold-dark rounded-r-md" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                )}
                                <item.icon className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-white group-hover:scale-105'}`} />
                                {!isCollapsed && <span>{item.name}</span>}
                                {isCollapsed && (
                                    <div className="absolute left-20 px-2.5 py-1.5 rounded-md bg-charcoal text-[10px] font-black uppercase tracking-wider text-white border border-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 shadow-xl z-50 whitespace-nowrap">{item.name}</div>
                                )}
                            </div>
                        </Link>
                    );
                })}

                {/* 2. كتلة الـ DROPDOWN المهجنة والمحترفة للمشاريع والفئات */}
                <div className="relative block group">
                    {renderProjectsTrigger()}

                    {/* القائمة الانزلاقية الفرعية المبطنة بحركة Framer Motion ناعمة */}
                    <AnimatePresence initial={false}>
                        {isProjectsOpen && !isCollapsed && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden pl-4 mt-1 space-y-1"
                            >
                                <Link href="/admin/projects" className="block group/sub">
                                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                                        url === '/admin/projects' || (url.startsWith('/admin/projects') && !url.includes('categories'))
                                            ? 'text-gold font-black bg-white/[0.01]' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/[0.005]'
                                    }`}>
                                        <List size={13} className="stroke-[2.5]" />
                                        <span>All Projects</span>
                                    </div>
                                </Link>

                                <Link href="/admin/categories" className="block group/sub">
                                    <div className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all duration-200 ${
                                        url.startsWith('/admin/categories') 
                                            ? 'text-gold font-black bg-white/[0.01]' 
                                            : 'text-gray-400 hover:text-white hover:bg-white/[0.005]'
                                    }`}>
                                        <Layers size={13} className="stroke-[2.5]" />
                                        <span>Categories</span>
                                    </div>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* 3. الروابط السفلية (Services, Messages, Settings) */}
                {bottomMenuItems.map((item) => {
                    const isActive = url.startsWith(item.href);
                    
                    return (
                        <Link key={item.name} href={item.href} className="relative block group">
                            <div className={`flex items-center rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${
                                isCollapsed ? 'justify-center py-3.5 px-0' : 'px-4 py-3 gap-3.5'
                            } ${isActive ? 'bg-white/[0.03] text-gold font-black shadow-inner border border-white/[0.02]' : 'text-gray-400 hover:text-white hover:bg-white/[0.01]'}`}>
                                {isActive && (
                                    <motion.div layoutId="activeAdminLine" className="absolute left-0 top-3 bottom-3 w-[2.5px] bg-gradient-to-b from-gold to-gold-dark rounded-r-md" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                                )}
                                <item.icon className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${isActive ? 'text-gold' : 'text-gray-400 group-hover:text-white group-hover:scale-105'}`} />
                                {!isCollapsed && <span>{item.name}</span>}
                                {isCollapsed && (
                                    <div className="absolute left-20 px-2.5 py-1.5 rounded-md bg-charcoal text-[10px] font-black uppercase tracking-wider text-white border border-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 transform translate-x-2 group-hover:translate-x-0 shadow-xl z-50 whitespace-nowrap">{item.name}</div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Footer Session Block */}
            <div className="p-3 border-t border-white/[0.04] bg-charcoal-dark/30 overflow-hidden">
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className={`flex items-center w-full text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-red-400 hover:bg-red-500/[0.06] border border-transparent hover:border-red-500/10 rounded-lg transition-all duration-300 focus:outline-none group ${
                        isCollapsed ? 'justify-center py-3.5 px-0' : 'px-4 py-3 gap-3.5'
                    }`}
                >
                    <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-transform group-hover:-translate-x-0.5 flex-shrink-0" />
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="whitespace-nowrap">
                                Logout Session
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>
            
        </motion.aside>
    );
}