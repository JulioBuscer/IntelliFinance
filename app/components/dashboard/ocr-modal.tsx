'use client'
import { useState, useEffect } from "react"
import { UploadCloud, Check, X } from "lucide-react"

interface OCRModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (data: any) => void
  initialData: {
    amount: number
    concept: string
    date: string
  }
}

export const OCRModal = ({ isOpen, onClose, onConfirm, initialData }: OCRModalProps) => {
  const [formData, setFormData] = useState(initialData)

  // Sync state with props when data changes
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData)
    }
  }, [initialData, isOpen])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onConfirm(formData)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
       <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-10 h-10 bg-blue-600/20 text-blue-400 rounded-xl flex items-center justify-center">
                <span className="text-xl">✨</span>
             </div>
             <div>
                 <h3 className="text-xl font-bold text-white">IA Detectó Datos</h3>
                 <p className="text-slate-400 text-xs">Verifica la información extraída.</p>
             </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
               <div>
                  <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Concepto Detectado</label>
                  <input 
                    type="text" 
                    name="concept"
                    value={formData.concept}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                  />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div>
                      <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Monto Total</label>
                      <div className="relative">
                          <span className="absolute left-3 top-3 text-slate-500">$</span>
                          <input 
                            type="number" 
                            name="amount"
                            step="0.01"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 pl-8 text-white focus:ring-2 focus:ring-blue-600 outline-none font-mono"
                          />
                      </div>
                  </div>
                  <div>
                      <label className="text-xs uppercase font-bold text-slate-500 mb-1 block">Fecha</label>
                      <input 
                        type="date" 
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white focus:ring-2 focus:ring-blue-600 outline-none"
                      />
                  </div>
               </div>

               <div className="pt-4 flex gap-3">
                   <button 
                      type="button" 
                      onClick={onClose}
                      className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors"
                   >
                      Cancelar
                   </button>
                   <button 
                      type="submit"
                      className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2"
                   >
                      <Check className="w-4 h-4" />
                      Confirmar
                   </button>
               </div>
          </form>
       </div>
    </div>
  )
}
