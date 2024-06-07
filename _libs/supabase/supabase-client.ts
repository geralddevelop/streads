import { createClient } from "@supabase/supabase-js"

import { Storage } from "@plasmohq/storage"

const storage = new Storage({
  area: "local"
})
export const supabaseClient = createClient(
  process.env.PLASMO_PUBLIC_SUPABASE_URL,
  process.env.PLASMO_PUBLIC_SUPABASE_KEY,
  {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
)
