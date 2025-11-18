import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Store, Clock, Calendar, Sparkles } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-primary/5 overflow-hidden">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SmartQueue
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/auth")}
            className="rounded-full border-2 hover:border-primary hover:text-primary transition-smooth"
          >
            Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Skip The Wait,
            <br />
            Book Your Spot
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Smart appointment booking and live queue management for modern services
          </p>
          <div className="flex flex-wrap gap-4 justify-center items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Real-time Updates</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <span>Easy Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Smart Notifications</span>
            </div>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 animate-scale-in">
          {/* User Card */}
          <div 
            onClick={() => navigate("/user/dashboard")}
            className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-soft hover:shadow-hover transition-smooth cursor-pointer border-2 border-transparent hover:border-primary"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-smooth group-hover:scale-150" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-smooth group-hover:scale-110">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-card-foreground">
                I'm a User
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Book appointments, track your queue position, and get real-time notifications
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Virtual queue tokens</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Live waiting time</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>Instant notifications</span>
                </li>
              </ul>
              <Button className="w-full rounded-xl gradient-hero text-white shadow-soft hover:shadow-hover transition-smooth group-hover:scale-105">
                Get Started
              </Button>
            </div>
          </div>

          {/* Provider Card */}
          <div 
            onClick={() => navigate("/provider/dashboard")}
            className="group relative overflow-hidden rounded-3xl bg-card p-8 shadow-soft hover:shadow-hover transition-smooth cursor-pointer border-2 border-transparent hover:border-secondary"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16 transition-smooth group-hover:scale-150" />
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl gradient-warm flex items-center justify-center mb-6 shadow-soft group-hover:shadow-glow transition-smooth group-hover:scale-110">
                <Store className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-3 text-card-foreground">
                I'm a Provider
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Manage queues, track analytics, and serve customers efficiently
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Real-time queue control</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Analytics dashboard</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>Multi-branch support</span>
                </li>
              </ul>
              <Button className="w-full rounded-xl gradient-warm text-white shadow-soft hover:shadow-hover transition-smooth group-hover:scale-105">
                Manage Queue
              </Button>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="max-w-6xl mx-auto mt-20 grid md:grid-cols-3 gap-6">
          {[
            { icon: Clock, title: "Save Time", desc: "No more waiting in physical queues" },
            { icon: Calendar, title: "Easy Booking", desc: "Schedule appointments in seconds" },
            { icon: Sparkles, title: "Smart Updates", desc: "Get notified when it's your turn" }
          ].map((feature, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-smooth animate-fade-in"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <feature.icon className="w-8 h-8 text-primary mb-4" />
              <h4 className="font-semibold mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 mt-20 border-t border-border/50">
        <div className="text-center text-sm text-muted-foreground">
          <p>© 2024 SmartQueue. Making queues smarter, one appointment at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
