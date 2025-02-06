import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://wdncnkkxxlzkscvjirwj.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkbmNua2t4eGx6a3NjdmppcndqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5MjM1MjAsImV4cCI6MjA1MzQ5OTUyMH0.HMyStmwI7zpPeieFf965wrTRcLYBE38lyji0SIPgk6c';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
export default supabase;
