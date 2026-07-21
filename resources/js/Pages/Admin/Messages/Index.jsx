// resources/js/Pages/Admin/Messages/Index.jsx
import { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { Mail, MailOpen, Trash2, X, Calendar, User, Inbox, ArrowUpRight, MessageSquareOff } from 'lucide-react';

export default function Index({ messages = [] }) {
    const [selectedMessage, setSelectedMessage] = useState(null);

    // تحديث حالة الرسالة إلى مقروءة تلقائياً عند فتحها
    const handleOpenMessage = (msg) => {
        setSelectedMessage(msg);
        if (!msg.is_read) {
            router.patch(`/admin/messages/${msg.id}/read`, {}, { preserveScroll: true });
        }
    };

    return (
        <>
            <Head title="Inbox | Admin Workspace" />

            {/* ترويسة الصفحة */}
            <div className="mb-8">
                <div className="flex items-center gap-2.5 mb-1">
                    <div className="p-1.5 bg-gold/10 rounded-lg">
                        <Inbox size={18} className="text-gold" strokeWidth={2.5} />
                    </div>
                    <h2 className="text-xl font-bold text-charcoal-dark tracking-tight">
                        Client Messages
                    </h2>
                </div>
                <p className="text-sm text-gray-500 font-medium">
                    Review and manage incoming inquiries and messages from your website visitors.
                </p>
            </div>

            {/* قائمة الرسائل */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {messages.length === 0 ? (
                    /* حالة الفراغ (Empty State) الاحترافية */
                    <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 border border-gray-100 shadow-sm">
                            <MessageSquareOff size={28} className="text-gray-400" strokeWidth={1.5} />
                        </div>
                        <h3 className="text-lg font-bold text-charcoal-dark mb-1">Your inbox is empty</h3>
                        <p className="text-sm text-gray-500 max-w-sm">
                            When visitors send messages through your website contact form, they will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {messages.map((msg, index) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.03 }}
                                key={msg.id} 
                                onClick={() => handleOpenMessage(msg)}
                                className={`p-5 flex items-center justify-between hover:bg-gray-50/80 transition-all duration-200 cursor-pointer relative group ${
                                    !msg.is_read ? 'bg-blue-50/30 border-r-4 border-gold' : ''
                                }`}
                            >
                                <div className="flex items-center gap-4 min-w-0 flex-1">
                                    
                                    {/* أيقونة البريد */}
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200 ${
                                        !msg.is_read 
                                            ? 'bg-gold/10 text-gold' 
                                            : 'bg-gray-100 text-gray-400'
                                    }`}>
                                        {!msg.is_read ? <Mail size={18} strokeWidth={2.5} /> : <MailOpen size={18} strokeWidth={2} />}
                                    </div>

                                    {/* تفاصيل الرسالة */}
                                    <div className="min-w-0 flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                                        <div className="truncate">
                                            <p className={`text-sm text-charcoal-dark truncate ${!msg.is_read ? 'font-bold' : 'font-medium'}`}>{msg.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{msg.email}</p>
                                        </div>
                                        <div className="md:col-span-2 truncate pr-6">
                                            <p className={`text-sm text-charcoal-dark truncate ${!msg.is_read ? 'font-bold' : 'font-medium'}`}>{msg.subject}</p>
                                            <p className="text-xs text-gray-500 truncate mt-0.5">{msg.message}</p>
                                        </div>
                                    </div>

                                </div>

                                {/* التاريخ وأزرار الإجراءات */}
                                <div className="flex items-center gap-4 ml-4 flex-shrink-0">
                                    <span className="text-xs font-medium text-gray-400 group-hover:opacity-0 transition-opacity duration-200">
                                        {new Date(msg.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </span>
                                    
                                    {/* الأزرار التي تظهر عند الـ Hover */}
                                    <div className="absolute right-5 opacity-0 group-hover:opacity-100 flex items-center gap-1.5 transition-all duration-200" onClick={(e) => e.stopPropagation()}>
                                        <button 
                                            onClick={() => handleOpenMessage(msg)}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gold hover:border-gold/30 flex items-center justify-center transition-all shadow-sm focus:outline-none"
                                            title="Read Message"
                                        >
                                            <ArrowUpRight size={16} />
                                        </button>
                                        <button 
                                            onClick={() => {
                                                if(confirm('Are you sure you want to delete this message?')) {
                                                    router.delete(`/admin/messages/${msg.id}`, { preserveScroll: true });
                                                }
                                            }}
                                            className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all shadow-sm focus:outline-none"
                                            title="Delete Message"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* نافذة قراءة الرسالة المنبثقة (Modal) */}
            <AnimatePresence>
                {selectedMessage && (
                    <div className="fixed inset-0 bg-charcoal-dark/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="bg-white rounded-2xl max-w-xl w-full p-8 shadow-xl relative border border-gray-100"
                        >
                            {/* زر الإغلاق */}
                            <button 
                                onClick={() => setSelectedMessage(null)}
                                className="absolute top-6 right-6 w-8 h-8 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-charcoal-dark flex items-center justify-center transition-all focus:outline-none"
                                aria-label="Close dialog"
                            >
                                <X size={18} />
                            </button>

                            {/* عنوان الرسالة */}
                            <div className="border-b border-gray-100 pb-5 pr-10">
                                <span className="text-xs font-semibold text-gold uppercase tracking-wider block mb-1">Inquiry Subject</span>
                                <h3 className="text-xl font-bold text-charcoal-dark tracking-tight">
                                    {selectedMessage.subject}
                                </h3>
                            </div>

                            {/* معلومات المرسل والتاريخ */}
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center gap-3 bg-gray-50/50 border border-gray-100 p-3.5 rounded-xl">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
                                        <User size={16} />
                                    </div>
                                    <div className="truncate">
                                        <p className="text-xs text-gray-400 font-medium">From</p>
                                        <p className="text-sm text-charcoal-dark font-semibold truncate">
                                            {selectedMessage.name} <span className="text-gray-400 font-normal text-xs">({selectedMessage.email})</span>
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 bg-gray-50/50 border border-gray-100 p-3.5 rounded-xl">
                                    <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center text-gold shadow-sm flex-shrink-0">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 font-medium">Received At</p>
                                        <p className="text-sm text-charcoal-dark font-semibold">
                                            {new Date(selectedMessage.created_at).toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* محتوى الرسالة */}
                                <div className="pt-2">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">Message Content</p>
                                    <div className="bg-gray-50/50 border border-gray-100 p-4 rounded-xl text-charcoal-dark text-sm leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
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