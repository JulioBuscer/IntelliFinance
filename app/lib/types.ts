export type TransactionStatus = 'pending' | 'processing' | 'verified' | 'error';

export interface Transaction {
    id: string;
    user_id: string;
    concept: string;
    amount: number;
    category: string;
    status: TransactionStatus;
    receipt_url?: string;
    is_ai_processed: boolean;
    created_at: string;
    transaction_date: string;
}
