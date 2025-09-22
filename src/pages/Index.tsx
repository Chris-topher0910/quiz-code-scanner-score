
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
  const [currentStep, setCurrentStep] = useState<'user' | 'main' | 'quiz' | 'results'>('user');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [totalScore, setTotalScore] = useState(0);
  const [availableQuestions, setAvailableQuestions] = useState<QuizQuestion[]>([]);

  const handleUserSubmit = (user: UserData) => {
    setUserData(user);
    setCurrentStep('main');
  };

  const handleQuestionsLoaded = (questions: QuizQuestion[]) => {
    setAvailableQuestions(questions);
  };

  const handleSkipGoogleForms = () => {
    // Use default questions if user wants to skip Google Forms
    setAvailableQuestions(getDefaultQuestions());
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
    setCurrentStep('main');
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

  // Perguntas sobre Informática
  const getDefaultQuestions = (): QuizQuestion[] => [
    {
      id: '1',
      question: 'QUAL DESSES É UM PERIFÉRICO DE ENTRADA?',
      options: ['IMPRESSORA', 'MONITOR', 'WEBCAM (CÂMERA)', 'CAIXA DE SOM', 'HEAD-SET'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '2',
      question: 'QUAL É A DEFINIÇÃO DE HARDWARE?',
      options: [
        'Hardware é a parte física do computador e de outros dispositivos eletrônicos.',
        'Hardware é a parte lógica do computador, composta pelos programas e aplicativos que executam tarefas.',
        'Hardware é a parte física do computador, mas inclui apenas os dispositivos de entrada',
        'Hardware é o conjunto de instruções responsáveis por controlar o funcionamento do s.o'
      ],
      correctAnswer: 0,
      points: 15
    },
    {
      id: '3',
      question: 'NA ARQUITETURA DOS COMPUTADORES, QUAL COMPONENTE É RESPONSÁVEL PELA MEMÓRIA TEMPORÁRIA?',
      options: ['CPU', 'ROM', 'RAM', 'FONTE', 'PLM'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '4',
      question: 'QUAL O FATOR QUE MOTIVOU A CRIAÇÃO DA ARPANET PELO GOVERNO DOS EUA?',
      options: ['Primeira Guerra Mundial', 'Segunda Guerra Mundial', 'Guerra Fria', 'Guerra do Golfo', 'Guerra do Vietnã'],
      correctAnswer: 2,
      points: 20
    },
    {
      id: '5',
      question: 'QUAL O ÓRGÃO RESPONSÁVEL PELA CRIAÇÃO DA ARPANET?',
      options: ['MICROSOFT', 'IBM', 'APPLE', 'DARPA', 'GOOGLE'],
      correctAnswer: 3,
      points: 15
    },
    {
      id: '6',
      question: 'NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTRAR O IP DO COMPUTADOR?',
      options: ['arp -a', 'shutdown -s -t', 'ipconfig', '/displaydns', '/flushDNS'],
      correctAnswer: 2,
      points: 10
    },
    {
      id: '7',
      question: 'NO CMD, QUAL O COMANDO RESPONSÁVEL POR PROGRAMAR O DESLIGAMENTO DO COMPUTADOR?',
      options: ['arp -a', 'shutdown -s -t', 'ipconfig', '/displayDNS', '/flushDNS'],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '8',
      question: 'NO CMD, QUAL O COMANDO RESPONSÁVEL POR MOSTRAR O HISTÓRICO DO ROTEADOR?',
      options: ['arp -a', 'shutdown -s -t', 'ipconfig', '/displayDNS', '/flushDNS'],
      correctAnswer: 0,
      points: 15
    },
    {
      id: '9',
      question: 'NO CMD, QUAL O COMANDO RESPONSÁVEL POR LIMPAR O HISTÓRICO DO ROTEADOR?',
      options: ['arp -a', 'shutdown -s -t', 'ipconfig', '/displayDNS', '/flushDNS'],
      correctAnswer: 4,
      points: 15
    },
    {
      id: '10',
      question: 'QUAL DESSES É UM PROGRAMA OPERACIONAL?',
      options: ['WORD', 'EXCEL', 'POWERPOINT', 'BROWSER', 'EXPLORER', 'MOUSE DRIVER'],
      correctAnswer: 5,
      points: 20
    },
    {
      id: '11',
      question: 'QUAL A DEFINIÇÃO DE SOFTWARE?',
      options: [
        'Software é a parte lógica do computador, composta por programas',
        'Software é a parte física do computador, formada por cabos, chips',
        'Software é o conjunto de dispositivos de entrada e saída',
        'Software é a energia elétrica que faz os componentes do computador'
      ],
      correctAnswer: 0,
      points: 15
    },
    {
      id: '12',
      question: 'QUAL DAS SEGUINTES OPÇÕES É UTILIZADA PARA ALTERAR A APARÊNCIA DO TEXTO SELECIONADO, COMO O TIPO DE LETRA, TAMANHO E COR?',
      options: [
        'Ferramenta de Alinhamento',
        'Ferramenta de Formatação de Fonte',
        'Ferramenta de Inserir Tabela',
        'Ferramenta de Verificação Ortográfica',
        'Ferramenta de Zoom'
      ],
      correctAnswer: 1,
      points: 10
    },
    {
      id: '13',
      question: 'QUAL É A FUNÇÃO DO COMANDO "QUEBRA DE SEÇÃO" NO WORD?',
      options: [
        'Inserir um novo parágrafo com formatação diferente',
        'Iniciar uma nova página com formatação distinta da anterior (como margens, orientação, cabeçalhos/rodapés).',
        'Alterar a fonte de todo o documento.',
        'Adicionar uma borda à página.',
        'Criar uma lista numerada.'
      ],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '14',
      question: 'O QUE SIGNIFICA O TERMO "CABEÇALHO" EM UM DOCUMENTO DO WORD?',
      options: [
        'Uma área no topo de cada página, usada para o texto principal do documento.',
        'Uma área no topo de cada página, usada para informações de orientação.',
        'Uma área no topo de cada página, usada para a nota de rodapé no final da página.',
        'Uma área no topo de cada página, usada para o título de um capítulo.',
        'Uma área no topo de cada página, usada para o texto que aparece em negrito.'
      ],
      correctAnswer: 1,
      points: 10
    },
    {
      id: '15',
      question: 'QUAL A DIFERENÇA ENTRE "SALVAR" E "SALVAR COMO"?',
      options: [
        'Não há diferença, são sinônimos.',
        '"Salvar" atualiza o arquivo existente com as últimas alterações, enquanto "Salvar como" permite salvar o documento com um novo nome ou em um local diferente, criando uma cópia.',
        '"Salvar como" apenas salva o documento pela primeira vez.',
        '"Salvar" permite escolher o formato do arquivo, e "Salvar como" não.',
        '"Salvar" fecha o documento, e "Salvar como" o mantém aberto.'
      ],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '16',
      question: 'PARA QUE SERVE O RECURSO "HIFENIZAÇÃO" NO WORD?',
      options: [
        'Para criar listas com marcadores e números.',
        'Para dividir palavras no final das linhas, quando necessário, para justificar o texto e evitar espaços excessivos.',
        'Para inserir símbolos especiais como © ou ®.',
        'Para ajustar o espaçamento entre as palavras.',
        'Para formatar o texto em colunas.'
      ],
      correctAnswer: 1,
      points: 20
    },
    {
      id: '17',
      question: 'QUAL A FUNÇÃO DA OPÇÃO "VISUALIZAR IMPRESSÃO"?',
      options: [
        'Permite editar o texto antes de imprimir.',
        'Mostra como o documento ficará após ser impresso, permitindo ajustes antes de enviar para a impressora.',
        'Define o número de cópias a serem impressas.',
        'Seleciona a impressora a ser utilizada.',
        'Altera a orientação da página para impressão.'
      ],
      correctAnswer: 1,
      points: 10
    },
    {
      id: '18',
      question: 'O QUE SÃO "NOTAS DE RODAPÉ" E "NOTAS DE FIM"?',
      options: [
        'São sinônimos e aparecem no final do documento.',
        'São textos explicativos ou referências que aparecem na parte inferior da página (rodapé) ou no final do documento/seção (fim).',
        'São apenas títulos de capítulos.',
        'São comentários feitos por outros usuários.',
        'São legendas de imagens.'
      ],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '19',
      question: 'QUAL O PROPÓSITO DE USAR "COLUNAS" EM UM DOCUMENTO DO WORD?',
      options: [
        'Para aumentar o tamanho da fonte do texto.',
        'Para organizar o texto em blocos verticais, semelhante à aparência de jornais ou revistas, melhorando a legibilidade em textos longos.',
        'Para criar tabelas com dados.',
        'Para aplicar negrito e itálico ao texto.',
        'Para inserir imagens e gráficos.'
      ],
      correctAnswer: 1,
      points: 15
    },
    {
      id: '20',
      question: 'O QUE O RECURSO "CONTROLE DE ALTERAÇÕES" (TRACK CHANGES) PERMITE FAZER?',
      options: [
        'Salvar automaticamente o documento a cada minuto.',
        'Registrar todas as modificações feitas em um documento (inserções, exclusões, formatação), permitindo que outros revisores vejam quem alterou o quê e aceitem ou rejeitem as mudanças.',
        'Criar um índice remissivo do documento.',
        'Formatar o texto em caixa alta ou baixa.',
        'Inserir comentários no documento.'
      ],
      correctAnswer: 1,
      points: 25
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

        {currentStep === 'main' && userData && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Olá, {userData.name}!
                </CardTitle>
                <CardDescription>
                  Carregue perguntas e escaneie QR Codes para começar
                </CardDescription>
              </CardHeader>
            </Card>

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
