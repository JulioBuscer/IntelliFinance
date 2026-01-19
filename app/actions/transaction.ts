'use server'

import { createClient } from "../lib/supabase/server"
import { revalidatePath } from "next/cache"
import { Transaction } from "../lib/types"

export interface TransactionData {
    concept: string
    amount: number
    category: string
    transaction_date: string
    receipt_url?: string // Por si subimos la imagen a Storage en el futuro
}

export async function upsertTransaction(data: TransactionData, isOCR: boolean = false) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Usuario no autenticado" }
    }

    const { data: transaction, error } = await supabase
        .from('transactions')
        .insert({
            user_id: user.id,
            concept: data.concept,
            amount: data.amount,
            category: data.category,
            transaction_date: data.transaction_date,
            status: isOCR ? 'pending' : 'verified', // Directamente verificado si viene del usuario, y 'pending' si viene del OCR
            is_ai_processed: isOCR
        })
        .select()
        .single()

    if (error) {
        console.error("Error inserting transaction:", error)
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, transaction: transaction as Transaction }
}
