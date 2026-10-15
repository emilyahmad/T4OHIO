import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!url || !key) {
    throw new Error("Missing Supabase settings. Copy .env.example to .env.local and fill in your project's URL and publishable key.");
}

// The publishable key is safe to ship in the browser: what it can do is limited by the database's row level security.
export const supabase = createClient(url, key);
