import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, CameraOff, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

interface QRScannerProps {
  onScanSuccess: (data: {
    token: string;
    appointmentId?: string | null;
    timestamp: number;
  }) => void;
  onClose?: () => void;
}

export const QRScanner = ({ onScanSuccess, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState<string>("");
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const elementId = "qr-reader";

  const startScanning = async () => {
    try {
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(elementId);
      }

      await scannerRef.current.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          if (decodedText === lastScanned) return;
          
          setLastScanned(decodedText);
          
          try {
            const data = JSON.parse(decodedText);
            
            if (data.type === "smartqueue-token") {
              onScanSuccess({
                token: data.token,
                appointmentId: data.appointmentId,
                timestamp: data.timestamp
              });
              toast.success(`Token ${data.token} scanned successfully!`);
            } else {
              toast.error("Invalid QR code format");
            }
          } catch (err) {
            toast.error("Invalid QR code");
          }
        },
        (errorMessage) => {
          // Ignore scan errors (they're frequent during scanning)
        }
      );
      
      setIsScanning(true);
      toast.info("Scanner active - point camera at QR code");
    } catch (err) {
      console.error("Scanner start error:", err);
      toast.error("Failed to start camera. Please check permissions.");
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current && isScanning) {
      try {
        await scannerRef.current.stop();
        setIsScanning(false);
        toast.info("Scanner stopped");
      } catch (err) {
        console.error("Scanner stop error:", err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (scannerRef.current && isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, [isScanning]);

  return (
    <Card className="rounded-3xl shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="w-5 h-5" />
          QR Code Scanner
        </CardTitle>
        <CardDescription>Scan user tokens for quick check-in</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div 
          id={elementId} 
          className="rounded-2xl overflow-hidden bg-muted/50 min-h-[300px] flex items-center justify-center"
        >
          {!isScanning && (
            <div className="text-center p-8">
              <Camera className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Camera not active</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          {!isScanning ? (
            <Button 
              onClick={startScanning}
              className="flex-1 rounded-xl gradient-hero text-white"
            >
              <Camera className="w-4 h-4 mr-2" />
              Start Scanner
            </Button>
          ) : (
            <Button 
              onClick={stopScanning}
              variant="destructive"
              className="flex-1 rounded-xl"
            >
              <CameraOff className="w-4 h-4 mr-2" />
              Stop Scanner
            </Button>
          )}
          
          {onClose && (
            <Button 
              onClick={onClose}
              variant="outline"
              className="rounded-xl"
            >
              Close
            </Button>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-muted/50 space-y-2">
          <p className="text-sm font-medium">Scanner Tips:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
              Hold phone steady and ensure good lighting
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-success flex-shrink-0" />
              QR code should fill the scanning area
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="w-4 h-4 mt-0.5 text-destructive flex-shrink-0" />
              Allow camera permissions when prompted
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
