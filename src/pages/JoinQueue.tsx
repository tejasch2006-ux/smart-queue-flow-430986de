import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, MapPin, Clock, Users, TrendingUp, Sparkles } from "lucide-react";
import { toast } from "sonner";

const JoinQueue = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const nearbyProviders = [
    {
      id: 1,
      name: "City Medical Center",
      type: "Healthcare",
      distance: "0.5 km",
      currentQueue: 12,
      avgWaitTime: 25,
      status: "open",
    },
    {
      id: 2,
      name: "Auto Service Pro",
      type: "Auto Service",
      distance: "1.2 km",
      currentQueue: 8,
      avgWaitTime: 15,
      status: "open",
    },
    {
      id: 3,
      name: "Government Office",
      type: "Government",
      distance: "2.1 km",
      currentQueue: 25,
      avgWaitTime: 45,
      status: "busy",
    },
    {
      id: 4,
      name: "Premium Salon",
      type: "Beauty & Wellness",
      distance: "0.8 km",
      currentQueue: 5,
      avgWaitTime: 20,
      status: "open",
    },
  ];

  const handleJoinQueue = (provider: typeof nearbyProviders[0]) => {
    const tokenNumber = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}-${Math.floor(Math.random() * 999)}`;
    
    toast.success(`Successfully joined queue at ${provider.name}!`);
    
    navigate("/user/queue-tracking", {
      state: {
        token: tokenNumber,
        position: provider.currentQueue + 1,
        estimatedTime: provider.avgWaitTime,
        provider: provider.name,
      },
    });
  };

  const filteredProviders = nearbyProviders.filter((provider) =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === "open" 
      ? "bg-success/10 text-success border-success/30"
      : "bg-warning/10 text-warning border-warning/30";
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
              <h1 className="text-xl font-bold">Join Queue</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Search */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50 animate-fade-in">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for services or providers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 rounded-2xl h-12 border-2 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Providers List */}
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Nearby Providers
            </h2>
            <div className="space-y-4">
              {filteredProviders.map((provider, index) => (
                <Card
                  key={provider.id}
                  className="rounded-3xl shadow-soft border-2 border-border/50 hover:shadow-hover hover:scale-[1.02] transition-smooth cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold">{provider.name}</h3>
                          <Badge className={getStatusColor(provider.status)}>
                            {provider.status === "open" ? "Open" : "Busy"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {provider.distance}
                          </span>
                          <Badge variant="outline" className="rounded-lg">
                            {provider.type}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 rounded-2xl bg-primary/5 border border-primary/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-xs text-muted-foreground">In Queue</span>
                        </div>
                        <p className="text-2xl font-bold text-primary">{provider.currentQueue}</p>
                      </div>
                      <div className="p-3 rounded-2xl bg-accent/5 border border-accent/20">
                        <div className="flex items-center gap-2 mb-1">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-xs text-muted-foreground">Avg Wait</span>
                        </div>
                        <p className="text-2xl font-bold text-accent">{provider.avgWaitTime}m</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => handleJoinQueue(provider)}
                      className="w-full rounded-xl gradient-hero text-white shadow-soft hover:shadow-hover"
                    >
                      Join Queue
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredProviders.length === 0 && (
            <Card className="rounded-3xl shadow-soft border-2 border-border/50">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 rounded-3xl gradient-hero flex items-center justify-center mx-auto mb-6 shadow-soft">
                  <Search className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">No providers found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or check back later
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default JoinQueue;
