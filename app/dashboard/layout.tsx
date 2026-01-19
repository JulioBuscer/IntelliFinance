import Sidebar from "@/app/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen flex font-sans">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
        </main>
    </div>
  )
}
