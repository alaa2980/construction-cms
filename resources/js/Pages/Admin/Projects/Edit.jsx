// resources/js/Pages/Admin/Projects/Edit.jsx
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { ArrowLeft, Save, Upload, Images, Layers, Calendar, User, FileEdit } from 'lucide-react';

export default function Edit({ project, categories = [] }) {
    // Re-engineered form synchronization featuring optimal method spoofing configuration
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: project.title || '',
        category_id: project.category_id || '',
        description: project.description || '',
        client_name: project.client_name || '',
        completion_date: project.completion_date || '',
        is_featured: !!project.is_featured,
        cover_image: null, 
        gallery_images: [], 
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/projects/${project.id}`);
    };

    return (
        <>
            <Head title={`Modify Blueprint: ${project.title}`} />

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
                    <FileEdit size={16} className="text-gold" />
                    Modify Project Blueprint Specifications
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
                            className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-medium leading-relaxed rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none resize-none"
                        ></textarea>
                        {errors.description && <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.description}</p>}
                    </div>

                    {/* Metadata Split Grid Field Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-50">
                        {/* Corporate Client Field */}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <User size={12} className="text-gold" />
                                Corporate Client Name
                            </label>
                            <input 
                                type="text" 
                                value={data.client_name} 
                                onChange={(e) => setData('client_name', e.target.value)} 
                                className="w-full bg-gray-50/40 border border-gray-100 p-3 text-xs font-bold tracking-wide rounded-lg text-charcoal-dark placeholder-gray-400 focus:bg-white focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-200 outline-none" 
                            />
                        </div>

                        {/* Architectural Completion Timestamp Input */}
                        <div>
                            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <Calendar size={12} className="text-gold" />
                                Handover Completion Date
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

                    {/* Re-designed Cover Image Preview & Dropzone Box */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
                            <Upload size={13} className="text-gold" />
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-wider">Master Cover Artwork</h3>
                        </div>
                        
                        {/* Live Saved Asset Display Frame */}
                        <div className="relative h-28 w-full rounded-lg overflow-hidden border border-gray-100 bg-gray-50 shadow-inner group">
                            <img src={project.cover_image} className="w-full h-full object-cover" alt="Current Cover Blueprint" />
                            <div className="absolute inset-0 bg-charcoal-dark/40 flex items-end p-2.5">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/90 bg-charcoal-dark/70 px-2 py-0.5 rounded-md border border-white/5 backdrop-blur-sm">Current Live Cover</span>
                            </div>
                        </div>

                        {/* Upload Dropzone Trigger */}
                        <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center bg-gray-50/30 hover:border-gold/40 hover:bg-gold/[0.01] transition-all duration-300 relative group">
                            <input type="file" accept="image/*" onChange={(e) => setData('cover_image', e.target.files[0])} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <Upload className="w-5 h-5 text-gray-400 mx-auto mb-2 transition-transform group-hover:-translate-y-0.5 duration-300" />
                            <p className="text-[10px] text-charcoal-dark font-black uppercase tracking-wide group-hover:text-gold transition-colors">
                                {data.cover_image ? 'New Cover Asset Attached' : 'Replace Cover Artwork'}
                            </p>
                            <p className="text-[9px] text-gray-400 font-normal mt-0.5 truncate max-w-[180px] mx-auto">
                                {data.cover_image ? data.cover_image.name : 'Upload to overwrite current image'}
                            </p>
                        </div>
                        {errors.cover_image && <p className="text-red-500 text-[11px] mt-1.5 font-bold uppercase tracking-wide">{errors.cover_image}</p>}
                    </div>

                    {/* Re-designed Gallery Asset Catalog Deck & Array Dropzone */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                        <div className="flex items-center gap-2 border-b border-gray-50 pb-3 mb-1">
                            <Images size={13} className="text-gold" />
                            <h3 className="text-[11px] font-black text-charcoal-dark uppercase tracking-wider">Asset Catalog Gallery</h3>
                        </div>
                        
                        {/* High-End Enterprise Gallery Micro Row Deck */}
                        {project.images && project.images.length > 0 && (
                            <div className="grid grid-cols-5 gap-2 p-2 bg-gray-50/50 border border-gray-100 rounded-xl max-h-[110px] overflow-y-auto custom-scrollbar shadow-inner">
                                {project.images.map((img) => (
                                    <div key={img.id} className="aspect-square rounded-md overflow-hidden bg-white border border-gray-100 shadow-sm">
                                        <img src={img.image_path} className="w-full h-full object-cover" alt="Gallery viewpoint" />
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Array Multiple Upload Dropzone Trigger */}
                        <div className="border border-dashed border-gray-200 rounded-xl p-5 text-center bg-gray-50/30 hover:border-gold/40 hover:bg-gold/[0.01] transition-all duration-300 relative group">
                            <input type="file" accept="image/*" multiple onChange={(e) => setData('gallery_images', Array.from(e.target.files))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                            <Images className="w-5 h-5 text-gray-400 mx-auto mb-2 transition-transform group-hover:scale-105 duration-300" />
                            <p className="text-[10px] text-charcoal-dark font-black uppercase tracking-wide group-hover:text-gold transition-colors">
                                {data.gallery_images.length > 0 ? 'New Gallery Files Synced' : 'Append Gallery Album'}
                            </p>
                            <p className="text-[9px] text-gray-400 font-normal mt-0.5">
                                {data.gallery_images.length > 0 
                                    ? `[${data.gallery_images.length}] new viewpoints queued` 
                                    : 'Upload additional perspectives'}
                            </p>
                        </div>
                    </div>

                    {/* GLOBAL STRUCTURAL MASTER UPDATE TRIGGER BUTTON */}
                    <button 
                        type="submit" 
                        disabled={processing} 
                        className="w-full inline-flex items-center justify-center gap-2 bg-charcoal text-white text-xs font-black uppercase tracking-wider py-4 rounded-xl hover:bg-charcoal-dark disabled:opacity-50 shadow-md shadow-charcoal/10 hover:shadow-lg hover:shadow-charcoal/20 transform hover:-translate-y-0.5 disabled:transform-none transition-all duration-300 focus:outline-none"
                    >
                        <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{processing ? 'Deploying Changes...' : 'Update Project Blueprint'}</span>
                    </button>

                </div>
            </form>
        </>
    );
}

Edit.layout = page => <AdminLayout children={page} />