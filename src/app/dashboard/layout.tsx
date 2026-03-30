import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import FloatingBolt from '@/components/layout/FloatingBolt'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#09090b] text-[#fafafa]">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      <FloatingBolt />
    </div>
  )
}
