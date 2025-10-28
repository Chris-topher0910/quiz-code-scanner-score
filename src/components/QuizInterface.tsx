
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { QuizQuestion } from "@/pages/Index";
import { HelpCircle, Star } from "lucide-react";

interface QuizInterfaceProps {
  question: QuizQuestion;
  onAnswer: (answer: number) => void;
}

export const QuizInterface: React.FC<QuizInterfaceProps> = ({ question, onAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Reset selected answer when question changes
  useEffect(() => {
    setSelectedAnswer(null);
  }, [question.id]);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      onAnswer(selectedAnswer);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5" />
          Pergunta #{question.id}
        </CardTitle>
        <CardDescription className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          Vale {question.points} pontos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-lg font-medium">
          {question.question}
        </div>
        
        <RadioGroup
          value={selectedAnswer?.toString()}
          onValueChange={(value) => setSelectedAnswer(parseInt(value))}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`}
                className="flex-1 cursor-pointer py-2 px-2 rounded hover:bg-gray-50"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
        
        <Button 
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="w-full"
        >
          Confirmar Resposta
        </Button>
      </CardContent>
    </Card>
  );
};
