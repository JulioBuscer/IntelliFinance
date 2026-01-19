# 🚀 IntelliFinance | AI-Powered Audit Dashboard

IntelliFinance es una solución de vanguardia diseñada para automatizar la captura y auditoría de datos financieros. Este proyecto demuestra la integración de Next.js 15+, Supabase y Visión Artificial (OCR) para eliminar el error humano en la gestión contable.

## 🎯 Impacto en el Negocio

En el sector contable, la captura manual de facturas consume hasta el 30% del tiempo de un auditor. IntelliFinance reduce este tiempo a segundos mediante:

- **Automatización**: Extracción de datos mediante IA directamente en el navegador.
- **Trazabilidad**: Sistema de estados (Processing, Verified, Error) para control de auditoría.
- **Escalabilidad**: Arquitectura Serverless desplegada en el Edge para respuesta global instantánea.

## 🏗️ Arquitectura Técnica (Tier S)

- **Frontend**: React 19 + Next.js (App Router). Uso extensivo de Server Actions para comunicación segura con la BD.
- **Estado & Datos**: Supabase como motor de base de datos relacional con Row Level Security (RLS) activado.
- **Motor de IA**: Tesseract.js para procesamiento OCR distribuido (Client-side), ahorrando costos de servidor.
- **Rendimiento**: Implementación de SSR para dashboards dinámicos y SSG para secciones informativas, optimizando el Core Web Vitals.

## 🚀 Instalación Rápida

### Clonar y Preparar

```bash
git clone https://github.com/tu-usuario/intellifinance-mvp.git
cd intellifinance-mvp
npm install
```

### Variables de Env (.env.local)

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### Ejecutar

```bash
npm run dev
```

## 🧪 Calidad y Testing

Se ha implementado Vitest para garantizar la integridad de los cálculos financieros:

- Pruebas unitarias para funciones de agregación de montos.
- Validación de Regex para extracción de datos OCR.

Ejecutar con:

```bash
npm test
```

## 📈 Roadmap de Ingeniería (Fase 2)

- **Análisis Predictivo**: Integración de modelos para detectar duplicidad de facturas.
- **Multi-tenant**: Soporte para múltiples firmas de auditoría con aislamiento de datos.
- **Mobile App**: Versión en React Native para captura de tickets en campo.

---

**Desarrollado con pasión por Julio Bustamante**  
*Software Engineer | Experto en Ecosistemas Web & IA*