import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client configuration.
 *
 * הערכים נטענים מקובץ .env.local (לא עולה ל-GitHub).
 * צרי קובץ .env.local בשורש הפרויקט עם:
 *
 *   VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
 *   VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
 *
 * את שני הערכים תמצאי ב: Supabase Dashboard → Settings → API
 */
const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
