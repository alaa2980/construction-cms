// resources/js/Pages/Admin/Projects/Create.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Upload, Images, Layers, Calendar, User, FileText } from 'lucide-react';

export default function Create({ categories = [] }) {
    // Re-engineered structural form container with clean default initialization states
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        category_id: categories[0]?.id || '',
        description: '',
        client_name: '',
        completion_date: '',
        is_featured: false,
        cover_image: null,
        gallery_images: [], 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/projects');
    };

    return (
        <>
            <Head title="Initialize New Project Blueprint" />

            {/* Premium Synchronized Action Sub-Header */}
            <div className="mb-10 select-none">
                <Link
                    href="/admin/projects"
                    className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gold transition-colors duration-200"
                >
                    <ArrowLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Back to Portfolio Canvas</span>
                </Link>
                <h2 className="text-base font-black text-charcoal-dark uppercase tracking-tight mt-3 flex items-center gap-2">
                    <FileText size={16} className="text-gold" />
                    Initialize Project Blueprint
                </h2>
            </div>

            {/* Re-engineered High-End Two-Column Operations Layout */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Block: Structural Specifications Form Field Workspace */}
                <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                    
                    {/* Project Master Title Input */}
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Project Blueprint Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`w-full bg-gray-50/40 border p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none ${
                                errors.title ? 'border-red-500 bg-red-50/10' : 'border-gray-100'
                            }`}
                            placeholder="e.g., Al-Nakhil Commercial Center"
                        />
                        {errors.title && <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.title}</p>}
                    </div>

                    {/* Project Dynamic Description Area */}
                    <div>
                        <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2">Structural Description Abstract</label>
                        <textarea
                            rows="7"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={`w-full bg-gray-50/40 border p-3 text-xs font-medium leading-relaxed rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none resize-none ${
                                errors.description ? 'border-red-500 bg-red-50/10' : 'border-gray-100'
                            }`}
                            placeholder="Describe technical structural specifications, industrial materials deployed, architectural scope..."
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.description}</p>}
                    </div>

                    {/* Metadata Split Grid Field Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                        {/* Corporate Client Field */}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <User size={12} className="text-gold" />
                                Corporate Client Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)}
                                className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none"
                                placeholder="e.g., Ministry of Housing"
                            />
                        </div>

                        {/* Architectural Completion Timestamp Input */}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Calendar size={12} className="text-gold" />
                                Handover Completion Date (Optional)
                            </label>
                            <input
                                type="date"
                                value={data.completion_date}
                                onChange={(e) => setData('completion_date', e.target.value)}
                                className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Block: Media Management Assets & Deployment Panel Layout */}
                <div className="space-y-6 select-none">
                    
                    {/* Architectural Category Blueprint Panel */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
                            <Layers size={13} className="text-gold" />
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-wider">Classification</h3>
                        </div>
                        
                        {/* Category Select Input */}
                        <div>
                            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Project Sector Category</label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none cursor-pointer"
                            >
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* High-End Refactored Active Featured Toggle Box */}
                        <label className="flex items-center gap-3 p-3.5 bg-gray-50/60 border border-gray-100 rounded-xl cursor-pointer hover:bg-gold/[0.02] hover:border-gold/20 transition-all duration-300">
                            <input
                                type="checkbox"
                                checked={data.is_featured}
                                onChange={(e) => setData('is_featured', e.target.checked)}
                                className="w-4 h-4 text-gold focus:ring-gold border-gray-200 rounded cursor-pointer"
                            />
                            <span className="text-xs font-black text-charcoal-dark uppercase tracking-wider">Promote on Live Showcase</span>
                        </label>
                    </div>

                    {/* Core Premium Master Cover Image Dropzone Box */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
                            <Upload size={13} className="text-gold" />
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-wider">Master Cover Artwork</h3>
                        </div>
                        
                        <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50/30 hover:border-gold/40 hover:bg-gold/[0.01] transition-all duration-300 relative group">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('cover_image', e.target.files[0])}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2.5 transition-transform group-hover:-translate-y-0.5 duration-300" />
                            <p className="text-[11px] text-charcoal-dark font-black uppercase tracking-wide group-hover:text-gold transition-colors">
                                {data.cover_image ? 'Cover Asset Attached' : 'Attach Core Cover Image'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-normal mt-1 truncate max-w-[200px] mx-auto">
                                {data.cover_image ? data.cover_image.name : 'Staging resolution optimal specs'}
                            </p>
                        </div>
                        {errors.cover_image && <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.cover_image}</p>}
                    </div>

                    {/* Secondary Corporate Array Multiple Assets Gallery Dropzone */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
                            <Images size={13} className="text-gold" />
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-wider">Asset Catalog Gallery</h3>
                        </div>
                        
                        <div className="border border-dashed border-gray-200 rounded-xl p-6 text-center bg-gray-50/30 hover:border-gold/40 hover:bg-gold/[0.01] transition-all duration-300 relative group">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => setData('gallery_images', Array.from(e.target.files))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <Images className="w-6 h-6 text-gray-400 mx-auto mb-2.5 transition-transform group-hover:scale-105 duration-300" />
                            <p className="text-[11px] text-charcoal-dark font-black uppercase tracking-wide group-hover:text-gold transition-colors">
                                {data.gallery_images.length > 0 ? 'Gallery Files Synced' : 'Sync Sub-Gallery Album'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-normal mt-1">
                                {data.gallery_images.length > 0 
                                    ? `[${data.gallery_images.length}] structural images attached` 
                                    : 'Upload multiple asset viewpoints'}
                            </p>
                        </div>
                    </div>

                    {/* GLOBAL STRUCTURAL MASTER PUBLISH TRIGGER BUTTON */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full inline-flex items-center justify-center gap-2 bg-charcoal text-white text-xs font-black uppercase tracking-wider py-4 rounded-xl hover:bg-charcoal-dark disabled:opacity-50 shadow-md shadow-charcoal/10 hover:shadow-lg hover:shadow-charcoal/20 transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 focus:outline-none"
                    >
                        <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{processing ? 'Deploying Blueprint...' : 'Publish Project Blueprint'}</span>
                    </button>

                </div>
            </form>
        </>
    );
}

Create.layout = page => <AdminLayout children={page} />