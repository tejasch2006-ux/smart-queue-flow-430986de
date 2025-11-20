import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bell, CheckCheck, Clock, AlertCircle, Sparkles } from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();

  const notifications = [
    {
      id: 1,
      type: "queue",
      title: "Your Turn is Coming Up!",
      message: "You're next in line at City Medical Center. Please be ready.",
      time: "2 minutes ago",
      unread: true,
      icon: Bell,
      color: "primary",
    },
    {
      id: 2,
      type: "appointment",
      title: "Appointment Confirmed",
      message: "Your appointment at Premium Salon is confirmed for tomorrow at 11:00 AM",
      time: "1 hour ago",
      unread: true,
      icon: CheckCheck,
      color: "success",
    },
    {
      id: 3,
      type: "reminder",
      title: "Appointment Reminder",
      message: "You have an appointment today at 3:00 PM at City Medical Center",
      time: "3 hours ago",
      unread: false,
      icon: Clock,
      color: "warning",
    },
    {
      id: 4,
      type: "alert",
      title: "Queue Status Update",
      message: "Wait time at City Medical Center has increased to 45 minutes",
      time: "5 hours ago",
      unread: false,
      icon: AlertCircle,
      color: "destructive",
    },
    {
      id: 5,
      type: "completed",
      title: "Visit Complete",
      message: "Thank you for visiting Smile Clinic. Please rate your experience.",
      time: "2 days ago",
      unread: false,
      icon: CheckCheck,
      color: "success",
    },
  ];

  const getColorClass = (color: string) => {
    const colors: Record<string, string> = {
      primary: "bg-primary/10 text-primary",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      destructive: "bg-destructive/10 text-destructive",
    };
    return colors[color] || colors.primary;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
                <h1 className="text-xl font-bold">Notifications</h1>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary/80"
            >
              Mark all read
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-4 animate-fade-in">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <Card
                key={notification.id}
                className={`rounded-2xl shadow-soft border-2 transition-smooth hover:shadow-hover hover:scale-[1.02] cursor-pointer ${
                  notification.unread
                    ? "border-primary/30 bg-primary/5"
                    : "border-border/50"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${getColorClass(
                        notification.color
                      )}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-card-foreground">
                          {notification.title}
                        </h3>
                        {notification.unread && (
                          <Badge className="bg-primary text-primary-foreground px-2 py-0.5 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {notification.time}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State (if no notifications) */}
        {notifications.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No Notifications</h2>
            <p className="text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notifications;
