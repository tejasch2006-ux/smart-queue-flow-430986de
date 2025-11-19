import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SendOTPRequest {
  phone_number: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { phone_number }: SendOTPRequest = await req.json();

    if (!phone_number || !phone_number.match(/^\+[1-9]\d{1,14}$/)) {
      return new Response(
        JSON.stringify({ error: 'Invalid phone number format. Use E.164 format (+1234567890)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Generate 6-digit OTP
    const otp_code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires_at = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    console.log('Generated OTP:', otp_code, 'for phone:', phone_number);

    // Delete any existing OTPs for this phone number
    await supabase
      .from('phone_otp')
      .delete()
      .eq('phone_number', phone_number);

    // Store OTP in database
    const { error: insertError } = await supabase
      .from('phone_otp')
      .insert({
        phone_number,
        otp_code,
        expires_at: expires_at.toISOString(),
      });

    if (insertError) {
      console.error('Error storing OTP:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to generate OTP' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // TODO: Integrate SMS service (Twilio, AWS SNS, etc.)
    // For now, we'll just log the OTP (in production, send via SMS)
    console.log(`📱 OTP for ${phone_number}: ${otp_code}`);
    
    // In development, return OTP in response (REMOVE IN PRODUCTION!)
    const isDev = Deno.env.get('ENVIRONMENT') === 'development';
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'OTP sent successfully',
        ...(isDev ? { dev_otp: otp_code } : {}) // Only in dev
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in send-otp:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
