// resources/js/Pages/Admin/Dashboard.jsx
import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Briefcase, Wrench, Mail, PlusCircle, ArrowUpRight, ShieldAlert } from 'lucide-react';

export default function Dashboard({ stats }) {

    // Re-engineered corporate stats structure using the core premium design tokens
    const statsCards = [
        { 
            title: 'Total Projects', 
            value: stats.total_projects || 0, 
            icon: Briefcase, 
            color: 'text-gold', 
            bg: 'bg-charcoal/5 border border-gray-100' 
        },
        { 
            title: 'Active Services', 
            value: stats.active_services || 0, 
            icon: Wrench, 
            color: 'text-charcoal-dark', 
            bg: 'bg-charcoal/5 border border-gray-100' 
        },
        { 
            title: 'Unread Messages', 
            value: stats.unread_messages || 0, 
            icon: Mail, 
            color: stats.unread_messages > 0 ? 'text-red-500' : 'text-gray-400', 
            bg: stats.unread_messages > 0 ? 'bg-red-50/50 border border-red-100/50' : 'bg-charcoal/5 border border-gray-100',
            alert: stats.unread_messages > 0
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <>
            <Head title="Admin Dashboard Overview" />

            {/* Premium Synchronized Stats Grid Layout */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 select-none"
            >
                {statsCards.map((stat, index) => (
                    <motion.div 
                        key={index} 
                        variants={cardVariants}
                        className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md hover:border-gray-200 transition-all duration-300"
                    >
                        <div className="flex items-center space-x-4">
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-colors duration-300 ${stat.bg}`}>
                                <stat.icon className={`w-6 h-6 ${stat.color} ${stat.alert ? 'animate-pulse' : ''}`} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                                <p className="text-3xl font-black text-charcoal-dark mt-0.5 tracking-tight">{stat.value}</p>
                            </div>
                        </div>
                        
                        {stat.alert && (
                            <span className="flex h-2 w-2 relative self-start mt-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Workspace Operations & Quick Actions Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Main Hub Information Display Panel */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-1 h-3 bg-gold rounded-full" />
                            <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider">Administrative Panel Workspace</h2>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xl font-normal">
                            Welcome back to your central command post. From here you can manage your enterprise operations, scale your dynamic engineering portfolio capabilities, respond instantly to client inquiries, and recalibrate your global core systems seamlessly.
                        </p>
                    </div>

                    {/* Operational Safety / Notice micro card built internally */}
                    <div className="mt-8 p-4 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-3">
                        <ShieldAlert size={16} className="text-gold mt-0.5 flex-shrink-0" />
                        <p className="text-xs text-gray-400 leading-normal">
                            Security Note: Ensure all cover images optimized for performance before staging layout production. Double check system logs for unread client messaging.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: High-End Interactive Quick Action Links Panel */}
                <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col"
                >
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-1 h-3 bg-charcoal-dark rounded-full" />
                        <h3 className="text-sm font-black text-charcoal-dark uppercase tracking-wider">Quick Actions</h3>
                    </div>

                    <div className="flex-1 flex flex-col gap-3">
                        {[
                            { name: 'Add New Project', href: '/admin/projects', desc: 'Stage a new architectural work' },
                            { name: 'Manage Core Services', href: '/admin/services', desc: 'Update capabilities definitions' },
                            { name: 'Review Inquiries', href: '/admin/messages', desc: 'Check pending corporate inbox' }
                        ].map((action, i) => (
                            <Link 
                                key={i}
                                href={action.href}
                                className="group w-full p-4 rounded-xl border border-gray-100 hover:border-gold/30 hover:bg-gold/[0.01] transition-all duration-300 flex items-center justify-between text-left"
                            >
                                <div>
                                    <p className="text-xs font-black text-charcoal-dark group-hover:text-gold transition-colors duration-200">{action.name}</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5 font-normal">{action.desc}</p>
                                </div>
                                <div className="w-7 h-7 rounded-lg bg-gray-50 group-hover:bg-gold text-gray-400 group-hover:text-charcoal-dark flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                                    <ArrowUpRight size={14} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

            </div>
        </>
    );
}

Dashboard.layout = page => <AdminLayout children={page} />