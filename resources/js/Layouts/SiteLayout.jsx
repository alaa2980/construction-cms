import { usePage } from '@inertiajs/react';
import Header from '@/Components/Site/Header';
import Footer from '@/Components/Site/Footer';


export default function SiteLayout({ children }) {
    const { settings } = usePage().props;

    return (
        <div className="min-h-screen flex flex-col font-sans bg-accent text-charcoal">
            <Header settings={settings} />
            
            {/* The dynamic content for each page will be rendered here */}
            <main className="flex-grow">
                {children}
            </main>
            
            <Footer settings={settings} />
        </div>
    );
}