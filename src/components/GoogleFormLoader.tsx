import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { useGoogleForms } from '@/hooks/useGoogleForms'
import { QuizQuestion } from '@/pages/Index'

interface GoogleFormLoaderProps {
  onQuestionsLoaded: (questions: QuizQuestion[]) => void
}

export const GoogleFormLoader: React.FC<GoogleFormLoaderProps> = ({ onQuestionsLoaded }) => {
  const [formId, setFormId] = useState('')
  const { fetchFormQuestions, loading, error } = useGoogleForms()

  const handleLoadForm = async () => {
    if (!formId.trim()) return

    const data = await fetchFormQuestions(formId.trim())
    if (data && data.questions.length > 0) {
      onQuestionsLoaded(data.questions)
    }
  }

  const extractFormId = (url: string) => {
    // Extract form ID from Google Forms URL
    const match = url.match(/\/forms\/d\/([a-zA-Z0-9-_]+)/)
    return match ? match[1] : url
  }

  const handleInputChange = (value: string) => {
    const id = extractFormId(value)
    setFormId(id)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Carregar Google Forms</CardTitle>
        <CardDescription>
          Digite o ID ou URL do Google Forms para carregar as perguntas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-input">URL ou ID do Formulário</Label>
          <Input
            id="form-input"
            placeholder="https://docs.google.com/forms/d/... ou ID do formulário"
            value={formId}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={loading}
          />
        </div>
        
        {error && (
          <p className="text-sm text-destructive">{error}</p>
        )}

        <Button 
          onClick={handleLoadForm}
          disabled={!formId.trim() || loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Carregando...
            </>
          ) : (
            'Carregar Perguntas'
          )}
        </Button>

        <div className="text-xs text-muted-foreground">
          <p>Para usar esta funcionalidade, você precisa:</p>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>API Key do Google Forms configurada</li>
            <li>Formulário público ou com permissões adequadas</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}