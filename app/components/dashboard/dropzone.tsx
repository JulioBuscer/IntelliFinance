'use client'

import { useCallback, useState, startTransition } from 'react'
import { useDropzone } from 'react-dropzone'
import { createWorker } from 'tesseract.js'
import { UploadCloud, Loader2, FileText } from 'lucide-react'
import { OCRModal } from './ocr-modal'
import { upsertTransaction } from '@/app/actions/transaction'

// Definimos un tipo para la función externa de optimismo (callback)
interface DropzoneProps {
    onTransactionAdded: (tx: any) => void
}

export const Dropzone = ({ onTransactionAdded }: DropzoneProps) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [extractedData, setExtractedData] = useState({ concept: '', amount: 0, date: '' })

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsProcessing(true)
    setProgress(0)

    try {
        const worker = await createWorker('eng') // Usamos inglés por defecto para mejor detección de números
        /**
         * Logger para progreso (opcional, tesseract v5 cambió API)
         * worker.logger = m => ...
         */
        
        const ret = await worker.recognize(file)
        const text = ret.data.text
        console.log("OCR Text:", text)
        
        // --- REGEX LOGIC ---
        // 1. Monto: Busca patrones monetarios. Prioriza el mayor número encontrado que parezca un total.
        // Patrones: 123.45, 1,234.56, $123.45
        const amountRegex = /(\$?\d{1,3}(,\d{3})*(\.\d{2})?)/g
        console.log("Amount Regex:", amountRegex)
        const amountMatches = text.match(amountRegex)
        console.log("Amount Matches:", amountMatches)
        
        let maxAmount = 0
        if(amountMatches) {
            // Limpiar y parsear para encontrar el máximo (asumiendo que es el Total)
            maxAmount = amountMatches.reduce((max, curr) => {
                const clean = parseFloat(curr.replace(/[$,]/g, ''))
                return (!isNaN(clean) && clean > max) ? clean : max
            }, 0)
            console.log("Max Amount:", maxAmount)
        }

        // 2. Fecha: DD/MM/YYYY o YYYY-MM-DD
        const dateMatch = text.match(/(\d{2}[-/]\d{2}[-/]\d{4})|(\d{4}[-/]\d{2}[-/]\d{2})/)
        console.log("Date Match:", dateMatch)
        let dateVal = new Date().toISOString().split('T')[0] // Default hoy
        console.log("Date Val:", dateVal)
        if(dateMatch) {
            // Un parser básico podría ir aquí, pero por MVP dejamos hoy o el match directo si es ISO
             // Si el formato es DD/MM/YYYY hay que invertirlo para el input date (YYYY-MM-DD)
             // Dejaremos la fecha de hoy por simplicidad del MVP si el parseo falla
        }

        // 3. Concepto: Tomamos la primera línea o una genérica
        const lines = text.split('\n').filter(line => line.trim().length > 3)
        console.log("Lines:", lines)
        const conceptVal = lines[0] || "Ticket escaneado"
        console.log("Concept Val:", conceptVal)

        setExtractedData({
            concept: conceptVal.slice(0, 30), // Limit length
            amount: maxAmount,
            date: dateVal
        })
        console.log("Extracted Data:", extractedData)
        await worker.terminate()
        setModalOpen(true)

    } catch (err) {
        console.error("OCR Error:", err)
        alert("Error procesando imagen. Intenta con otra.")
    } finally {
        setIsProcessing(false)
    }

  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
      onDrop, 
      accept: {'image/*': []},
      multiple: false
  })

  const handleConfirm = async (data: any) => {
      setModalOpen(false)
      
      const newTransaction = {
          concept: data.concept,
          amount: parseFloat(data.amount),
          category: 'Otros',
          transaction_date: data.date
      }

      // Optimistic Update Call wrapped in startTransition
      startTransition(() => {
          onTransactionAdded(newTransaction)
      })

      // Server Action
      await upsertTransaction(newTransaction, true)
  }

  return (
    <>
        <div 
            {...getRootProps()} 
            className={`
                bg-slate-800/50 p-6 rounded-3xl border-2 border-dashed 
                flex flex-col items-center justify-center min-h-[300px] group transition-all cursor-pointer relative overflow-hidden
                ${isDragActive ? 'border-blue-500 bg-blue-500/10' : 'border-slate-700 hover:border-blue-500/50'}
            `}
        >
            <input {...getInputProps()} />
            
            {isProcessing ? (
                <div className="flex flex-col items-center z-10">
                    <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
                    <p className="text-white font-bold animate-pulse">Analizando Recibo...</p>
                    <p className="text-slate-500 text-xs mt-2">Nuestra IA está leyendo los detalles</p>
                </div>
            ) : (
                <>
                    <div className="w-16 h-16 bg-blue-600/10 text-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <UploadCloud className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2">Carga con IA (OCR)</h4>
                    <p className="text-slate-400 text-center text-xs mb-6 max-w-[250px]">Arrastra tu factura o haz click para escanear automáticamente.</p>
                    <button className="bg-blue-600 group-hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-medium shadow-lg shadow-blue-900/40 transition-all">
                        Procesar Factura
                    </button>
                </>
            )}

            {/* Background decoration */}
            {isProcessing && (
                <div className="absolute inset-0 bg-blue-500/5 backdrop-blur-[1px]"></div>
            )}
        </div>

        <OCRModal 
            isOpen={modalOpen} 
            onClose={() => setModalOpen(false)} 
            onConfirm={handleConfirm}
            initialData={extractedData}
        />
    </>
  )
}
