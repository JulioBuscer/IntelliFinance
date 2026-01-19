import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-6 relative overflow-hidden font-sans">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]"></div>

            <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-2xl p-8 md:p-10 rounded-[2.5rem] border border-slate-800 shadow-2xl z-10 transition-all">
                {children}
            </div>

            <p className="mt-8 text-slate-600 text-[10px] uppercase tracking-[0.25em] font-medium z-10">
                Financial Solutions • Global Audit Engine v2.5
            </p>
        </div>
    )
}

export default AuthLayout