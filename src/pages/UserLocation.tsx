import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, MapPin, Navigation, Phone, Clock, Sparkles, ExternalLink } from "lucide-react";

const UserLocation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queueData = location.state || {
    provider: "City Medical Center",
    token: "A-142",
  };

  // Mock location data
  const providerLocation = {
    name: queueData.provider,
    address: "123 Main Street, City Center, Mumbai 400001",
    phone: "+91 98765 43210",
    distance: "2.5 km",
    travelTime: "8 mins",
    lat: 19.0760,
    lng: 72.8777,
  };

  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${providerLocation.lat},${providerLocation.lng}`;
    window.open(url, "_blank");
  };

  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${providerLocation.lat},${providerLocation.lng}`;
    window.open(url, "_blank");
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
              onClick={() => navigate(-1)}
              className="rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl gradient-hero flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold">Location</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6 animate-fade-in">
          {/* Map Placeholder */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50 overflow-hidden">
            <div className="relative h-[300px] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20">
              {/* Map placeholder - In production, replace with actual Google Maps */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-primary mx-auto mb-4 animate-bounce" />
                  <p className="text-lg font-semibold text-card-foreground">
                    {providerLocation.name}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    📍 Map integration ready
                  </p>
                </div>
              </div>
              
              {/* Distance Badge */}
              <div className="absolute top-4 right-4 bg-card/95 backdrop-blur-sm rounded-2xl p-3 shadow-soft">
                <p className="text-sm font-medium text-muted-foreground mb-1">Distance</p>
                <p className="text-2xl font-bold text-primary">{providerLocation.distance}</p>
              </div>
            </div>
          </Card>

          {/* Provider Details */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{providerLocation.name}</h2>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{providerLocation.address}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Navigation className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Travel Time</span>
                  </div>
                  <p className="text-xl font-bold text-primary">{providerLocation.travelTime}</p>
                </div>
                <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-secondary" />
                    <span className="text-xs text-muted-foreground">Your Token</span>
                  </div>
                  <p className="text-xl font-bold text-secondary">{queueData.token}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={getDirections}
              className="rounded-2xl h-auto py-6 flex flex-col gap-2 gradient-hero text-white shadow-soft hover:shadow-hover"
            >
              <Navigation className="w-6 h-6" />
              <span className="text-sm">Get Directions</span>
            </Button>
            <Button
              onClick={openInMaps}
              variant="outline"
              className="rounded-2xl h-auto py-6 flex flex-col gap-2 border-2"
            >
              <ExternalLink className="w-6 h-6" />
              <span className="text-sm">Open in Maps</span>
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full rounded-2xl h-14 border-2"
            onClick={() => window.open(`tel:${providerLocation.phone}`)}
          >
            <Phone className="w-5 h-5 mr-2" />
            Call {providerLocation.phone}
          </Button>

          {/* Info Card */}
          <Card className="rounded-3xl shadow-soft border-2 border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <p className="text-sm text-center text-muted-foreground">
                💡 <strong>Pro Tip:</strong> Enable location services for accurate real-time
                navigation and distance updates
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserLocation;
