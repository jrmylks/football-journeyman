import { useState, useEffect } from 'react'
import { loadDaily, loadWeekly, loadGlobalWeekly } from './data/leaderboard'
import type { ScoreEntry } from './data/leaderboard'
import './Leaderboard.css'

interface Props {
  onBack: () => void
}

const MEDALS = ['🥇', '🥈', '🥉']

export default function Leaderboard({ onBack }: Props) {
  const [tab, setTab] = useState<'global' | 'daily' | 'weekly'>('global')
  const [globalEntries, setGlobalEntries] = useState<ScoreEntry[]>([])
  const [loadingGlobal, setLoadingGlobal] = useState(true)

  useEffect(() => {
    loadGlobalWeekly().then((data) => {
      setGlobalEntries(data)
      setLoadingGlobal(false)
    })
  }, [])

  const localEntries = tab === 'daily' ? loadDaily() : loadWeekly()
  const entries = tab === 'global' ? globalEntries : localEntries

  return (
    <div className="lb-app">
      <div className="lb-badge">
        <div className="lb-title">🏆 LEADERBOARD</div>
        <div className="lb-sub">THE FOOTBALL JOURNEYMAN</div>
      </div>

      <div className="lb-card">
        <div className="lb-tabs">
          <button
            className={`lb-tab ${tab === 'global' ? 'active' : ''}`}
            onClick={() => setTab('global')}
          >
            🌍 GLOBAL
          </button>
          <button
            className={`lb-tab ${tab === 'daily' ? 'active' : ''}`}
            onClick={() => setTab('daily')}
          >
            MY TODAY
          </button>
          <button
            className={`lb-tab ${tab === 'weekly' ? 'active' : ''}`}
            onClick={() => setTab('weekly')}
          >
            MY WEEK
          </button>
        </div>

        {tab === 'global' && loadingGlobal ? (
          <div className="lb-empty">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="lb-empty">
            {tab === 'global' ? 'No scores in the last 7 days. Be the first!' : 'No scores yet. Play a game!'}
          </div>
        ) : (
          <ol className="lb-list">
            {entries.slice(0, 20).map((entry, i) => (
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
