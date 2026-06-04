// resources/js/Pages/Site/About.jsx
import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import AboutSection from '@/Sections/AboutSection';
import CtaSection from '@/Sections/CtaSection';
import StatsSection from '@/Sections/StatsSection';
import WhyChooseUsSection from '@/Sections/WhyChooseUsSection';
import PartnersSection from '@/Sections/PartnersSection';
import ProjectTimeline from '@/Sections/ProjectTimeline';
import { useTrans } from '@/Hooks/useTrans';

export default function About() {
    const { __ } = useTrans();

    return (
        <SiteLayout>
            {/* Browser Tab Title */}
            <Head title={__('meta.about.title')} />

            <PageHeader 
                title={__('about.pageHeader.title')} 
                currentPage={__('about.pageHeader.current')} 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            {/* Calling the independent, clean Section Component */}
            <AboutSection />
            
            <StatsSection />

            <WhyChooseUsSection />

            <PartnersSection />

            <ProjectTimeline />

            <CtaSection />
            
        </SiteLayout>
    );
}