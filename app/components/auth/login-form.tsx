'use client'
import { login } from '@/app/actions/auth'
import { useState, useTransition } from 'react'

const LoginForm = () => {

  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    setError(null)
    startTransition(async () => {
      const result = await login(formData)

      if (result?.error) {
        if (result.error === "Invalid login credentials") {
          setError("Email o contraseña incorrectos. ¿Ya tienes una cuenta? Si no, regístrate primero.")
        } else {
          setError(result.error)
        }
      }
    })
  }

  return (
    <form action={handleSubmit} className="space-y-5">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm flex items-center gap-3 animate-head-shake">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 ml-1">Email Corporativo</label>
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="nombre@financial.com" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-700"
            />
        </div>

        <div>
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-2 ml-1">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              required 
              placeholder="••••••••" 
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white outline-none focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-slate-700"
            />
        </div>

        <div className="text-right">
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">¿Olvidaste tu contraseña?</a>
        </div>

        <button 
            type="submit" 
            disabled={isPending}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 transition-all mt-4 flex items-center justify-center gap-3"
        >
            {isPending ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Procesando...</span>
              </>
            ) : "Entrar al Dashboard"}
        </button>
    </form>
  )
}

export default LoginForm