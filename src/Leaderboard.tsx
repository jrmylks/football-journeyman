import { useState } from 'react'
import { loadDaily, loadWeekly } from './data/leaderboard'
import './Leaderboard.css'

interface Props {
  onBack: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ onBack }: Props) {
  const [tab, setTab] = useState<'daily' | 'weekly'>('daily')

  const entries = tab === 'daily' ? loadDaily() : loadWeekly()

  return (
    <div className="lb-app">
      <div className="lb-badge">
        <div className="lb-title">🏆 LEADERBOARD</div>
        <div className="lb-sub">THE FOOTBALL JOURNEYMAN</div>
      </div>

      <div className="lb-card">
        <div className="lb-tabs">
          <button
            className={`lb-tab ${tab === 'daily' ? 'active' : ''}`}
            onClick={() => setTab('daily')}
          >
            DAILY
          </button>
          <button
            className={`lb-tab ${tab === 'weekly' ? 'active' : ''}`}
            onClick={() => setTab('weekly')}
          >
            WEEKLY
          </button>
        </div>

        {entries.length === 0 ? (
          <div className="lb-empty">No scores yet. Play a game!</div>
        ) : (
          <ol className="lb-list">
            {entries.slice(0, 10).map((entry, i) => (
              <li key={i} className="lb-row">
                <span className="lb-rank">{MEDALS[i] ?? `#${i + 1}`}</span>
                <span className="lb-username">{entry.username}</span>
                <span className="lb-score">{entry.score} pts</span>
                <span className="lb-meta">
                  Lvl {entry.levelReached}{entry.won ? ' ★' : ''}
                </span>
              </li>
            ))}
          </ol>
        )}

        <button className="lb-back-btn" onClick={onBack}>← BACK</button>
      </div>
    </div>
  )
}
