'use client'

import { useOptimistic } from "react"
import { Transaction } from "@/app/lib/types"
import { Dropzone } from "./dropzone"
import { MetricCards } from "./metric-cards"
import { TransactionTable } from "./transaction-table"

interface TransactionsViewProps {
    initialTransactions: Transaction[]
}

export const TransactionsView = ({ initialTransactions }: TransactionsViewProps) => {

    // useOptimistic hook
    const [optimisticTransactions, addOptimisticTransaction] = useOptimistic(
        initialTransactions,
        (state: Transaction[], newTransaction: any) => {
            // Creamos un objeto temporal para la UI inmediata
            const optimisticTx: Transaction = {
                id: Math.random().toString(36).substr(2, 9), // ID temporal
                user_id: 'optimistic',
                concept: newTransaction.concept,
                amount: newTransaction.amount,
                category: newTransaction.category,
                status: 'verified', // Asumimos verified porque el usuario confirmó
                is_ai_processed: true,
                created_at: new Date().toISOString(),
                transaction_date: newTransaction.transaction_date
            }
            return [optimisticTx, ...state]
        }
    )

    return (
        <div className="space-y-8">
            <MetricCards transactions={optimisticTransactions} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* OCR Zone */}
                <Dropzone onTransactionAdded={addOptimisticTransaction} />
                
                <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                    <h4 className="font-bold text-white mb-6">Actividad Semanal</h4>
                    <div className="h-40 w-full flex items-end gap-2">
                        <div className="flex-1 bg-blue-600/40 h-[40%] rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600/40 h-[60%] rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600/40 h-[80%] rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600 h-full rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600/40 h-[50%] rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600/20 h-[30%] rounded-t-lg"></div>
                        <div className="flex-1 bg-blue-600/40 h-[65%] rounded-t-lg"></div>
                    </div>
                    <div className="flex justify-between mt-4 text-[9px] text-slate-500 font-bold uppercase">
                        <span>Lu</span><span>Ma</span><span>Mi</span><span>Ju</span><span>Vi</span><span>Sa</span><span>Do</span>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Últimas Transacciones</h3>
                <TransactionTable transactions={optimisticTransactions} />
            </div>
        </div>
    )
}
