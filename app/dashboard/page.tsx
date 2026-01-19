import { createClient } from "../lib/supabase/server";
import { UploadCloud } from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();

  return (
    <section id="view-dashboard" className="view active animate-fade-in">
        <header className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-2xl font-bold text-white">Panel de Auditoría</h1>
                <p className="text-slate-400 text-sm">Resumen general del sistema.</p>
            </div>
            <div className="flex gap-3">
                <span className="bg-green-500/10 text-green-400 text-[10px] font-bold px-2 py-1 rounded uppercase border border-green-500/20 self-center">Sistema Online</span>
            </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Total Auditado</p>
                    <span className="text-green-400 text-[10px] font-bold">+12%</span>
                </div>
                <h3 className="text-3xl font-bold text-white">$124,500.00</h3>
                <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-2/3"></div>
                </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Gastos del Mes</p>
                    <span className="text-slate-500 text-[10px] font-bold">Meta: $50k</span>
                </div>
                <h3 className="text-3xl font-bold text-white">$45,210.50</h3>
                <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full w-[90%]"></div>
                </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-slate-800">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-slate-400 text-sm font-medium">Facturas con IA</p>
                    <span className="text-blue-400 text-[10px] font-bold">Activo</span>
                </div>
                <h3 className="text-3xl font-bold text-blue-400">89</h3>
                <p className="text-[10px] text-slate-500 mt-4 italic">7.2 horas ahorradas hoy</p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Zona OCR Reforzada */}
            <div className="bg-slate-800/50 p-6 rounded-3xl border-2 border-dashed border-slate-700 flex flex-col items-center justify-center min-h-[300px] group hover:border-blue-500/50 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Carga con IA (OCR)</h4>
                <p className="text-slate-400 text-center text-xs mb-6 max-w-[250px]">El sistema detectará monto, fecha y concepto automáticamente.</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-900/40 transition-all">Procesar Factura</button>
            </div>
            
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
    </section>
  )
}