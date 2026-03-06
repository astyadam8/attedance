import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Prevent createClient from throwing if URL is empty
export const supabase = supabaseUrl && supabaseUrl !== 'https://your-project.supabase.co'
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder'); // Dummy client to prevent crash

export const isSupabaseConfigured = !!import.meta.env.VITE_SUPABASE_URL && 
                                    !!import.meta.env.VITE_SUPABASE_ANON_KEY && 
                                    import.meta.env.VITE_SUPABASE_URL !== 'https://your-project.supabase.co';
