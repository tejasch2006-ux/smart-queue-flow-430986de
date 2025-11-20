import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Clock, Star, Sparkles } from "lucide-react";

const History = () => {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      service: "General Checkup",
      provider: "City Medical Center",
      date: "Nov 10, 2024",
      time: "3:00 PM",
      status: "completed",
      rating: 5,
    },
    {
      id: 2,
      service: "Dental Cleaning",
      provider: "Smile Clinic",
      date: "Nov 5, 2024",
      time: "10:30 AM",
      status: "completed",
      rating: 4,
    },
    {
      id: 3,
      service: "Hair Cut",
      provider: "Style Studio",
      date: "Oct 28, 2024",
      time: "2:00 PM",
      status: "completed",
      rating: 5,
    },
  ];

  const queueVisits = [
    {
      id: 1,
      service: "General Service",
      provider: "Auto Service Pro",
      date: "Nov 8, 2024",
      token: "B-23",
      waitTime: "15 mins",
      status: "completed",
    },
    {
      id: 2,
      service: "Document Submission",
      provider: "Government Office",
      date: "Nov 3, 2024",
      token: "C-45",
      waitTime: "32 mins",
      status: "completed",
    },
    {
      id: 3,
      service: "Banking",
      provider: "City Bank",
      date: "Oct 25, 2024",
      token: "A-12",
      waitTime: "8 mins",
      status: "completed",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-accent text-accent"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

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
              <h1 className="text-xl font-bold">History</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="appointments" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-2xl p-1 mb-8">
            <TabsTrigger
              value="appointments"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Appointments
            </TabsTrigger>
            <TabsTrigger
              value="queue"
              className="rounded-xl data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Queue Visits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-4 animate-fade-in">
            {appointments.map((appointment, index) => (
              <Card
                key={appointment.id}
                className="rounded-2xl shadow-soft border-2 border-border/50 hover:shadow-hover hover:scale-[1.02] transition-smooth cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-1">
                        {appointment.service}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4" />
                        {appointment.provider}
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {appointment.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {appointment.time}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Your rating:</span>
                      {renderStars(appointment.rating)}
                    </div>
                    <Button variant="outline" size="sm" className="rounded-xl">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="queue" className="space-y-4 animate-fade-in">
            {queueVisits.map((visit, index) => (
              <Card
                key={visit.id}
                className="rounded-2xl shadow-soft border-2 border-border/50 hover:shadow-hover hover:scale-[1.02] transition-smooth cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">Token: {visit.token}</h3>
                        <Badge className="bg-primary/10 text-primary">
                          {visit.service}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {visit.provider}
                      </div>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Completed
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {visit.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Wait: {visit.waitTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default History;
