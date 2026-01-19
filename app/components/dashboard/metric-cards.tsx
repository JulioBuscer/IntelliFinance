'use client'
import { useMemo } from "react"
import { Transaction } from "@/app/lib/types"

interface MetricCardsProps {
    transactions: Transaction[]
}

export const MetricCards = ({ transactions }: MetricCardsProps) => {

    const stats = useMemo(() => {
        const total = transactions.reduce((acc, curr) => acc + Number(curr.amount), 0)
        
        // Calcular gastos del mes actual (usando transaction_date si existe, o created_at)
        const currentMonth = new Date().getMonth()
        const currentYear = new Date().getFullYear()
        
        const monthly = transactions.reduce((acc, curr) => {
            const date = new Date(curr.transaction_date || curr.created_at)
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                return acc + Number(curr.amount)
            }
            return acc
        }, 0)

        const aiCount = transactions.filter(t => t.is_ai_processed).length
        const aiSavedHours = (aiCount * 5 / 60).toFixed(1) // Asumiendo 5 min por factura manual vs instantáneo

        return { total, monthly, aiCount, aiSavedHours }
    }, [transactions])

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in">
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Total Auditado</p>
                    <span className="text-green-400 text-[10px] font-bold">+12%</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                    {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(stats.total)}
                </h3>
                <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-2/3"></div>
                </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Gastos del Mes</p>
                    <span className="text-slate-500 text-[10px] font-bold">Meta: $50k</span>
                </div>
                <h3 className="text-3xl font-bold text-white">
                     {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(stats.monthly)}
                </h3>
                <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[90%]"></div>
                </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Facturas con IA</p>
                    <span className="text-blue-400 text-[10px] font-bold">Activo</span>
                </div>
                <h3 className="text-3xl font-bold text-blue-400">{stats.aiCount}</h3>
                <p className="text-[10px] text-slate-500 mt-4 italic">{stats.aiSavedHours} horas ahorradas hoy</p>
            </div>
        </div>
    )
}
