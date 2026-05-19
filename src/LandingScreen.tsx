import { useState } from 'react'
import { loadStats } from './data/leaderboard'
import { getDailyDisplayDate, hasDoneToday, getTodayResult } from './data/daily'
import './LandingScreen.css'

interface Props {
  onFreePlay: (username: string) => void
  onDailyChallenge: (username: string) => void
  onLeaderboard: () => void
  onStats: () => void
}

const TICKER_PLAYERS = [
  'Trevor Benjamin', 'Romário', 'Nicolas Anelka', 'Claudio Pizarro', 'Peter Crouch',
]

export default function LandingScreen({ onFreePlay, onDailyChallenge, onLeaderboard, onStats }: Props) {
  const [username, setUsername] = useState(
    () => localStorage.getItem('fj_username') ?? ''
  )

  const stats = loadStats()
  const todayResult = getTodayResult()
  const doneToday = hasDoneToday()

  function save(name: string) {
    const n = name.trim() || 'Anonymous'
    localStorage.setItem('fj_username', n)
    return n
  }

  const tickerItems = [...TICKER_PLAYERS, ...TICKER_PLAYERS]

  return (
    <div className="landing-app">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {tickerItems.map((name, i) => (
            <span key={i} className="ticker-item">⚽ {name}</span>
          ))}
        </div>
      </div>

      <div className="landing-badge">
        <div className="landing-title">★ THE FOOTBALL JOURNEYMAN ★</div>
        <div className="landing-sub">GUESS THE PLAYER FROM THEIR CLUBS</div>
      </div>

      <div className="landing-card">
        {stats.gamesPlayed > 0 && (
          <div className="landing-meta">
            {stats.currentStreak > 0 && (
              <span className="landing-streak">🔥 {stats.currentStreak} day streak</span>
            )}
            {stats.bestScore > 0 && (
              <span className="landing-best">⭐ Best: {stats.bestScore} pts</span>
            )}
          </div>
        )}

        <input
          className="landing-input"
          type="text"
          placeholder="Enter your name..."
          maxLength={20}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onFreePlay(save(username))}
        />

        <button className="landing-btn primary" onClick={() => onFreePlay(save(username))}>
          ▶ FREE PLAY
        </button>

        <div className="landing-divider">— OR —</div>

        <button
          className={`landing-btn daily ${doneToday ? 'done' : ''}`}
          onClick={() => !doneToday && onDailyChallenge(save(username))}
        >
          {doneToday ? (
            <>📅 DAILY DONE — {todayResult?.score ?? 0} PTS</>
          ) : (
            <>📅 DAILY CHALLENGE<br /><span className="daily-date">{getDailyDisplayDate()}</span></>
          )}
        </button>

        <div className="landing-bottom">
          <button className="landing-btn secondary" onClick={onLeaderboard}>
            🏆 LEADERBOARD
          </button>
          <button className="landing-btn secondary" onClick={onStats}>
            📊 MY STATS
          </button>
        </div>
      </div>
    </div>
  )
}
