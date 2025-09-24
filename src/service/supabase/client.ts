import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eljkjuuoxobklwvdfync.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsamtqdXVveG9ia2x3dmRmeW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MDQwNjYsImV4cCI6MjA3NDI4MDA2Nn0.f21I1nw8XgeK753mCX1xOf4a0Z-OjK76GyLoioNMeaw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
