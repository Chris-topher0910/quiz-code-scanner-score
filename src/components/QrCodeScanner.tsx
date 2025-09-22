
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Camera, Type } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Html5QrcodeScanner } from "html5-qrcode";

interface QrCodeScannerProps {
  onScan: (data: string) => void;
}

export const QrCodeScanner: React.FC<QrCodeScannerProps> = ({ onScan }) => {
  const [scanMode, setScanMode] = useState<'camera' | 'manual'>('manual');
  const [manualInput, setManualInput] = useState('');
  const { toast } = useToast();
  const scannerRef = useRef<HTMLDivElement>(null);
  const scannerInstanceRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    if (scanMode === "camera" && scannerRef.current) {
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
  }, [scanMode, onScan, toast]);

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

          {/* Modo câmera */}
          {scanMode === 'camera' && (
            <div id="qr-reader" ref={scannerRef} className="w-full"></div>
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
