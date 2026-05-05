import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Essa é a variável mágica que vamos importar nos outros arquivos!
export const supabase = createClient(supabaseUrl, supabaseAnonKey);