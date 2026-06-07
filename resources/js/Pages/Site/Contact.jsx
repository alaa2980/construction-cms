// resources/js/Pages/Site/Contact.jsx
import { Head, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import ContactSection from '@/Sections/ContactSection';
import { useTrans } from '@/Hooks/useTrans';

export default function Contact() {
    const { settings } = usePage().props;
    const { __ } = useTrans();

    return (
        <SiteLayout>
            <Head title={__('meta.contact.title')} />
            
            <PageHeader 
                title={__('contact.pageHeader.title')} 
                currentPage={__('contact.pageHeader.current')} 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            <ContactSection settings={settings} />
            
        </SiteLayout>
    );
}