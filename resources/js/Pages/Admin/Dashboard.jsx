// resources/js/Pages/Admin/Dashboard.jsx
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Briefcase, Wrench, Mail, ArrowUpRight, ShieldAlert } from 'lucide-react';

// --------------------------------------------------------
// 1. مكون فرعي: بطاقة الإحصائيات (StatCard)
// --------------------------------------------------------
const StatCard = ({ title, value, icon: Icon, color, bg, alert, variants }) => (
    <motion.div 
        variants={variants}
        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-gray-200 transition-all duration-300"
    >
        <div className="flex items-center gap-5">
            <div className={`relative w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${bg}`}>
                <Icon className={`w-6 h-6 ${color} transition-transform duration-300 group-hover:scale-110`} strokeWidth={2} />
                
                {/* تنبيه الأيقونة النقطي (Badge) */}
                {alert && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-white"></span>
                    </span>
                )}
            </div>
            <div className="flex flex-col">
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-charcoal-dark tracking-tight">{value}</p>
            </div>
        </div>
    </motion.div>
);

// --------------------------------------------------------
// 2. مكون فرعي: إجراء سريع (QuickActionItem)
// --------------------------------------------------------
const QuickActionItem = ({ name, href, desc }) => (
    <Link 
        href={href}
        className="group p-4 rounded-xl border border-gray-50 bg-gray-50/50 hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300 flex items-center justify-between"
    >
        <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold text-charcoal-dark group-hover:text-gold transition-colors duration-200">
                {name}
            </p>
            <p className="text-xs text-gray-500 font-medium">
                {desc}
            </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-400 group-hover:text-gold flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <ArrowUpRight size={16} strokeWidth={2.5} />
        </div>
    </Link>
);

// --------------------------------------------------------
// 3. المكون الرئيسي: Dashboard
// --------------------------------------------------------
export default function Dashboard({ stats }) {
    
    const statsCards = [
        { 
            title: 'Total Projects', 
            value: stats.total_projects || 0, 
            icon: Briefcase, 
            color: 'text-gold', 
            bg: 'bg-gold/10 text-gold' 
        },
        { 
            title: 'Active Services', 
            value: stats.active_services || 0, 
            icon: Wrench, 
            color: 'text-charcoal-dark', 
            bg: 'bg-charcoal/5' 
        },
        { 
            title: 'Unread Messages', 
            value: stats.unread_messages || 0, 
            icon: Mail, 
            color: stats.unread_messages > 0 ? 'text-red-500' : 'text-gray-400', 
            bg: stats.unread_messages > 0 ? 'bg-red-50 border border-red-100/50' : 'bg-gray-50',
            alert: stats.unread_messages > 0
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <>
            <Head title="Overview | Admin Workspace" />

            <div className="max-w-7xl mx-auto space-y-8">
                {/* شبكة الإحصائيات */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none"
                >
                    {statsCards.map((stat, index) => (
                        <StatCard key={index} {...stat} variants={cardVariants} />
                    ))}
                </motion.div>

                {/* القسم السفلي: مساحة العمل والإجراءات السريعة */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* لوحة الترحيب الرئيسية */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between relative overflow-hidden"
                    >
                        {/* زخرفة خلفية ناعمة */}
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-6 bg-gold rounded-full" />
                                <h2 className="text-xl font-bold text-charcoal-dark">Workspace Overview</h2>
                            </div>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xl font-medium">
                                Welcome back. From this command center, you can seamlessly scale your portfolio, monitor active operations, and respond to client inquiries to maintain peak performance.
                            </p>
                        </div>

                        {/* تنبيه النظام */}
                        <div className="mt-8 p-4 rounded-xl bg-amber-50/50 border border-amber-100/50 flex items-start gap-3 relative z-10">
                            <ShieldAlert size={18} className="text-amber-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-amber-800/80 leading-relaxed font-medium">
                                <strong className="text-amber-900 block mb-1">Security & Performance Check</strong>
                                Ensure all cover images are optimized before staging layout production. Please verify system logs for any unread client messaging.
                            </p>
                        </div>
                    </motion.div>

                    {/* قائمة الإجراءات السريعة */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-base font-bold text-charcoal-dark">Quick Actions</h3>
                        </div>

                        <div className="flex-1 flex flex-col gap-3">
                            {[
                                { name: 'Add New Project', href: '/admin/projects', desc: 'Stage a new architectural work' },
                                { name: 'Manage Services', href: '/admin/services', desc: 'Update core capabilities' },
                                { name: 'Review Inquiries', href: '/admin/messages', desc: 'Check pending corporate inbox' }
                            ].map((action, i) => (
                                <QuickActionItem key={i} {...action} />
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </>
    );
}

Dashboard.layout = page => <AdminLayout children={page} />