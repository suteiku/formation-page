import { ModernSidebar } from '@/components/layout/modern-sidebar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-white">
            <div className="fixed inset-y-0 z-50 flex flex-col" style={{ width: '280px' }}>
                <ModernSidebar />
            </div>
            <main style={{ marginLeft: '280px' }}>
                {children}
            </main>
        </div>
    )
}
