'use server'
import { revalidatePath } from "next/cache"
import { createClient } from "../lib/supabase/server"
import { redirect } from "next/navigation"
import { headers } from "next/headers"


interface LoginCredentials {
    email: string
    password: string
}


interface SignupCredentials {
    email: string
    password: string
    confirmPassword: string
}

interface AuthActionResponse {
    error?: string
    success?: boolean
    message?: string
}

export async function signup(formData: FormData): Promise<AuthActionResponse> {

    const supabase = await createClient();

    console.log(formData)

    const credentials: SignupCredentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirmPassword") as string,
    }

    // Validación de campos requeridos
    if (!credentials.email || !credentials.password) {
        return { error: "Email y contraseña son requeridos" }
    }

    // Validación de longitud de contraseña
    // Supabase requiere mínimo 6 caracteres por defecto
    if (credentials.password.length < 6) {
        return { error: "La contraseña debe tener al menos 6 caracteres" }
    }

    // Validación de confirmación de contraseña
    if (credentials.password !== credentials.confirmPassword) {
        return { error: "Las contraseñas no coinciden" }
    }

    /**
     * signUp crea un nuevo usuario en Supabase
     *
     * OPTIONS:
     * - emailRedirectTo: URL a la que se redirige después de confirmar email
     *
     * IMPORTANTE: Usamos NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL para desarrollo
     * porque los emails de confirmación necesitan una URL absoluta que funcione.
     * En producción, usamos window.location.origin (pero en server no hay window,
     * así que construimos la URL desde los headers)
     */
    const headersList = await headers()
    const origin = headersList.get("origin") || headersList.get("host") || ""
    const baseUrl = origin.startsWith("http") ? origin : `https://${origin}`

    const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
            // En desarrollo, usa la variable de entorno especial de Supabase
            // En producción, usa la URL del host actual
            emailRedirectTo: process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${baseUrl}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Redirigimos a una página que indica que revisen su email
    revalidatePath("/", "layout")
    redirect("/dashboard")
}


export async function login(formData: FormData): Promise<AuthActionResponse> {
    // Creamos el cliente de Supabase para el servidor
    // IMPORTANTE: Siempre crear una nueva instancia, nunca reusar
    const supabase = await createClient()

    // Extraemos las credenciales del FormData
    // FormData es el formato nativo de los formularios HTML
    const credentials: LoginCredentials = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
    }

    // Validación básica de campos
    if (!credentials.email || !credentials.password) {
        return { error: "Email y contraseña son requeridos" }
    }

    // Intentamos el login con Supabase
    // signInWithPassword verifica las credenciales contra la base de datos
    const { error } = await supabase.auth.signInWithPassword(credentials)

    if (error) {
        // Retornamos el error para mostrarlo en el formulario
        // NO redirigimos aquí para que el usuario pueda corregir
        return { error: error.message }
    }

    /**
     * revalidatePath limpia el cache de Next.js para la ruta especificada
     *
     * ¿Por qué "/"?
     * - Limpiamos el cache de toda la app para reflejar el nuevo estado de auth
     * - Las páginas que muestran datos del usuario se re-renderizarán
     *
     * 'layout' indica que queremos invalidar también el layout, no solo la página
     */
    revalidatePath("/", "layout")

    // Redirigimos al dashboard después del login exitoso
    redirect("/dashboard")
}