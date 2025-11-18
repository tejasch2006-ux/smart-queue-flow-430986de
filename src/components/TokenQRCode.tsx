import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

interface TokenQRCodeProps {
  token: string;
  appointmentId?: string;
  className?: string;
}

export const TokenQRCode = ({ token, appointmentId, className = "" }: TokenQRCodeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!canvasRef.current) return;

    const qrData = JSON.stringify({
      token,
      appointmentId: appointmentId || null,
      timestamp: Date.now(),
      type: "smartqueue-token"
    });

    QRCode.toCanvas(canvasRef.current, qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: "#1a1a1a",
        light: "#ffffff"
      }
    }).catch((err) => {
      console.error("QR generation error:", err);
      setError("Failed to generate QR code");
    });
  }, [token, appointmentId]);

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 rounded-2xl bg-destructive/10 ${className}`}>
        <p className="text-destructive text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <canvas ref={canvasRef} className="rounded-2xl shadow-soft" />
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Scan this QR code at the counter</p>
        <p className="text-lg font-bold mt-1">{token}</p>
      </div>
    </div>
  );
};
