import { Head, usePage } from '@inertiajs/react';
import SiteLayout from '@/Layouts/SiteLayout';
import PageHeader from '@/Components/UI/PageHeader';
import ContactSection from '@/Sections/ContactSection';

export default function Contact() {
    const { settings } = usePage().props;

    return (
        <SiteLayout>
            <Head title="Contact Us | Construction Co." />
            
            <PageHeader 
                title="Get In Touch" 
                currentPage="Contact" 
                bgImage="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=1920&q=80" 
            />

            <ContactSection settings={settings} />
            
        </SiteLayout>
    );
}