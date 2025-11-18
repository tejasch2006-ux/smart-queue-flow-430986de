import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Users, Clock, TrendingUp, Bell, Settings, LogOut, Play, Pause, SkipForward, ScanLine } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { QRScanner } from "@/components/QRScanner";
import { toast } from "sonner";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const [showScanner, setShowScanner] = useState(false);

  const stats = [
    { label: "Tokens Served", value: "47", change: "+12%", icon: Users, color: "text-primary" },
    { label: "In Queue", value: "23", change: "-5%", icon: Clock, color: "text-warning" },
    { label: "Avg. Wait Time", value: "18m", change: "-8%", icon: TrendingUp, color: "text-success" },
  ];

  const queueList = [
    { token: "A-142", name: "John Doe", service: "General Checkup", status: "calling", waitTime: "2m" },
    { token: "A-143", name: "Jane Smith", service: "Consultation", status: "ready", waitTime: "5m" },
    { token: "A-144", name: "Mike Johnson", service: "Follow-up", status: "waiting", waitTime: "12m" },
    { token: "A-145", name: "Sarah Williams", service: "General Checkup", status: "waiting", waitTime: "18m" },
    { token: "A-146", name: "Robert Brown", service: "Consultation", status: "waiting", waitTime: "25m" },
  ];

  const handleScanSuccess = (data: {
    token: string;
    appointmentId?: string | null;
    timestamp: number;
  }) => {
    const queueItem = queueList.find(item => item.token === data.token);
    
    if (queueItem) {
      toast.success(`✅ Token ${data.token} verified - ${queueItem.name}`, {
        description: `Service: ${queueItem.service}`,
      });
      setShowScanner(false);
    } else {
      toast.error(`Token ${data.token} not found in queue`, {
        description: "Please verify the token number",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-secondary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3" onClick={() => navigate("/")} role="button">
              <div className="w-10 h-10 rounded-2xl gradient-warm flex items-center justify-center shadow-soft">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SmartQueue</h1>
                <p className="text-xs text-muted-foreground">Provider Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="gradient-warm text-white font-semibold">
                  MC
                </AvatarFallback>
              </Avatar>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="rounded-full"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <Card
              key={i}
              className="rounded-3xl shadow-soft hover:shadow-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  <Badge variant="outline" className="rounded-full">
                    {stat.change}
                  </Badge>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Queue Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="rounded-3xl shadow-soft animate-slide-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Active Queue</CardTitle>
                    <CardDescription>Manage your current queue</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="rounded-xl gradient-hero text-white"
                      onClick={() => setShowScanner(true)}
                    >
                      <ScanLine className="w-4 h-4 mr-2" />
                      Scan QR
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-xl">
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-xl gradient-warm text-white"
                      onClick={() => navigate("/display")}
                    >
                      Display Screen
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {queueList.map((item, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-2xl border transition-smooth ${
                      item.status === "calling"
                        ? "border-primary bg-primary/5 shadow-soft"
                        : item.status === "ready"
                        ? "border-success bg-success/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-lg">{item.token}</span>
                            {item.status === "calling" && (
                              <Badge className="rounded-full bg-primary text-white animate-pulse-glow">
                                Calling
                              </Badge>
                            )}
                            {item.status === "ready" && (
                              <Badge className="rounded-full bg-success text-white">
                                Ready
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.service}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-right mr-3">
                          <p className="text-sm text-muted-foreground">Wait time</p>
                          <p className="font-semibold">{item.waitTime}</p>
                        </div>
                        {item.status === "calling" ? (
                          <>
                            <Button size="sm" variant="outline" className="rounded-xl">
                              <SkipForward className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="rounded-xl bg-success text-white">
                              Complete
                            </Button>
                          </>
                        ) : (
                          <Button
                            size="sm"
                            className="rounded-xl gradient-hero text-white"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Call Next
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <Card className="rounded-3xl shadow-soft animate-scale-in">
              <CardHeader>
                <CardTitle>Today's Summary</CardTitle>
                <CardDescription>November 18, 2024</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Total Appointments</p>
                  <p className="text-2xl font-bold text-primary">47</p>
                </div>
                <div className="p-4 rounded-2xl bg-success/5 border border-success/20">
                  <p className="text-sm text-muted-foreground mb-1">Completed</p>
                  <p className="text-2xl font-bold text-success">42</p>
                </div>
                <div className="p-4 rounded-2xl bg-warning/5 border border-warning/20">
                  <p className="text-sm text-muted-foreground mb-1">No Shows</p>
                  <p className="text-2xl font-bold text-warning">2</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="rounded-3xl shadow-soft animate-slide-up">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full rounded-xl gradient-warm text-white justify-start">
                  <Users className="w-5 h-5 mr-3" />
                  Add Walk-in
                </Button>
                <Button variant="outline" className="w-full rounded-xl justify-start">
                  <Bell className="w-5 h-5 mr-3" />
                  Send Announcement
                </Button>
                <Button variant="outline" className="w-full rounded-xl justify-start">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* QR Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-lg rounded-3xl">
          <QRScanner 
            onScanSuccess={handleScanSuccess}
            onClose={() => setShowScanner(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderDashboard;
