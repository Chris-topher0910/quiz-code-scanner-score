
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Camera, Type, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrCodeScannerProps {
  onScan: (data: string) => void;
}

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScan }) => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [manualInput, setManualInput] = useState('');
  const [cameraPermission, setCameraPermission] = useState<'pending' | 'granted' | 'denied'>('pending');
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const { toast } = useToast();
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerInstanceRef = useRef<Html5QrcodeScanner | null>(null);

  // Função para verificar permissão da câmera
  const checkCameraPermission = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraPermission('denied');
        return false;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      return true;
    } catch (error) {
      setCameraPermission('denied');
      return false;
    }
  };

  // Função para solicitar permissão da câmera
  const requestCameraPermission = async () => {
    setIsRequestingPermission(true);
    try {
      const hasPermission = await checkCameraPermission();
      if (hasPermission) {
        toast({
          title: "Permissão concedida",
          description: "Câmera autorizada com sucesso!",
        });
      } else {
        toast({
          title: "Permissão negada",
          description: "Habilite o acesso à câmera nas configurações do navegador.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro de permissão",
        description: "Não foi possível acessar a câmera.",
        variant: "destructive",
      });
    } finally {
      setIsRequestingPermission(false);
    }
  };

  // Inicializar scanner quando modo câmera é ativado e permissão está concedida
  useEffect(() => {
    if (scanMode === "camera" && cameraPermission === 'granted' && scannerRef.current) {
      // Clear any existing scanner first
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear().catch(console.error);
      }

      const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, false);
      scannerInstanceRef.current = scanner;

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
          toast({
            title: "QR Code detectado!",
            description: `ID/Link: ${decodedText}`,
          });
          scanner.clear().catch(console.error);
          scannerInstanceRef.current = null;
        },
        (error) => {
          // Silently handle scan errors (normal when no QR code is visible)
        }
      );

      return () => {
        if (scannerInstanceRef.current) {
          scannerInstanceRef.current.clear().catch(console.error);
          scannerInstanceRef.current = null;
        }
      };
    }
  }, [scanMode, cameraPermission, onScan, toast]);

  // Verificar permissão inicial
  useEffect(() => {
    if (scanMode === 'camera' && cameraPermission === 'pending') {
      checkCameraPermission();
    }
  }, [scanMode, cameraPermission]);

  const handleCameraModeClick = () => {
    setScanMode('camera');
    if (cameraPermission === 'denied') {
      requestCameraPermission();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInput.trim()) {
      onScan(manualInput.trim());
      toast({
        title: "QR Code processado",
        description: `ID: ${manualInput.trim()}`,
      });
      setManualInput('');
    }
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
          {/* Botões para alternar entre modos */}
          <div className="flex gap-2">
            <Button
              variant={scanMode === 'camera' ? 'default' : 'outline'}
              onClick={handleCameraModeClick}
              className="flex-1"
              disabled={isRequestingPermission}
            >
              <Camera className="h-4 w-4 mr-2" />
              {isRequestingPermission ? 'Solicitando...' : 'Câmera'}
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

          {/* Status da permissão da câmera */}
          {scanMode === 'camera' && (
            <div className="space-y-4">
              {cameraPermission === 'pending' && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="h-4 w-4" />
                  Verificando permissão da câmera...
                </div>
              )}
              
              {cameraPermission === 'denied' && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    Permissão da câmera necessária
                  </div>
                  <Button 
                    onClick={requestCameraPermission} 
                    variant="outline" 
                    size="sm"
                    disabled={isRequestingPermission}
                    className="w-full"
                  >
                    {isRequestingPermission ? 'Solicitando...' : 'Solicitar Permissão da Câmera'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Clique em "Permitir" quando solicitado pelo navegador
                  </p>
                </div>
              )}
              
              {cameraPermission === 'granted' && (
                <div id="qr-reader" ref={scannerRef} className="w-full"></div>
              )}
            </div>
          )}

          {/* Modo manual */}
          {scanMode === 'manual' && (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="qr-input">ID da Pergunta</Label>
                <Input
                  id="qr-input"
                  type="text"
                  placeholder="Digite o ID (ex: 1, 2, 3)"
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
