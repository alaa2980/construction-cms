import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import ServicesSection from '@/Sections/ServicesSection/Services';
import CtaSection from '@/Sections/CtaSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Index({ services }) {
    const { __ } = useTrans();

    return (
        <SiteLayout>
            
            <Head title={__('meta.services.title')} />

            <PageHeader 
                title={__('services.pageHeader.title')} 
                currentPage={__('services.pageHeader.current')} 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            <ServicesSection services={services} />

            <CtaSection />
            
        </SiteLayout>
    );
}