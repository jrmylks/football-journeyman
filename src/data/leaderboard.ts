export interface ScoreEntry {
  username: string
  score: number
  levelReached: number
  won: boolean
  date: string // ISO string
  mode: 'free' | 'daily'
}

export interface GameStats {
  gamesPlayed: number
  wins: number
  totalScore: number
  bestScore: number
  currentStreak: number
  longestStreak: number
  lastPlayedDate: string // YYYY-MM-DD
}

const SCORES_KEY = 'fj_scores'
const STATS_KEY = 'fj_stats'

export function saveScore(entry: Omit<ScoreEntry, 'date'>) {
  const all = loadAll()
  all.push({ ...entry, date: new Date().toISOString() })
  localStorage.setItem(SCORES_KEY, JSON.stringify(all))
}

export async function saveScoreGlobal(entry: Omit<ScoreEntry, 'date'>) {
  const { supabase } = await import('../lib/supabase')
  const today = new Date().toISOString().slice(0, 10)
  await supabase.from('scores').insert({
    username: entry.username,
    score: entry.score,
    level_reached: entry.levelReached,
    won: entry.won,
    date: today,
  })
}

export async function loadGlobalDaily(): Promise<ScoreEntry[]> {
  const { supabase } = await import('../lib/supabase')
  const today = new Date().toISOString().slice(0, 10)
  const { data } = await supabase
    .from('scores')
    .select('*')
    .eq('date', today)
    .order('score', { ascending: false })
    .limit(20)
  return (data ?? []).map((r) => ({
    username: r.username,
    score: r.score,
    levelReached: r.level_reached,
    won: r.won,
    date: r.date,
    mode: 'daily' as const,
  }))
}

export function loadAll(): ScoreEntry[] {
  try {
    return JSON.parse(localStorage.getItem(SCORES_KEY) ?? '[]')
  } catch {
    return []
  }
}

export function loadDaily(): ScoreEntry[] {
  const today = new Date().toDateString()
  return loadAll()
    .filter((e) => new Date(e.date).toDateString() === today)
    .sort((a, b) => b.score - a.score)
}

export function loadWeekly(): ScoreEntry[] {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
  return loadAll()
    .filter((e) => new Date(e.date).getTime() >= weekAgo)
    .sort((a, b) => b.score - a.score)
}

export function loadStats(): GameStats {
  try {
    const stored = localStorage.getItem(STATS_KEY)
    if (stored) return JSON.parse(stored)
  } catch {}
  return {
    gamesPlayed: 0,
    wins: 0,
    totalScore: 0,
    bestScore: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastPlayedDate: '',
  }
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayKey(): string {
  const d = new Date(Date.now() - 86400000)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function updateStats(score: number, won: boolean): GameStats {
  const stats = loadStats()
  const today = todayKey()

  stats.gamesPlayed += 1
  if (won) stats.wins += 1
  stats.totalScore += score
  if (score > stats.bestScore) stats.bestScore = score

  if (stats.lastPlayedDate === yesterdayKey()) {
    stats.currentStreak += 1
  } else if (stats.lastPlayedDate !== today) {
    stats.currentStreak = 1
  }
  if (stats.currentStreak > stats.longestStreak) {
    stats.longestStreak = stats.currentStreak
  }
  stats.lastPlayedDate = today

  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  return stats
}
