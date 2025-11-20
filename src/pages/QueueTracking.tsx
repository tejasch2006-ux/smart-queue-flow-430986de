import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, QrCode, MapPin, Clock, Users, Sparkles, Phone } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TokenQRCode } from "@/components/TokenQRCode";

const QueueTracking = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queueData = location.state || {
    token: "A-142",
    position: 12,
    estimatedTime: 25,
    provider: "City Medical Center",
  };

  const [showQR, setShowQR] = useState(false);
  const [position, setPosition] = useState(queueData.position);
  const [estimatedTime, setEstimatedTime] = useState(queueData.estimatedTime);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => Math.max(1, prev - 1));
      setEstimatedTime((prev) => Math.max(0, prev - 2));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const progress = ((queueData.position - position) / queueData.position) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/user/dashboard")}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold">Live Queue Tracking</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6 animate-fade-in">
          {/* Token Card */}
          <Card className="rounded-3xl shadow-soft border-2 border-primary/20 overflow-hidden">
            <div className="gradient-hero p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-white/80 text-sm mb-2">Your Token Number</p>
                  <h2 className="text-6xl font-bold tracking-tight">{queueData.token}</h2>
                </div>
                <Button
                  onClick={() => setShowQR(true)}
                  className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl"
                >
                  <QrCode className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{queueData.provider}</span>
              </div>
            </div>
          </Card>

          {/* Status Card */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <Badge className="text-lg px-4 py-2 bg-primary/10 text-primary border-primary/30">
                  {position === 1 ? "Next in Line!" : "Waiting"}
                </Badge>
                {position === 1 && (
                  <span className="text-2xl animate-pulse">🎉</span>
                )}
              </div>

              <div className="space-y-8">
                {/* Position */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-5 h-5" />
                      <span className="text-sm font-medium">Queue Position</span>
                    </div>
                    <span className="text-3xl font-bold text-primary">#{position}</span>
                  </div>
                  <Progress value={progress} className="h-3 rounded-full" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {queueData.position - position} people have been served
                  </p>
                </div>

                {/* Estimated Time */}
                <div className="p-6 rounded-2xl bg-accent/5 border-2 border-accent/20">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-6 h-6 text-accent" />
                    <span className="text-sm font-medium text-muted-foreground">
                      Estimated Wait Time
                    </span>
                  </div>
                  <p className="text-4xl font-bold text-accent">
                    {estimatedTime} <span className="text-lg">mins</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="rounded-2xl h-auto py-6 flex flex-col gap-2"
              onClick={() => navigate("/user/location", { state: queueData })}
            >
              <MapPin className="w-6 h-6" />
              <span className="text-sm">View Location</span>
            </Button>
            <Button
              variant="outline"
              className="rounded-2xl h-auto py-6 flex flex-col gap-2"
              onClick={() => window.open(`tel:${queueData.provider}`)}
            >
              <Phone className="w-6 h-6" />
              <span className="text-sm">Call Provider</span>
            </Button>
          </div>

          {/* Info */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50 bg-warning/5">
            <CardContent className="p-6">
              <p className="text-sm text-center text-muted-foreground">
                💡 You'll receive a notification when it's almost your turn.
                Stay nearby or check back here.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* QR Code Dialog */}
      <Dialog open={showQR} onOpenChange={setShowQR}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center gap-4 p-6">
            <h3 className="text-xl font-bold">Your Queue Token</h3>
            <TokenQRCode token={queueData.token} />
            <p className="text-sm text-center text-muted-foreground">
              Show this QR code to the provider when called
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QueueTracking;
