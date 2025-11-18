import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

const PublicDisplay = () => {
  const [currentToken, setCurrentToken] = useState("A-142");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const nextTokens = ["A-143", "A-144", "A-145", "A-146", "A-147"];
  const avgWaitTime = "18 minutes";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 p-8">
      {/* Header */}
      <header className="text-center mb-12 animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 rounded-3xl gradient-hero flex items-center justify-center shadow-soft">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SmartQueue
          </h1>
        </div>
        <p className="text-xl text-muted-foreground">City Medical Center • Downtown</p>
        <div className="mt-4 text-2xl font-semibold text-foreground">
          {currentTime.toLocaleTimeString()}
        </div>
      </header>

      {/* Current Token - Large Display */}
      <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
        <div className="rounded-[3rem] gradient-hero p-16 text-white text-center shadow-glow relative overflow-hidden">
          <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />
          <div className="relative z-10">
            <p className="text-3xl font-medium mb-6 text-white/90">Now Serving</p>
            <div className="text-[10rem] font-bold leading-none mb-6 animate-pulse-glow">
              {currentToken}
            </div>
            <p className="text-2xl text-white/90">Please proceed to Counter 1</p>
          </div>
        </div>
      </div>

      {/* Next in Queue */}
      <div className="max-w-5xl mx-auto mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center">Next in Queue</h2>
        <div className="grid grid-cols-5 gap-4">
          {nextTokens.map((token, i) => (
            <div
              key={token}
              className="rounded-3xl bg-card p-8 text-center shadow-soft border-2 border-border hover:border-primary/50 transition-smooth animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-5xl font-bold text-primary mb-2">{token}</div>
              <Badge variant="outline" className="rounded-full">
                Waiting
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Info Bar */}
      <div className="max-w-5xl mx-auto">
        <div className="rounded-3xl bg-card p-8 shadow-soft border-2 border-border">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">{avgWaitTime}</div>
              <p className="text-muted-foreground">Average Wait Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-success mb-2">23</div>
              <p className="text-muted-foreground">People in Queue</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">47</div>
              <p className="text-muted-foreground">Served Today</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="max-w-5xl mx-auto mt-12">
        <div className="rounded-3xl bg-accent/10 border-2 border-accent/30 p-6 text-center">
          <p className="text-lg font-semibold text-accent-foreground">
            📢 Please have your booking confirmation ready when called
          </p>
        </div>
      </div>
    </div>
  );
};

export default PublicDisplay;
