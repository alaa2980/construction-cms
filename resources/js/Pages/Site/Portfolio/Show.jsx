import { Head } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import ProjectHero from '@/Sections/PortfolioSection/ProjectHero';
import ProjectContent from '@/Sections/PortfolioSection/Project';
import CtaSection from '@/Sections/CtaSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Show({ project }) {
    const { __ } = useTrans();

    return (
        <SiteLayout>

            <Head title={`${project.title} | ${__('portfolio.meta.detailsSuffix')}`} />
            
            {/* 1. قسم البانر السينمائي */}
            <ProjectHero project={project} />

            {/* 2. قسم المحتوى النصي والمواصفات الفنية */}
            <ProjectContent project={project} />

            {/* 4. قسم التحويل (Contact CTA) */}
            <CtaSection />

        </SiteLayout>
    );
}