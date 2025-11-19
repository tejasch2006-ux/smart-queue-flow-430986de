import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Phone, ArrowRight, Loader2 } from "lucide-react";

interface PhoneAuthProps {
  onSuccess: () => void;
}

export const PhoneAuth = ({ onSuccess }: PhoneAuthProps) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { toast } = useToast();

  const handleSendOTP = async () => {
    if (!phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number with country code (e.g., +1234567890)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-otp', {
        body: { phone_number: phoneNumber },
      });

      if (error) throw error;

      toast({
        title: "OTP Sent",
        description: `Verification code sent to ${phoneNumber}`,
      });

      // For development, show the OTP
      if (data?.dev_otp) {
        toast({
          title: "Development Mode",
          description: `Your OTP is: ${data.dev_otp}`,
          duration: 10000,
        });
      }

      setStep('otp');
      setCountdown(300); // 5 minutes
      
      // Start countdown
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error: any) {
      console.error('Send OTP error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('verify-otp', {
        body: { phone_number: phoneNumber, otp_code: otp },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Verification failed');
      }

      toast({
        title: "Success!",
        description: data.is_new_user ? "Account created successfully" : "Logged in successfully",
      });

      // The auth state will be updated automatically via onAuthStateChange
      onSuccess();
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid or expired OTP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    if (countdown > 0) return;
    setOtp('');
    handleSendOTP();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (step === 'otp') {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full gradient-hero flex items-center justify-center shadow-soft">
            <Phone className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold">Enter Verification Code</h3>
          <p className="text-sm text-muted-foreground">
            We sent a 6-digit code to<br />
            <span className="font-semibold">{phoneNumber}</span>
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              className="text-center text-2xl tracking-widest rounded-xl h-14"
              autoFocus
            />
          </div>

          <Button
            onClick={handleVerifyOTP}
            disabled={loading || otp.length !== 6}
            className="w-full rounded-xl gradient-hero text-white shadow-soft hover:shadow-hover transition-smooth h-12"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify & Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>

          <div className="text-center space-y-2">
            {countdown > 0 ? (
              <p className="text-sm text-muted-foreground">
                Resend code in {formatTime(countdown)}
              </p>
            ) : (
              <Button
                variant="ghost"
                onClick={handleResendOTP}
                disabled={loading}
                className="text-primary"
              >
                Resend Code
              </Button>
            )}
            <Button
              variant="ghost"
              onClick={() => {
                setStep('phone');
                setOtp('');
              }}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 mx-auto rounded-full gradient-hero flex items-center justify-center shadow-soft">
          <Phone className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold">Continue with Phone</h3>
        <p className="text-sm text-muted-foreground">
          Enter your phone number to get started
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="pl-10 rounded-xl h-12"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Include country code (e.g., +1 for USA, +91 for India)
          </p>
        </div>

        <Button
          onClick={handleSendOTP}
          disabled={loading || !phoneNumber}
          className="w-full rounded-xl gradient-hero text-white shadow-soft hover:shadow-hover transition-smooth h-12"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Sending Code...
            </>
          ) : (
            <>
              Send Verification Code
              <ArrowRight className="w-5 h-5 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
