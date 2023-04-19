import { createClient } from '@supabase/supabase-js'
const URL = import.meta.env.VITE_APP_URL;
const API_KEY = import.meta.env.VITE_APP_PUBLIC ;
// const SECRET_KEY = import.meta.env.VITE_APP_SECRET;
export const supabase = createClient(URL, API_KEY);
