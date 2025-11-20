import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Moon, Sun, Globe, Bell, Shield, LogOut, Sparkles } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    queue: true,
    appointments: true,
    promotions: false,
  });
  const [language, setLanguage] = useState("en");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    toast.success(darkMode ? "Light mode enabled" : "Dark mode enabled");
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    toast.success(`Language changed to ${newLanguage === "en" ? "English" : newLanguage === "hi" ? "Hindi" : "Marathi"}`);
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
              <h1 className="text-xl font-bold">Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-6 animate-fade-in">
          {/* Appearance */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">
                    Dark Mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle dark theme for better visibility
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={toggleDarkMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Language */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant={language === "en" ? "default" : "outline"}
                onClick={() => handleLanguageChange("en")}
                className="w-full justify-start rounded-xl"
              >
                English
              </Button>
              <Button
                variant={language === "hi" ? "default" : "outline"}
                onClick={() => handleLanguageChange("hi")}
                className="w-full justify-start rounded-xl"
              >
                हिंदी (Hindi)
              </Button>
              <Button
                variant={language === "mr" ? "default" : "outline"}
                onClick={() => handleLanguageChange("mr")}
                className="w-full justify-start rounded-xl"
              >
                मराठी (Marathi)
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="queue-notif" className="text-base font-medium">
                    Queue Updates
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about queue status
                  </p>
                </div>
                <Switch
                  id="queue-notif"
                  checked={notifications.queue}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, queue: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="appt-notif" className="text-base font-medium">
                    Appointments
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Reminders for upcoming appointments
                  </p>
                </div>
                <Switch
                  id="appt-notif"
                  checked={notifications.appointments}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, appointments: checked })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="promo-notif" className="text-base font-medium">
                    Promotions
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Special offers and updates
                  </p>
                </div>
                <Switch
                  id="promo-notif"
                  checked={notifications.promotions}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, promotions: checked })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="rounded-3xl shadow-soft border-2 border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => toast.info("Coming soon!")}
              >
                Change Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => toast.info("Coming soon!")}
              >
                Privacy Settings
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl"
                onClick={() => toast.info("Coming soon!")}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>

          {/* Sign Out */}
          <Card className="rounded-3xl shadow-soft border-2 border-destructive/20">
            <CardContent className="p-6">
              <Button
                variant="destructive"
                className="w-full rounded-xl"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Settings;
