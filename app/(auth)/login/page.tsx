
'use client'
import { FC, useState } from 'react'
import LoginForm from '@/app/components/auth/login-form'
import SignupForm from '@/app/components/auth/signup-form'
interface AuthProps {
    defaultMode: "login" | "signup"
}
const AuthPage : FC<AuthProps> = ({defaultMode = "login"}) => {
    const [mode, setMode] = useState<"login" | "signup">(defaultMode)
    return (
        <>
            <div className="flex flex-col items-center mb-10">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-white text-3xl mb-4 shadow-xl shadow-blue-900/40">iF</div>
                <h2 className="text-2xl font-bold text-white tracking-tight">
                    {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta de Auditor'}
                </h2>
                <p className="text-slate-500 text-sm mt-2 text-center">
                    {mode === 'login' 
                    ? 'Ingresa tus credenciales para acceder al panel' 
                    : 'Únete a la plataforma líder en auditoría con IA'}
                </p>
            </div>

            {mode === 'login' ? <LoginForm /> : <SignupForm />}

            <div className="mt-8 pt-8 border-t border-slate-800 text-center">
                <p className="text-slate-500 text-sm">
                    {mode === 'login' ? '¿Aún no tienes acceso?' : '¿Ya tienes una cuenta?'} 
                    <button 
                        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                        className="ml-2 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                    >
                        {mode === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
                    </button>
                </p>
            </div>
        </>
    )
}

export default AuthPage