import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import History from "./pages/History";
import Settings from "./pages/Settings";
import QueueTracking from "./pages/QueueTracking";
import JoinQueue from "./pages/JoinQueue";
import UserLocation from "./pages/UserLocation";
import ProviderDashboard from "./pages/ProviderDashboard";
import Booking from "./pages/Booking";
import PublicDisplay from "./pages/PublicDisplay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/user/dashboard" element={<UserDashboard />} />
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/user/notifications" element={<Notifications />} />
            <Route path="/user/history" element={<History />} />
            <Route path="/user/settings" element={<Settings />} />
            <Route path="/user/queue-tracking" element={<QueueTracking />} />
            <Route path="/user/join-queue" element={<JoinQueue />} />
            <Route path="/user/location" element={<UserLocation />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/display" element={<PublicDisplay />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
