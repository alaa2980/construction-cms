import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import PortfolioSection from '@/Sections/PortfolioSection/Portfolio';
import CtaSection from '@/Sections/CtaSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Index({ projects, categories }) {
    const { __ } = useTrans();

    return (
        <SiteLayout>
            <Head title={__('meta.portfolio.title')} />
            
            <PageHeader 
                title={__('portfolio.pageHeader.title')} 
                currentPage={__('portfolio.pageHeader.current')} 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            <PortfolioSection projects={projects} categories={categories} />

            <CtaSection />
            
        </SiteLayout>
    );
}