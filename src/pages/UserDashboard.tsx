import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Calendar, Clock, QrCode, Bell, User, LogOut, Plus, MapPin } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TokenQRCode } from "@/components/TokenQRCode";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentQueue] = useState({ position: 12, estimatedTime: 25, token: "A-142" });
  const [showQRDialog, setShowQRDialog] = useState(false);

  const upcomingAppointments = [
    { id: 1, service: "General Checkup", provider: "City Medical Center", date: "Today, 3:00 PM", status: "confirmed" },
    { id: 2, service: "Hair Cut & Style", provider: "Premium Salon", date: "Tomorrow, 11:00 AM", status: "confirmed" },
  ];

  const pastVisits = [
    { id: 1, service: "Dental Cleaning", provider: "Smile Clinic", date: "Nov 10, 2024" },
    { id: 2, service: "Oil Change", provider: "Auto Service Pro", date: "Nov 5, 2024" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3" onClick={() => navigate("/")} role="button">
              <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">SmartQueue</h1>
                <p className="text-xs text-muted-foreground">User Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="cursor-pointer">
                <AvatarFallback className="gradient-hero text-white font-semibold">
                  JD
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
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Current Queue Status */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Queue Card */}
            <Card className="rounded-3xl shadow-soft border-2 border-primary/20 overflow-hidden animate-fade-in">
              <div className="gradient-hero p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Your Current Token</p>
                    <h2 className="text-5xl font-bold">{currentQueue.token}</h2>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <QrCode className="w-10 h-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div>
                    <p className="text-white/80 text-sm mb-1">Queue Position</p>
                    <p className="text-2xl font-bold">#{currentQueue.position}</p>
                  </div>
                  <div>
                    <p className="text-white/80 text-sm mb-1">Est. Wait Time</p>
                    <p className="text-2xl font-bold">{currentQueue.estimatedTime} min</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex gap-3">
                  <Button className="flex-1 rounded-xl" variant="outline">
                    <MapPin className="w-4 h-4 mr-2" />
                    View Location
                  </Button>
                  <Button 
                    className="flex-1 rounded-xl gradient-hero text-white"
                    onClick={() => setShowQRDialog(true)}
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    Show QR Code
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  You'll receive a notification when it's almost your turn
                </p>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="rounded-3xl shadow-soft animate-slide-up">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <CardDescription>Your scheduled visits</CardDescription>
                  </div>
                  <Button
                    onClick={() => navigate("/booking")}
                    className="rounded-xl gradient-hero text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Book New
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingAppointments.map((apt, i) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl border border-border hover:border-primary/50 transition-smooth cursor-pointer"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold mb-1">{apt.service}</h4>
                        <p className="text-sm text-muted-foreground">{apt.provider}</p>
                      </div>
                      <Badge variant="outline" className="rounded-full bg-success/10 text-success border-success/20">
                        Confirmed
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {apt.date}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Past Visits & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="rounded-3xl shadow-soft animate-scale-in">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/booking")}
                  className="w-full rounded-xl gradient-hero text-white justify-start"
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Book Appointment
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl justify-start"
                >
                  <Clock className="w-5 h-5 mr-3" />
                  Join Queue
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-xl justify-start"
                >
                  <User className="w-5 h-5 mr-3" />
                  My Profile
                </Button>
              </CardContent>
            </Card>

            {/* Past Visits */}
            <Card className="rounded-3xl shadow-soft animate-slide-up">
              <CardHeader>
                <CardTitle>Recent History</CardTitle>
                <CardDescription>Your past visits</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastVisits.map((visit) => (
                  <div
                    key={visit.id}
                    className="p-3 rounded-xl border border-border hover:bg-muted/50 transition-smooth cursor-pointer"
                  >
                    <h4 className="font-medium text-sm mb-1">{visit.service}</h4>
                    <p className="text-xs text-muted-foreground mb-1">{visit.provider}</p>
                    <p className="text-xs text-muted-foreground">{visit.date}</p>
                  </div>
                ))}
                <Button variant="ghost" className="w-full rounded-xl text-primary">
                  View All History
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* QR Code Dialog */}
      <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
        <DialogContent className="sm:max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Your Queue Token</DialogTitle>
            <DialogDescription>
              Show this QR code at the counter for quick check-in
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <TokenQRCode 
              token={currentQueue.token}
              appointmentId="apt-123"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserDashboard;
