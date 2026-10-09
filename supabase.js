// ==========================================
// SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = "https://ivjnbdvqinkmnfwupxmp.supabase.co";

// Paste your Supabase PUBLISHABLE KEY below
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_duHi_T1AJgjEaoiVedIk2g__a3kuHNT";

// Create Supabase client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);