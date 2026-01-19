'use client'
import { Transaction } from "@/app/lib/types"

interface TransactionTableProps {
    transactions: Transaction[]
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
    
    const getStatusStyle = (status: string) => {
        switch(status) {
            case 'verified': return 'bg-green-500/10 text-green-400 border-green-500/20'
            case 'processing': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
            case 'error': return 'bg-red-500/10 text-red-400 border-red-500/20'
            default: return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
        }
    }

    // Ordenar transacciones por fecha (más reciente primero)
    const sortedTransactions = [...transactions].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )

    return (
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-slate-800 overflow-hidden animate-fade-in delay-100">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-bold tracking-wider">
                        <tr>
                            <th className="px-6 py-4">Referencia</th>
                            <th className="px-6 py-4">Concepto</th>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Monto</th>
                            <th className="px-6 py-4 text-center">Estado</th>
                            <th className="px-6 py-4">IA</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-sm">
                        {sortedTransactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                    No hay transacciones registradas todavía.
                                </td>
                            </tr>
                        ) : (
                            sortedTransactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-6 py-4 font-mono text-xs text-blue-400 group-hover:text-blue-300">
                                        #{tx.id.slice(0, 8)}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white">{tx.concept}</td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {new Date(tx.created_at).toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">
                                        {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(Number(tx.amount))}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase border ${getStatusStyle(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {tx.is_ai_processed ? (
                                            <span className="text-blue-400" title="Procesado con IA">✨</span>
                                        ) : (
                                            <span className="text-slate-600">--</span>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
