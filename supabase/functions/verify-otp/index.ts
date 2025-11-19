import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface VerifyOTPRequest {
  phone_number: string;
  otp_code: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { phone_number, otp_code }: VerifyOTPRequest = await req.json();

    if (!phone_number || !otp_code) {
      return new Response(
        JSON.stringify({ error: 'Phone number and OTP are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Retrieve OTP from database
    const { data: otpData, error: fetchError } = await supabase
      .from('phone_otp')
      .select('*')
      .eq('phone_number', phone_number)
      .eq('verified', false)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (fetchError || !otpData) {
      console.error('OTP not found:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP has expired
    if (new Date(otpData.expires_at) < new Date()) {
      return new Response(
        JSON.stringify({ error: 'OTP has expired' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check attempts
    if (otpData.attempts >= 5) {
      return new Response(
        JSON.stringify({ error: 'Too many failed attempts. Please request a new OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Verify OTP
    if (otpData.otp_code !== otp_code) {
      // Increment attempts
      await supabase
        .from('phone_otp')
        .update({ attempts: otpData.attempts + 1 })
        .eq('id', otpData.id);

      return new Response(
        JSON.stringify({ error: 'Invalid OTP' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Mark OTP as verified
    await supabase
      .from('phone_otp')
      .update({ verified: true })
      .eq('id', otpData.id);

    // Check if user exists with this phone number
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('id')
      .eq('phone_number', phone_number)
      .single();

    let userId: string;
    let session;
    let isNewUser = false;

    if (existingProfile) {
      // User exists, create session
      userId = existingProfile.id;
      
      // Generate auth token for existing user
      const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: `${phone_number.replace('+', '')}@phone.smartqueue.app`,
      });

      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }

      session = sessionData;
    } else {
      // Create new user
      const tempEmail = `${phone_number.replace('+', '')}@phone.smartqueue.app`;
      const tempPassword = crypto.randomUUID();

      const { data: newUser, error: signUpError } = await supabase.auth.admin.createUser({
        email: tempEmail,
        password: tempPassword,
        phone: phone_number,
        email_confirm: true,
        phone_confirm: true,
        user_metadata: {
          phone_number,
          auth_method: 'phone_otp'
        }
      });

      if (signUpError || !newUser.user) {
        console.error('Signup error:', signUpError);
        return new Response(
          JSON.stringify({ error: 'Failed to create user account' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      userId = newUser.user.id;
      isNewUser = true;

      // Generate session for new user
      const { data: sessionData, error: sessionError } = await supabase.auth.admin.generateLink({
        type: 'magiclink',
        email: tempEmail,
      });

      if (sessionError) {
        console.error('Session error:', sessionError);
        throw sessionError;
      }

      session = sessionData;
    }

    console.log('OTP verified successfully for:', phone_number);

    return new Response(
      JSON.stringify({ 
        success: true,
        is_new_user: isNewUser,
        user_id: userId,
        access_token: session?.properties?.action_link || null,
        message: 'OTP verified successfully'
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in verify-otp:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
