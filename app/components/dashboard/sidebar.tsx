'use client'
import { LayoutDashboard, Receipt, History, LogOut } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signout } from "@/app/actions/auth"
import { useState, useTransition } from "react"

const Sidebar = () => {
    const pathname = usePathname()
    const [isPending, startTransition] = useTransition()

    const isActive = (path: string) => {
        return pathname === path ? "bg-blue-600/10 text-blue-400 border-blue-600/20" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100 border-transparent"
    }

    const handleLogout = () => {
        startTransition(async () => {
            await signout()
        })
    }

    return (
        <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col sticky top-0 h-screen">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">iF</div>
                    <span className="text-xl font-bold tracking-tight text-white">IntelliFinance</span>
                </div>
                
                <nav className="space-y-2">
                    <Link href="/dashboard" className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all border ${isActive('/dashboard')}`}>
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link href="/dashboard/transactions" className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all border ${isActive('/dashboard/transactions')}`}>
                        <Receipt className="w-5 h-5" />
                        Transacciones
                    </Link>
                    <Link href="/dashboard/history" className={`w-full flex items-center gap-3 p-3 rounded-xl font-medium transition-all border ${isActive('/dashboard/history')}`}>
                        <History className="w-5 h-5" />
                        Historial
                    </Link>
                </nav>
            </div>
            
            <div className="mt-auto p-6 border-t border-slate-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Julio" alt="User" />
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white">Auditor</p>
                        <p className="text-xs text-slate-500">Sesión Activa</p>
                    </div>
                </div>

                <button 
                    onClick={handleLogout}
                    disabled={isPending}
                    className="w-full flex items-center gap-3 p-2 text-slate-400 hover:text-red-400 transition-colors text-sm font-medium"
                >
                    <LogOut className="w-4 h-4" />
                    {isPending ? "Cerrando..." : "Cerrar Sesión"}
                </button>
            </div>
        </aside>
    )
}

export default Sidebar
