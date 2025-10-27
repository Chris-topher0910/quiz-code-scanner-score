import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, QrCode } from "lucide-react";
import QRCode from 'qrcode';
import { toast } from "sonner";
import { QuizQuestion } from "@/pages/Index";

interface QrCodeGeneratorProps {
  questions: QuizQuestion[];
}

export const QrCodeGenerator: React.FC<QrCodeGeneratorProps> = ({ questions }) => {
  const generateAndDownloadQR = async (question: QuizQuestion) => {
    try {
      const qrData = JSON.stringify({
        id: question.id,
        question: question.question,
        points: question.points
      });
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
        width: 512,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
      
      // Convert data URL to blob and download
      const link = document.createElement('a');
      link.href = qrCodeDataUrl;
      link.download = `qr-code-pergunta-${question.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success(`QR Code da pergunta #${question.id} baixado com sucesso!`);
    } catch (error) {
      console.error('Erro ao gerar QR code:', error);
      toast.error('Erro ao gerar QR code');
    }
  };

  const downloadAllQRCodes = async () => {
    toast.info(`Gerando ${questions.length} QR codes...`);
    for (const question of questions) {
      await generateAndDownloadQR(question);
      // Small delay between downloads to avoid browser blocking
      await new Promise(resolve => setTimeout(resolve, 300));
    }
    toast.success('Todos os QR codes foram gerados!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          Gerar QR Codes
        </CardTitle>
        <CardDescription>
          Gere e baixe QR codes para cada pergunta do quiz
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={downloadAllQRCodes}
          className="w-full"
          variant="default"
        >
          <Download className="mr-2 h-4 w-4" />
          Baixar Todos os QR Codes ({questions.length})
        </Button>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Baixar individualmente:</p>
          <div className="grid grid-cols-1 gap-2 max-h-96 overflow-y-auto">
            {questions.map((question) => (
              <Button
                key={question.id}
                onClick={() => generateAndDownloadQR(question)}
                variant="outline"
                className="justify-start"
              >
                <QrCode className="mr-2 h-4 w-4" />
                Pergunta #{question.id} - {question.points} pontos
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
