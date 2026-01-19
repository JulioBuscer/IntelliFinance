export const DashboardHeader = () => {
    return (
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel de Auditoría</h1>
                <p className="text-slate-400 text-sm">Resumen general del sistema.</p>
            </div>
            <div className="flex gap-3">
                <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase border border-green-500/20 self-center">Sistema Online</span>
            </div>
        </header>
    )
}
