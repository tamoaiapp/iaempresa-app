import { createClient } from '@supabase/supabase-js';

// Build-safe: placeholder evita "supabaseUrl is required" durante "Collecting page
// data" em preview branches sem env. Em runtime as envs verdadeiras estão presentes.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://build-placeholder.supabase.co';
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-placeholder';

export const supabase = createClient(url, anon);

export function supabaseAdmin() {
  return createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY || 'build-placeholder');
}
