import { Skeleton } from "../components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <section className="animate-pulse">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center mb-8">
            <div className="space-y-2">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-6 w-24" />
        </div>

        {/* Metric Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-3xl" />
            <Skeleton className="h-48 w-full rounded-3xl" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Skeleton className="h-[300px] w-full rounded-3xl" />
            <Skeleton className="h-[300px] w-full rounded-3xl" />
        </div>
        
        {/* Table Skeleton fallback since table isn't usually in loading.tsx for layout but here it helps */}
         <div className="mt-8">
            <Skeleton className="h-64 w-full rounded-3xl" />
         </div>
    </section>
  )
}
