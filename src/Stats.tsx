import { loadStats } from './data/leaderboard'
import './Stats.css'

interface Props {
  onBack: () => void
}

export default function Stats({ onBack }: Props) {
  const s = loadStats()
  const winPct = s.gamesPlayed > 0 ? Math.round((s.wins / s.gamesPlayed) * 100) : 0
  const avgScore = s.gamesPlayed > 0 ? Math.round(s.totalScore / s.gamesPlayed) : 0

  return (
    <div className="stats-app">
      <div className="stats-badge">
        <div className="stats-title">📊 MY STATS</div>
        <div className="stats-sub">THE FOOTBALL JOURNEYMAN</div>
      </div>

      <div className="stats-card">
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{s.gamesPlayed}</div>
            <div className="stat-label">PLAYED</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{winPct}%</div>
            <div className="stat-label">WIN RATE</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{s.currentStreak}</div>
            <div className="stat-label">STREAK</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{s.longestStreak}</div>
            <div className="stat-label">BEST STREAK</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{s.bestScore}</div>
            <div className="stat-label">BEST SCORE</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{avgScore}</div>
            <div className="stat-label">AVG SCORE</div>
          </div>
        </div>

        <button className="stats-back-btn" onClick={onBack}>← BACK</button>
      </div>
    </div>
  )
}
