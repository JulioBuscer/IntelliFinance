import { createClient } from "../lib/supabase/server";
import { DashboardHeader } from "../components/dashboard/header";
import { TransactionsView } from "../components/dashboard/transactions-view";
import { Transaction } from "../lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  // Fetch transactions
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching transactions:", error);
  }

  const typedTransactions = (transactions || []) as Transaction[];

  return (
    <section id="view-dashboard" className="view active animate-fade-in space-y-8">
        <DashboardHeader />
        <TransactionsView initialTransactions={typedTransactions} />
    </section>
  )
}