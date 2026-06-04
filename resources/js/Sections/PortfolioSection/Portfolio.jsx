// resources/js/Sections/PortfolioSection.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@inertiajs/react';
import SectionHeading from '@/Components/UI/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import { useTrans } from '@/Hooks/useTrans';

// Dynamic portfolio component supporting dynamic categories filtering
export default function Portfolio({ projects = [], categories = [], isHome = false }) {
    const { __ } = useTrans();

    // State to manage the currently active filter category (null means 'All Work')
    const [activeCategory, setActiveCategory] = useState(null);

    // Client-side dynamic filtering logic utilizing database relational IDs
    const filteredProjects = activeCategory
        ? projects.filter(project => project.category_id === activeCategory)
        : projects;

    return (
        <section className="py-20 bg-white text-charcoal-dark border-t border-gray-100">
            <div className="container mx-auto px-6 lg:px-12">
                
                <SectionHeading 
                    title={isHome ? __('portfolio.title.home') : __('portfolio.title.page')} 
                    subtitle={__('portfolio.subtitle')}
                    align="center"
                />

                {/* Minimalist & Premium Category Filter Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mt-12 border-b border-gray-100 pb-3 max-w-2xl mx-auto">
                    <button
                        onClick={() => setActiveCategory(null)}
                        className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-300 focus:outline-none ${
                            activeCategory === null ? 'text-gold' : 'text-gray-400 hover:text-charcoal'
                        }`}
                    >
                        <span className="relative z-10">{__('portfolio.filters.all')}</span>
                        {activeCategory === null && (
                            <motion.span 
                                layoutId="activeTabLine" 
                                className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-gold rounded-full"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>

                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`relative px-4 py-2 text-xs font-bold tracking-wider uppercase transition-colors duration-300 focus:outline-none ${
                                activeCategory === category.id ? 'text-gold' : 'text-gray-400 hover:text-charcoal'
                            }`}
                        >
                            <span className="relative z-10">{category.name}</span>
                            {activeCategory === category.id && (
                                <motion.span 
                                    layoutId="activeTabLine" 
                                    className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-gold rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid Workspace with popLayout transition animation */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.length === 0 ? (
                            <motion.div 
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="col-span-full text-center py-16 bg-accent/30 rounded-xl text-gray-400 text-sm font-medium"
                            >
                                {__('portfolio.empty')}
                            </motion.div>
                        ) : (
                            filteredProjects.map((project, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    key={project.id}
                                    className="block"
                                >
                                    <Link href={route('site.portfolio.show', project.slug || project.id)}>
                                        <div className="group relative overflow-hidden rounded-xl h-72 md:h-80 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100 border border-gray-100">
                                            
                                            {/* Project Image with precise slow zoom on hover */}
                                            <img 
                                                src={project.cover_image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                            />
                                            
                                            {/* Premium Ambient Permanent & Hover Gradient Layer */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-charcoal-dark/90 via-charcoal-dark/40 to-transparent opacity-85 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6" />
                                            
                                            {/* Content layout absolute overlay */}
                                            <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                    
                                                    {/* Dynamic category assignment check */}
                                                    <span className="text-gold font-bold tracking-widest text-[11px] uppercase mb-1.5 block opacity-90">
                                                        {project.category?.name || __('portfolio.fallbackCategory')}
                                                    </span>
                                                    
                                                    <h3 className="text-lg md:text-xl font-extrabold text-white mb-3 line-clamp-1 group-hover:text-gold-light transition-colors duration-300">
                                                        {project.title}
                                                    </h3>
                                                    
                                                    {/* Action Link indicator reveals seamlessly */}
                                                    <div className="inline-flex items-center text-xs font-bold text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                                        <span className="mr-1.5">{__('portfolio.viewDetails')}</span>
                                                        <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* View All Button - Displays natively based on database population */}
                {isHome && projects && projects.length > 0 && (
                    <div className="text-center mt-20">
                        <Link 
                            href="/portfolio"
                            className="inline-flex items-center justify-center px-8 py-3.5 border border-charcoal-dark/20 text-charcoal-dark text-sm font-bold hover:bg-charcoal-dark hover:text-white hover:border-transparent transition-all duration-300 rounded-md shadow-sm"
                        >
                            {__('portfolio.viewAll')}
                        </Link>
                    </div>
                )}

            </div>
        </section>
    );
}