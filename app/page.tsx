'use server'
import { cookies } from "next/headers";
import { createClient } from "./lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "./components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data: {user} } = await supabase.auth.getUser();
  if(user){
    redirect("/dashboard");
  }
  return (
   <div className="bg-slate-900 text-white min-h-screen font-sans selection:bg-blue-500/30">
      {/* Navbar Simple */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">iF</div>
          <span className="text-xl font-bold tracking-tight">IntelliFinance</span>
        </div>
        <Button variant="ghost" asChild 
          className="text-sm font-medium hover:text-blue-400 transition-colors">
          <Link href="/login">Iniciar sesión</Link>
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="max-w-5xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest animate-fade-in">
          Enero 2026 • Powered by AI
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tighter">
          Auditoría Financiera <br /> 
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent italic">
            a la velocidad de la IA.
          </span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Automatiza la captura de facturas, detecta anomalías y sincroniza tus libros contables en segundos. Diseñado para auditores que miran al futuro.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button variant="default" asChild 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/40 transition-all hover:scale-105">
            <Link href="/login">Empieza Gratis Ahora</Link>
          </Button>
        </div>
      </header>

      {/* Mini Features */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-800">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-6">✨</div>
          <h3 className="text-xl font-bold mb-3 text-white">OCR de Alta Precisión</h3>
          <p className="text-slate-400 text-sm">Extracción automática de montos y RFCs desde cualquier ticket o PDF.</p>
        </div>
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-800">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">🔒</div>
          <h3 className="text-xl font-bold mb-3 text-white">Seguridad Bancaria</h3>
          <p className="text-slate-400 text-sm">Tus datos están protegidos con encriptación AES-256 y RLS de Supabase.</p>
        </div>
        <div className="p-8 bg-slate-800/40 rounded-3xl border border-slate-800">
          <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-xl flex items-center justify-center mb-6">☁️</div>
          <h3 className="text-xl font-bold mb-3 text-white">Multi-Cloud Ready</h3>
          <p className="text-slate-400 text-sm">Arquitectura desplegada en el Edge para latencia cero en todo el mundo.</p>
        </div>
      </section>
    </div>
  );
}
