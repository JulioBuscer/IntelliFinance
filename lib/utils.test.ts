import { describe, it, expect } from 'vitest'
import { calculateFinancials } from './utils'
import { Transaction } from '@/app/lib/types'

describe('calculateFinancials', () => {
    it('should calculate total correctly', () => {
        const transactions = [
            { amount: 100, is_ai_processed: false, created_at: new Date().toISOString() },
            { amount: 200, is_ai_processed: false, created_at: new Date().toISOString() }
        ] as Transaction[]
        
        const result = calculateFinancials(transactions)
        expect(result.total).toBe(300)
    })

    it('should handle empty transactions', () => {
        const result = calculateFinancials([])
        expect(result.total).toBe(0)
        expect(result.monthly).toBe(0)
    })

    it('should filter monthly expenses correctly', () => {
        const today = new Date()
        const lastMonth = new Date(today)
        lastMonth.setMonth(today.getMonth() - 1)

        const transactions = [
            { amount: 100, created_at: today.toISOString(), transaction_date: today.toISOString() },
            { amount: 50, created_at: lastMonth.toISOString(), transaction_date: lastMonth.toISOString() }
        ] as Transaction[]

        const result = calculateFinancials(transactions)
        expect(result.monthly).toBe(100)
        expect(result.total).toBe(150)
    })

    it('should calculate AI stats', () => {
        const transactions = [
            { amount: 100, is_ai_processed: true },
            { amount: 100, is_ai_processed: true },
            { amount: 100, is_ai_processed: false }
        ] as Transaction[]

        const result = calculateFinancials(transactions)
        expect(result.aiCount).toBe(2)
        // 2 invoices * 5 mins = 10 mins = 0.166 hours -> rounded fixed(1) = 0.2? no 10/60 = 0.166
        // (2 * 5 / 60) = 10/60 = 0.1666... -> "0.2"
        expect(result.aiSavedHours).toBe("0.2")
    })
})
