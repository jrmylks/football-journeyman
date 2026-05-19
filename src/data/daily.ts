import type { Player } from './players'

function seededRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s ^= s << 13; s ^= s >> 17; s ^= s << 5
    return (s >>> 0) / 0x100000000
  }
}

function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function getDailyDateKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getDailyDisplayDate(): string {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Same 11 players for everyone today: 3×L1, 3×L2, 2×L3, 2×L4, 1×L5
export function getDailyPlayers(players: Player[]): Player[] {
  const d = new Date()
  const seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate()
  const rng = seededRng(seed)
  const counts: [1 | 2 | 3 | 4 | 5, number][] = [[1, 3], [2, 3], [3, 2], [4, 2], [5, 1]]
  return counts.flatMap(([lvl, n]) =>
    seededShuffle(players.filter(p => p.level === lvl), rng).slice(0, n)
  )
}

const dailyKey = () => `fj_daily_${getDailyDateKey()}`

export function hasDoneToday(): boolean {
  return localStorage.getItem(dailyKey()) !== null
}

export function saveDailyResult(score: number, levelReached: number, won: boolean): void {
  localStorage.setItem(dailyKey(), JSON.stringify({ score, levelReached, won }))
}

export function getTodayResult(): { score: number; levelReached: number; won: boolean } | null {
  try {
    const v = localStorage.getItem(dailyKey())
    return v ? JSON.parse(v) : null
  } catch {
    return null
  }
}
