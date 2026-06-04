// resources/js/Layouts/AdminLayout.jsx
import { useState } from 'react';
import Sidebar from '@/Components/Admin/Sidebar';
import Topbar from '@/Components/Admin/Topbar';

export default function AdminLayout({ children }) {
    // Persistent state container
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <div className="h-screen w-full bg-gray-50 flex overflow-hidden font-sans antialiased">
            
            {/* Sidebar receives the persistent hooks */}
            <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

            {/* Dynamic Content Workspace Area */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                
                <Topbar />

                {/* Sub-Content Viewport Frame Container */}
                <main className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#f8fafc]">
                    <div className="w-full max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
                
            </div>
        </div>
    );
}