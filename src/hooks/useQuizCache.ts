import { useState, useEffect } from 'react'
import { QuizQuestion, QuizResult, UserData } from '@/pages/Index'

interface CachedQuiz {
  questions: QuizQuestion[]
  timestamp: number
}

interface UserScore {
  userId: string
  userName: string
  userEmail: string
  score: number
  totalQuestions: number
  results: QuizResult[]
  timestamp: number
}

const QUESTIONS_KEY = 'quiz_cached_questions'
const SCORES_KEY = 'quiz_user_scores'

export const useQuizCache = () => {
  const [cachedQuestions, setCachedQuestions] = useState<QuizQuestion[]>([])
  const [userScores, setUserScores] = useState<UserScore[]>([])

  // Load cached data on mount
  useEffect(() => {
    loadCachedQuestions()
    loadUserScores()
  }, [])

  const loadCachedQuestions = () => {
    try {
      const cached = localStorage.getItem(QUESTIONS_KEY)
      if (cached) {
        const data: CachedQuiz = JSON.parse(cached)
        setCachedQuestions(data.questions)
      }
    } catch (error) {
      console.error('Error loading cached questions:', error)
    }
  }

  const loadUserScores = () => {
    try {
      const scores = localStorage.getItem(SCORES_KEY)
      if (scores) {
        setUserScores(JSON.parse(scores))
      }
    } catch (error) {
      console.error('Error loading user scores:', error)
    }
  }

  const saveQuestions = (questions: QuizQuestion[]) => {
    try {
      const cacheData: CachedQuiz = {
        questions,
        timestamp: Date.now()
      }
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(cacheData))
      setCachedQuestions(questions)
    } catch (error) {
      console.error('Error saving questions:', error)
    }
  }

  const saveUserScore = (user: UserData, results: QuizResult[], questions: QuizQuestion[]) => {
    try {
      const score = results.reduce((acc, result) => acc + result.points, 0)
      
      // Create a unique key for each session
      const sessionKey = `userScore_${user.email}_${Date.now()}`
      
      const sessionData = {
        user: {
          name: user.name,
          email: user.email
        },
        results,
        totalScore: score,
        timestamp: new Date().toISOString()
      }

      localStorage.setItem(sessionKey, JSON.stringify(sessionData))
    } catch (error) {
      console.error('Error saving user score:', error)
    }
  }

  const getUserScore = (userEmail: string): UserScore | null => {
    return userScores.find(s => s.userId === userEmail) || null
  }

  const hasCachedQuestions = (): boolean => {
    return cachedQuestions.length > 0
  }

  return {
    cachedQuestions,
    userScores,
    saveQuestions,
    saveUserScore,
    getUserScore,
    hasCachedQuestions,
    loadCachedQuestions
  }
}
