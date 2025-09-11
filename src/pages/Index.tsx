
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCodeScanner } from "@/components/QrCodeScanner";
import { QuizInterface } from "@/components/QuizInterface";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { UserForm } from "@/components/UserForm";
import { GoogleFormLoader } from "@/components/GoogleFormLoader";
import { Trophy, QrCode, User, FileText } from "lucide-react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
}

export interface UserData {
  name: string;
  email: string;
}

export interface QuizResult {
  questionId: string;
  question: string;
  userAnswer: number;
  correctAnswer: number;
  points: number;
  isCorrect: boolean;
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'user' | 'loader' | 'scanner' | 'quiz' | 'results'>('user');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState<QuizQuestion[]>([]);

  const handleUserSubmit = (user: UserData) => {
    setUserData(user);
    setCurrentStep('loader');
  };

  const handleQuestionsLoaded = (questions: QuizQuestion[]) => {
    setAvailableQuestions(questions);
    setCurrentStep('scanner');
  };

  const handleSkipGoogleForms = () => {
    // Use default questions if user wants to skip Google Forms
    setAvailableQuestions(getDefaultQuestions());
    setCurrentStep('scanner');
  };

  const handleQrCodeScanned = (questionId: string) => {
    // Buscar pergunta baseada no ID do QR Code
    const question = getQuestionById(questionId);
    if (question) {
      setCurrentQuestion(question);
      setCurrentStep('quiz');
    }
  };

  const handleQuizAnswer = (answer: number) => {
    if (!currentQuestion) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    const points = isCorrect ? currentQuestion.points : 0;
    
    const result: QuizResult = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      userAnswer: answer,
      correctAnswer: currentQuestion.correctAnswer,
      points: points,
      isCorrect: isCorrect
    };

    setQuizResults(prev => [...prev, result]);
    setTotalScore(prev => prev + points);
    setCurrentStep('results');
  };

  const resetQuiz = () => {
    setCurrentStep('scanner');
    setCurrentQuestion(null);
  };

  const resetApp = () => {
    setCurrentStep('user');
    setUserData(null);
    setCurrentQuestion(null);
    setQuizResults([]);
    setTotalScore(0);
    setAvailableQuestions([]);
  };

  // Função para buscar perguntas (do Google Forms ou padrão)
  const getQuestionById = (id: string): QuizQuestion | null => {
    return availableQuestions.find(q => q.id === id) || null;
  };

  // Perguntas do formulário Google Apps Script
  const getDefaultQuestions = (): QuizQuestion[] => [
    {
      id: '1',
      question: 'Qual é a capital do Brasil?',
      options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '2',
      question: 'Quanto é 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      points: 5
    },
    {
      id: '3',
      question: 'Qual é o maior planeta do sistema solar?',
      options: ['Terra', 'Marte', 'Júpiter', 'Saturno'],
      correctAnswer: 2,
      points: 15
    },
    {
      id: '4',
      question: 'Quem pintou a Mona Lisa?',
      options: ['Van Gogh', 'Leonardo da Vinci', 'Picasso', 'Michelangelo'],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '5',
      question: 'Qual é o elemento químico com símbolo O?',
      options: ['Ouro', 'Oxigênio', 'Ósmio', 'Oligênio'],
      correctAnswer: 1,
      points: 10
    },
    {
      id: '6',
      question: 'Em que ano o homem pisou na Lua pela primeira vez?',
      options: ['1967', '1968', '1969', '1970'],
      correctAnswer: 2,
      points: 20
    },
    {
      id: '7',
      question: 'Qual é o maior oceano do mundo?',
      options: ['Atlântico', 'Índico', 'Ártico', 'Pacífico'],
      correctAnswer: 3,
      points: 10
    },
    {
      id: '8',
      question: 'Quantos continentes existem?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 2,
      points: 5
    },
    {
      id: '9',
      question: 'Qual é a moeda oficial do Japão?',
      options: ['Won', 'Yuan', 'Yen', 'Dong'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '10',
      question: 'Quem escreveu "Dom Casmurro"?',
      options: ['Machado de Assis', 'José de Alencar', 'Clarice Lispector', 'Guimarães Rosa'],
      correctAnswer: 0,
      points: 15
    },
    {
      id: '11',
      question: 'Qual é a fórmula da água?',
      options: ['CO2', 'H2O', 'O2', 'H2SO4'],
      correctAnswer: 1,
      points: 5
    },
    {
      id: '12',
      question: 'Em que país se localiza Machu Picchu?',
      options: ['Chile', 'Bolívia', 'Peru', 'Equador'],
      correctAnswer: 2,
      points: 15
    },
    {
      id: '13',
      question: 'Qual é o menor país do mundo?',
      options: ['Mônaco', 'Vaticano', 'San Marino', 'Liechtenstein'],
      correctAnswer: 1,
      points: 20
    },
    {
      id: '14',
      question: 'Quantos lados tem um hexágono?',
      options: ['5', '6', '7', '8'],
      correctAnswer: 1,
      points: 5
    },
    {
      id: '15',
      question: 'Qual é a velocidade da luz no vácuo?',
      options: ['300.000 km/s', '299.792.458 m/s', '150.000 km/s', '400.000 km/s'],
      correctAnswer: 1,
      points: 25
    },
    {
      id: '16',
      question: 'Quem foi o primeiro presidente do Brasil?',
      options: ['Getúlio Vargas', 'Juscelino Kubitschek', 'Deodoro da Fonseca', 'Floriano Peixoto'],
      correctAnswer: 2,
      points: 15
    },
    {
      id: '17',
      question: 'Qual é o rio mais longo do mundo?',
      options: ['Rio Amazonas', 'Rio Nilo', 'Rio Mississipi', 'Rio Yangtzé'],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '18',
      question: 'Em que ano foi proclamada a Independência do Brasil?',
      options: ['1820', '1821', '1822', '1823'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '19',
      question: 'Qual é o sistema operacional desenvolvido pela Apple?',
      options: ['Windows', 'Linux', 'Android', 'macOS'],
      correctAnswer: 3,
      points: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">Quiz Scanner</h1>
          </div>
          <p className="text-gray-600">Escaneie QR Codes e responda perguntas para ganhar pontos!</p>
        </div>

        {currentStep === 'user' && (
          <UserForm onSubmit={handleUserSubmit} />
        )}

        {currentStep === 'loader' && userData && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Carregar Perguntas
                </CardTitle>
                <CardDescription>
                  Carregue perguntas do Google Forms ou use as perguntas padrão
                </CardDescription>
              </CardHeader>
            </Card>
            
            <GoogleFormLoader onQuestionsLoaded={handleQuestionsLoaded} />
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">ou</p>
              <Button 
                variant="outline" 
                onClick={handleSkipGoogleForms}
                className="w-full"
              >
                Usar Perguntas Padrão
              </Button>
            </div>
          </div>
        )}

        {currentStep === 'scanner' && userData && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Olá, {userData.name}!
                </CardTitle>
                <CardDescription>
                  Escaneie um QR Code para começar o quiz
                </CardDescription>
              </CardHeader>
            </Card>
            <QrCodeScanner onScan={handleQrCodeScanned} />
          </div>
        )}

        {currentStep === 'quiz' && currentQuestion && (
          <QuizInterface
            question={currentQuestion}
            onAnswer={handleQuizAnswer}
          />
        )}

        {currentStep === 'results' && (
          <div className="space-y-4">
            <ScoreDisplay
              results={quizResults}
              totalScore={totalScore}
              userName={userData?.name || ''}
            />
            <div className="flex gap-2">
              <Button onClick={resetQuiz} variant="outline" className="flex-1">
                Escanear Novo QR
              </Button>
              <Button onClick={resetApp} className="flex-1">
                Novo Usuário
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
