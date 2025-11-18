import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, ArrowLeft, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Booking = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedService, setSelectedService] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const services = [
    "General Checkup",
    "Dental Cleaning",
    "Hair Cut & Style",
    "Vehicle Service",
    "Consultation",
  ];

  const providers = [
    { name: "City Medical Center", location: "Downtown" },
    { name: "Premium Salon", location: "North District" },
    { name: "Auto Service Pro", location: "East Side" },
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM",
  ];

  const handleBooking = () => {
    if (!selectedService || !selectedProvider || !selectedTime || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields to book your appointment",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Appointment booked!",
      description: "Your appointment has been confirmed. You'll receive a notification soon.",
    });
    
    setTimeout(() => navigate("/user/dashboard"), 1500);
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
                <div className="w-10 h-10 rounded-2xl gradient-hero flex items-center justify-center shadow-soft">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Book Appointment</h1>
                  <p className="text-xs text-muted-foreground">Choose your preferred time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <Card className="rounded-3xl shadow-soft animate-fade-in">
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Fill in the information below</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Service Selection */}
                <div className="space-y-2">
                  <Label>Select Service</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Provider Selection */}
                <div className="space-y-2">
                  <Label>Select Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Choose a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.name} value={provider.name}>
                          <div className="flex items-center gap-2">
                            <span>{provider.name}</span>
                            <span className="text-xs text-muted-foreground">• {provider.location}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Slot Selection */}
                <div className="space-y-2">
                  <Label>Select Time</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        className={`rounded-xl ${
                          selectedTime === time
                            ? "gradient-hero text-white shadow-soft"
                            : ""
                        }`}
                        onClick={() => setSelectedTime(time)}
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedService && selectedProvider && selectedTime && date && (
              <Card className="rounded-3xl shadow-soft border-2 border-primary/20 animate-scale-in">
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Service</span>
                    <span className="font-semibold">{selectedService}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Provider</span>
                    <span className="font-semibold">{selectedProvider}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-semibold">{date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-semibold">{selectedTime}</span>
                  </div>
                  <Button
                    onClick={handleBooking}
                    className="w-full rounded-xl gradient-hero text-white shadow-soft hover:shadow-hover transition-smooth mt-4"
                  >
                    Confirm Booking
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Calendar */}
          <div className="space-y-6">
            <Card className="rounded-3xl shadow-soft animate-slide-up">
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
                <CardDescription>Choose your preferred appointment date</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-2xl border"
                  disabled={(date) => date < new Date()}
                />
              </CardContent>
            </Card>

            {/* Provider Info */}
            {selectedProvider && (
              <Card className="rounded-3xl shadow-soft animate-fade-in">
                <CardHeader>
                  <CardTitle>Provider Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1" />
                    <div>
                      <p className="font-semibold mb-1">{selectedProvider}</p>
                      <p className="text-sm text-muted-foreground">
                        {providers.find(p => p.name === selectedProvider)?.location}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full rounded-xl">
                    <MapPin className="w-4 h-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking;
