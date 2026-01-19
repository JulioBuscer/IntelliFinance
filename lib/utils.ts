import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Transaction } from "@/app/lib/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateFinancials(transactions: Transaction[]) {
    const total = transactions.reduce((acc, curr) => acc + Number(curr.amount || 0), 0)
    
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    const monthly = transactions.reduce((acc, curr) => {
        const date = new Date(curr.transaction_date || curr.created_at)
        if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
            return acc + Number(curr.amount || 0)
        }
        return acc
    }, 0)

    const aiCount = transactions.filter(t => t.is_ai_processed).length
    const aiSavedHours = (aiCount * 5 / 60).toFixed(1)

    return { total, monthly, aiCount, aiSavedHours }
}
