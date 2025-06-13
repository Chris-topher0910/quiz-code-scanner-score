
import React, { useState, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Camera, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QrCodeScannerProps {
  onScan: (data: string) => void;
}

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScan }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualInput, setManualInput] = useState('');
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      setIsScanning(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      toast({
        title: "Câmera ativada",
        description: "Aponte para o QR Code para escanear",
      });
    } catch (error) {
      console.error('Erro ao acessar câmera:', error);
      toast({
        title: "Erro na câmera",
        description: "Não foi possível acessar a câmera. Use a opção manual.",
        variant: "destructive"
      });
      setIsScanning(false);
      setScanMode('manual');
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      setManualInput('');
      toast({
        title: "QR Code processado",
        description: `ID: ${manualInput.trim()}`,
      });
    }
  };

  // Simulação de detecção de QR Code na câmera
  const simulateQrDetection = () => {
    const mockQrCodes = ['1', '2', '3'];
    const randomQr = mockQrCodes[Math.floor(Math.random() * mockQrCodes.length)];
    stopCamera();
    onScan(randomQr);
    toast({
      title: "QR Code detectado!",
      description: `ID da pergunta: ${randomQr}`,
    });
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Scanner de QR Code
          </CardTitle>
          <CardDescription>
            Escolha como escanear o QR Code
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              onClick={() => setScanMode('camera')}
              className="flex-1"
            >
              <Camera className="h-4 w-4 mr-2" />
              Câmera
            </Button>
            <Button
              variant={scanMode === 'manual' ? 'default' : 'outline'}
              onClick={() => setScanMode('manual')}
              className="flex-1"
            >
              <Type className="h-4 w-4 mr-2" />
              Manual
            </Button>
          </div>

          {scanMode === 'camera' && (
            <div className="space-y-4">
              {!isScanning ? (
                <Button onClick={startCamera} className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Ativar Câmera
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-square">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-2 border-white/50 rounded-lg">
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-white w-32 h-32 rounded-lg"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={simulateQrDetection} className="flex-1">
                      Simular Detecção
                    </Button>
                    <Button onClick={stopCamera} variant="outline">
                      Parar
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {scanMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-input">ID da Pergunta</Label>
                <Input
                  id="qr-input"
                  type="text"
                  placeholder="Digite o ID (1, 2 ou 3)"
                  value={manualInput}
                  onChange={(e) => setManualInput(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={!manualInput.trim()}>
                Processar QR Code
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
