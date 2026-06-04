import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import ServiceSection from '@/Sections/ServicesSection/Service';
import CtaSection from '@/Sections/CtaSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Show({ service }) {
    const { __ } = useTrans();

    return (
        <SiteLayout>
            
            <Head title={__('meta.serviceSingle.title')} />

            <PageHeader 
                title={service.title} 
                currentPage={__('services.pageHeader.detailsCurrent')} 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            <ServiceSection service={service} />

            <CtaSection />
            
        </SiteLayout>
    );
}