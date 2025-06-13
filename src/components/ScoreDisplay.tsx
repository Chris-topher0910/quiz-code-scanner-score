
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QuizResult } from "@/pages/Index";
import { Trophy, CheckCircle, XCircle, Star } from "lucide-react";

interface ScoreDisplayProps {
  results: QuizResult[];
  totalScore: number;
  userName: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ 
  results, 
  totalScore, 
  userName 
}) => {
  const correctAnswers = results.filter(r => r.isCorrect).length;
  const totalQuestions = results.length;

  const getScoreLevel = (score: number) => {
    if (score >= 25) return { level: 'Excelente', color: 'bg-green-500', emoji: '🏆' };
    if (score >= 15) return { level: 'Bom', color: 'bg-blue-500', emoji: '👍' };
    if (score >= 10) return { level: 'Regular', color: 'bg-yellow-500', emoji: '👌' };
    return { level: 'Precisa Melhorar', color: 'bg-red-500', emoji: '💪' };
  };

  const scoreInfo = getScoreLevel(totalScore);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            Resultado Final
          </CardTitle>
          <CardDescription>
            Parabéns, {userName}!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl font-bold text-indigo-600">
            {totalScore}
          </div>
          <div className="text-lg text-gray-600">
            pontos totais
          </div>
          
          <Badge className={`${scoreInfo.color} text-white px-4 py-2 text-base`}>
            {scoreInfo.emoji} {scoreInfo.level}
          </Badge>
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
              <div className="text-sm text-gray-500">Corretas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
              <div className="text-sm text-gray-500">Erradas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalQuestions}</div>
              <div className="text-sm text-gray-500">Total</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Detalhes das Respostas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {results.map((result, index) => (
            <div 
              key={index}
              className={`p-3 rounded-lg border-l-4 ${
                result.isCorrect 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-sm mb-1">
                    {result.question}
                  </div>
                  <div className="text-xs text-gray-600">
                    Pergunta #{result.questionId}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {result.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">{result.points}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
