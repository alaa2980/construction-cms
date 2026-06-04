// resources/js/Pages/Admin/Messages/Index.jsx
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, MailOpen, Trash2, X, Calendar, User, Inbox, ArrowUpRight } from 'lucide-react';

export default function Index({ messages = [] }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    // Dynamic processing to flag state reads smoothly on backend
    const handleOpenMessage = (msg) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            router.patch(`/admin/messages/${msg.id}/read`, {}, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Client Communications Inbox" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="mb-10 select-none">
                <h2 className="text-sm font-black text-charcoal-dark uppercase tracking-wider flex items-center gap-2">
                    <Inbox size={16} className="text-gold" />
                    Corporate Communication Hub
                </h2>
                <p className="text-xs text-gray-400 mt-1 font-normal">Audit, track, and process raw incoming client inquiries generated via digital channels.</p>
            </div>

            {/* Re-engineered High-End Communications Stack Container */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden backdrop-blur-sm">
                <div className="divide-y divide-gray-50 select-none">
                    {messages.length === 0 ? (
                        <div className="text-center py-24 text-gray-400 font-medium">
                            <Mail className="w-10 h-10 mx-auto mb-4 text-gray-300 stroke-[1.5]" />
                            <p className="text-sm">Communication database currently cleared.</p>
                            <p className="text-[11px] text-gray-400 font-normal mt-1">No pending external inquiries discovered yet.</p>
                        </div>
                    ) : (
                        messages.map((msg, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                key={msg.id} 
                                onClick={() => handleOpenMessage(msg)}
                                className={`p-5 flex items-center justify-between hover:bg-gray-50/[0.4] transition-all duration-300 cursor-pointer relative group ${
                                    !msg.is_read ? 'bg-blue-50/[0.12] border-r-[3px] border-gold' : ''
                                }`}
                            >
                                <div className="flex items-center gap-5 min-w-0 flex-1">
                                    
                                    {/* Structural Envelope Icon Asset */}
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border transition-colors duration-300 ${
                                        !msg.is_read 
                                            ? 'bg-gold/10 border-gold/20 text-gold' 
                                            : 'bg-gray-50 border-gray-100 text-gray-400'
                                    }`}>
                                        {!msg.is_read ? <Mail className="w-4 h-4 stroke-[2.5]" /> : <MailOpen className="w-4 h-4" />}
                                    </div>

                                    {/* Multi-Grid Balanced Typography Content Mapping */}
                                    <div className="min-w-0 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-y-2 gap-x-8 items-center text-xs">
                                        <div className="truncate">
                                            <p className={`text-charcoal-dark text-sm tracking-tight truncate ${!msg.is_read ? 'font-black' : 'font-bold'}`}>{msg.name}</p>
                                            <p className="text-[10px] text-gray-400 font-normal truncate mt-0.5">{msg.email}</p>
                                        </div>
                                        <div className="lg:col-span-2 truncate pr-4">
                                            <p className={`text-charcoal-dark text-sm tracking-tight truncate ${!msg.is_read ? 'font-extrabold text-gold-dark' : 'font-bold'}`}>{msg.subject}</p>
                                            <p className="text-gray-400 font-normal truncate mt-0.5 leading-normal">{msg.message}</p>
                                        </div>
                                    </div>

                                </div>

                                {/* Permanent Layout Meta Utilities & Hidden Hover Actions */}
                                <div className="flex items-center gap-6 ml-6 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider group-hover:opacity-0 transition-opacity duration-200">
                                        {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                    
                                    {/* Action Box Panel transforms subtly on row hover position */}
                                    <div className="absolute right-6 opacity-0 group-hover:opacity-100 flex items-center gap-2 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                                        <button 
                                            onClick={() => handleOpenMessage(msg)}
                                            className="w-7 h-7 rounded-md bg-white border border-gray-100 text-gray-400 hover:text-gold hover:border-gold/30 flex items-center justify-center transition-all shadow-sm"
                                            title="Read Mail"
                                        >
                                            <ArrowUpRight size={13} />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if(confirm('Are you sure you want to permanently purge this client record inquiry?')) {
                                                    router.delete(`/admin/messages/${msg.id}`);
                                                }
                                            }}
                                            className="w-7 h-7 rounded-md bg-white border border-gray-100 text-gray-400 hover:text-red-500 hover:border-red-100 flex items-center justify-center transition-all shadow-sm"
                                            title="Purge Mail"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Re-designed Architectural Floating Document Modal Overlay */}
            <AnimatePresence>
                {selectedMessage && (
                    <div className="fixed inset-0 bg-charcoal-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 select-none">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-2xl relative border border-gray-100"
                        >
                            {/* Dismiss Action Key */}
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-5 right-5 p-1.5 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-charcoal-dark transition-all focus:outline-none"
                                aria-label="Close document"
                            >
                                <X className="w-4 h-4 stroke-[2.5]" />
                            </button>

                            {/* Document Header Metadata Title */}
                            <div className="border-b border-gray-100 pb-5 pr-8">
                                <span className="text-[10px] font-black text-gold uppercase tracking-widest block mb-1">Inquiry Subject Abstract</span>
                                <h3 className="text-lg font-black text-charcoal-dark tracking-tight leading-snug">
                                    {selectedMessage.subject}
                                </h3>
                            </div>

                            {/* Detailed Corporate Meta Elements Stack */}
                            <div className="mt-6 space-y-3.5 text-xs font-bold text-gray-500 tracking-wide">
                                <div className="flex items-center gap-3 bg-gray-50/60 border border-gray-100/50 p-3 rounded-xl">
                                    <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
                                        <User size={13} className="stroke-[2.5]" />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Sender Identity</p>
                                        <p className="text-charcoal-dark font-extrabold mt-0.5 truncate">{selectedMessage.name} <span className="text-gray-400 font-medium font-mono text-[11px]">({selectedMessage.email})</span></p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-gray-50/60 border border-gray-100/50 p-3 rounded-xl">
                                    <div className="w-7 h-7 rounded-lg bg-white border border-gray-100 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
                                        <Calendar size={13} className="stroke-[2.5]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">System Timestamp</p>
                                        <p className="text-charcoal-dark font-extrabold mt-0.5">{new Date(selectedMessage.created_at).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                                    </div>
                                </div>
                                
                                {/* Message Payload Content Rendering */}
                                <div className="pt-4 border-t border-gray-50 flex flex-col gap-2">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-black pl-1">Transmission Data Payload</p>
                                    <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-xl text-charcoal-dark font-medium text-sm leading-relaxed whitespace-pre-wrap font-sans max-h-[220px] overflow-y-auto custom-scrollbar shadow-inner">
                                        {selectedMessage.message}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

Index.layout = page => <AdminLayout children={page} />