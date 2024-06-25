import type { SupabaseClient } from '@supabase/supabase-js'
import { createClient as createBrowserClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '../secrets'

let client: SupabaseClient | undefined

export function createClient(): SupabaseClient {
  if (client) return client

  client = createBrowserClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)

  return client
}
