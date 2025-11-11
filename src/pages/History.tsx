import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, CheckCircle2, XCircle, User, Calendar } from "lucide-react";
import { QuizResult, UserData } from "./Index";

interface CachedData {
  user: UserData;
  results: QuizResult[];
  totalScore: number;
  timestamp: string;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<CachedData[]>([]);
  const [selectedSession, setSelectedSession] = useState<CachedData | null>(null);

  useEffect(() => {
    // Load history from localStorage
    const loadHistory = () => {
      const historyData: CachedData[] = [];
      
      // Iterate through localStorage to find all user scores
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('userScore_')) {
          try {
            const data = JSON.parse(localStorage.getItem(key) || '{}');
            historyData.push(data);
          } catch (error) {
            console.error('Error parsing history data:', error);
          }
        }
      }
      
      // Sort by timestamp (most recent first)
      historyData.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      
      setHistory(historyData);
    };

    loadHistory();
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScorePercentage = (score: number, totalQuestions: number) => {
    const maxScore = totalQuestions * 25; // Assuming max 25 points per question
    return Math.round((score / maxScore) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="outline"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">Histórico de Respostas</h1>
          </div>
          <p className="text-muted-foreground">
            Visualize todas as suas sessões e respostas anteriores
          </p>
        </div>

        {history.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Nenhum histórico encontrado</h3>
              <p className="text-muted-foreground mb-6">
                Comece a responder perguntas para ver seu histórico aqui
              </p>
              <Button onClick={() => navigate('/')}>
                Ir para o Quiz
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Sessions List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Sessões ({history.length})
              </h2>
              
              {history.map((session, index) => (
                <Card
                  key={index}
                  className={`cursor-pointer transition-all hover:shadow-card ${
                    selectedSession === session ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedSession(session)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-primary" />
                        <CardTitle className="text-base">{session.user.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">
                        {session.totalScore} pts
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <Calendar className="h-3 w-3" />
                      {formatDate(session.timestamp)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {session.results.length} pergunta{session.results.length !== 1 ? 's' : ''}
                      </span>
                      <span className="font-semibold text-primary">
                        {session.results.filter(r => r.isCorrect).length} correta{session.results.filter(r => r.isCorrect).length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="mt-2 bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-primary h-full transition-all"
                        style={{
                          width: `${getScorePercentage(session.totalScore, session.results.length)}%`
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Session Details */}
            <div className="space-y-4">
              {selectedSession ? (
                <>
                  <h2 className="text-xl font-semibold text-foreground mb-4">
                    Detalhes da Sessão
                  </h2>
                  
                  <Card className="bg-gradient-primary text-primary-foreground">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Trophy className="h-5 w-5" />
                        Pontuação Total
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl font-bold">{selectedSession.totalScore}</div>
                      <div className="text-sm opacity-90 mt-1">
                        {selectedSession.results.filter(r => r.isCorrect).length} de {selectedSession.results.length} corretas
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-3">
                    {selectedSession.results.map((result, index) => (
                      <Card key={index}>
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <CardTitle className="text-sm font-medium leading-relaxed pr-2">
                              {result.question}
                            </CardTitle>
                            {result.isCorrect ? (
                              <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0" />
                            ) : (
                              <XCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Pontos:</span>
                            <Badge variant={result.isCorrect ? "default" : "destructive"}>
                              {result.points} pts
                            </Badge>
                          </div>
                          {!result.isCorrect && (
                            <div className="text-xs text-muted-foreground pt-2 border-t">
                              Resposta correta: Opção {result.correctAnswer + 1}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Card className="h-full flex items-center justify-center">
                  <CardContent className="text-center py-12">
                    <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">
                      Selecione uma sessão para ver os detalhes
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
