import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { formId } = await req.json()
    
    if (!formId) {
      return new Response(
        JSON.stringify({ error: 'Form ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const googleApiKey = Deno.env.get('GOOGLE_API_KEY')
    
    if (!googleApiKey) {
      return new Response(
        JSON.stringify({ error: 'Google API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Fetch form metadata and questions from Google Forms API
    const formResponse = await fetch(
      `https://forms.googleapis.com/v1/forms/${formId}?key=${googleApiKey}`
    )

    if (!formResponse.ok) {
      throw new Error(`Google Forms API error: ${formResponse.statusText}`)
    }

    const formData = await formResponse.json()
    
    // Transform Google Forms data to our quiz format
    const questions = formData.items
      ?.filter((item: any) => item.questionItem?.question?.choiceQuestion)
      .map((item: any, index: number) => {
        const question = item.questionItem.question
        const choices = question.choiceQuestion.options || []
        
        return {
          id: item.itemId || `question_${index}`,
          question: item.title || question.choiceQuestion.prompt || '',
          options: choices.map((choice: any) => choice.value || ''),
          correctAnswer: 0, // You'll need to configure this separately
          points: 10 // Default points
        }
      }) || []

    return new Response(
      JSON.stringify({ 
        questions,
        formTitle: formData.info?.title || 'Quiz',
        totalQuestions: questions.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error fetching Google Form:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})