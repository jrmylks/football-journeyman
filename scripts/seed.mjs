import { createClient } from '@supabase/supabase-js'
import { players } from '../src/data/players.ts'

const supabase = createClient(
  'https://ulqlateciijtlgwhgjpq.supabase.co',
  'sb_publishable_cKPmFEi2LlJpk5T-XZKfJg_Gt1YgWUM'
)

const { error } = await supabase.from('players').upsert(players)
if (error) {
  console.error('Seed failed:', error.message)
  process.exit(1)
} else {
  console.log(`Seeded ${players.length} players successfully.`)
}
