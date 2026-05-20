import { useState } from 'react'
import { loadStats } from './data/leaderboard'
import { getDailyDisplayDate, hasDoneToday, getTodayResult } from './data/daily'
import './LandingScreen.css'

function InstructionsModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="instructions-overlay" onClick={onClose}>
      <div className="instructions-modal" onClick={(e) => e.stopPropagation()}>
        <div className="instructions-title">HOW TO PLAY</div>
        <div className="instructions-body">
          <p>Guess the football player from their club career.</p>
          <ul>
            <li>You start with <strong>3 clubs</strong> shown and a <strong>15 second timer</strong>.</li>
            <li>Type the player's <strong>full name or surname</strong> and hit GUESS.</li>
            <li>A correct guess earns points — the faster and fewer clubs shown, the more you score.</li>
            <li>You have <strong>2 lives</strong>. A wrong guess or running out of time costs a life.</li>
            <li>Hit <strong>REVEAL NEXT CLUB</strong> to see another club and add 10 seconds — but your potential points drop.</li>
            <li>Win enough rounds to advance through <strong>5 levels</strong> of difficulty.</li>
            <li>Level 1 needs 3 wins, levels 2–3 need 3 wins, levels 4–5 need fewer — can you complete all 5?</li>
          </ul>
          <div className="instructions-modes">
            <div><strong>▶ FREE PLAY</strong> — random players, play as many times as you like.</div>
            <div><strong>📅 DAILY CHALLENGE</strong> — one fixed set of players per day, same for everyone. Compare scores on the leaderboard!</div>
          </div>
          <div className="instructions-levels">
            <div><strong>Level 1</strong> — Global icons</div>
            <div><strong>Level 2</strong> — Famous players, trickier paths</div>
            <div><strong>Level 3</strong> — Well-known, needs thinking</div>
            <div><strong>Level 4</strong> — Solid pros, obscure careers</div>
            <div><strong>Level 5</strong> — True journeymen. Good luck.</div>
          </div>
        </div>
        <button className="instructions-close" onClick={onClose}>✕ CLOSE</button>
      </div>
    </div>
  )
}

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
  const [showInstructions, setShowInstructions] = useState(false)

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
      {showInstructions && <InstructionsModal onClose={() => setShowInstructions(false)} />}
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
          <button className="landing-btn secondary" onClick={() => setShowInstructions(true)}>
            ❓ HOW TO PLAY
          </button>
        </div>
      </div>
    </div>
  )
}
