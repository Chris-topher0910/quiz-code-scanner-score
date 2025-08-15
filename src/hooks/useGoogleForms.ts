import { useState } from 'react'
import { QuizQuestion } from '@/pages/Index'
import { useToast } from '@/hooks/use-toast'

interface GoogleFormData {
  questions: QuizQuestion[]
  formTitle: string
  totalQuestions: number
}

export const useGoogleForms = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const fetchFormQuestions = async (formId: string): Promise<GoogleFormData | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/fetch-google-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formId })
      })

      if (!response.ok) {
        throw new Error('Falha ao buscar formulário do Google')
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      toast({
        title: "Sucesso!",
        description: `Formulário "${data.formTitle}" carregado com ${data.totalQuestions} perguntas.`,
      })

      return data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido'
      setError(errorMessage)
      
      toast({
        title: "Erro",
        description: errorMessage,
        variant: "destructive",
      })
      
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    fetchFormQuestions,
    loading,
    error
  }
}