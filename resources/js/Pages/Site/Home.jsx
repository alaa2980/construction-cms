import { Head, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import HeroSection from '@/Sections/HeroSection';
import ServicesSection from '@/Sections/ServicesSection/Services';
import PortfolioSection from '@/Sections/PortfolioSection/Portfolio';
import AboutSection from '@/Sections/AboutSection';
import StatsSection from '@/Sections/StatsSection';
import WhyChooseUsSection from '@/Sections/WhyChooseUsSection';
import PartnersSection from '@/Sections/PartnersSection';
import ProjectTimeline from '@/Sections/ProjectTimeline';
import ContactSection from '@/Sections/ContactSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Home({ services, featuredProjects, categories }) {
    const { settings } = usePage().props;
    const { __ } = useTrans();

    return (
        <SiteLayout>
            <Head title={__('meta.home.title')} />
            
            {/* Sections */}
            <HeroSection />
            <ServicesSection services={services} isHome={true} />
            <AboutSection pyValue="10" isHome={true} />
            <StatsSection />
            <WhyChooseUsSection />
            <PartnersSection />
            <PortfolioSection projects={featuredProjects} categories={categories} isHome={true} />
            <ProjectTimeline pyValue="10" />
            <ContactSection settings={settings} isHome={true} />

            {/* <TestSection /> */}
            
        </SiteLayout>
    );
}