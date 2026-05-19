import { useState, useEffect, useRef } from 'react'
import { players } from './data/players'
import { saveScore, updateStats } from './data/leaderboard'
import { getDailyPlayers, getDailyDateKey, saveDailyResult } from './data/daily'
import LandingScreen from './LandingScreen'
import Leaderboard from './Leaderboard'
import Stats from './Stats'
import './App.css'

const WINS_TO_ADVANCE: Record<number, number> = { 1: 3, 2: 3, 3: 2, 4: 2, 5: 1 }
const MAX_LEVEL = 5
const TIMER_START = 15
const TIMER_BONUS = 10
const TIMER_MAX = 20

function maxPointsForLevel(level: number): number {
  return 25 + level * 25
}

function calcPoints(timeLeft: number, clubsShown: number, level: number): number {
  const max = maxPointsForLevel(level)
  const timeScore = (Math.max(timeLeft, 0) / TIMER_START) * max
  const clubPenalty = (clubsShown - 3) * max * 0.2
  return Math.max(Math.round(timeScore - clubPenalty), 5)
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Normalise accents so "Kaka" matches "Kaká", "Ibrahimovic" matches "Ibrahimović" etc.
function normalise(s: string): string {
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

function isCorrectGuess(guess: string, playerName: string): boolean {
  if (normalise(guess) === normalise(playerName)) return true
  const lastName = normalise(playerName).split(' ').at(-1) ?? ''
  return lastName.length >= 3 && normalise(guess) === lastName
}

type Screen = 'landing' | 'leaderboard' | 'stats' | 'game' | 'game-over'

interface GameOverState {
  score: number
  level: number
  won: boolean
  correctAnswer: string
  wasRevealed: boolean // true if game ended naturally (correct/home), false if wrong answer ended it
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('landing')
  const [username, setUsername] = useState('Anonymous')
  const [isDaily, setIsDaily] = useState(false)

  // Game state
  const [level, setLevel] = useState(1)
  const [winsThisLevel, setWinsThisLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(2)
  const [player, setPlayer] = useState(players[0])
  const [clubsShown, setClubsShown] = useState(3)
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null)
  const [timeLeft, setTimeLeft] = useState(TIMER_START)

  // Daily: fixed ordered queue
  const dailyQueue = useRef<typeof players>([])
  const dailyIndex = useRef(0)

  // Game-over
  const [gameOver, setGameOver] = useState<GameOverState>({
    score: 0, level: 1, won: false, correctAnswer: '', wasRevealed: false,
  })
  const [shareCopied, setShareCopied] = useState(false)

  const usedIds = useRef<Set<string>>(new Set())

  function pickPlayer(lvl: number) {
    const pool = players.filter((p) => p.level === lvl && !usedIds.current.has(p.id))
    if (pool.length === 0) {
      players.filter((p) => p.level === lvl).forEach((p) => usedIds.current.delete(p.id))
      return pickRandom(players.filter((p) => p.level === lvl))
    }
    return pickRandom(pool)
  }

  function initGame(name: string, daily: boolean) {
    setUsername(name)
    setIsDaily(daily)
    setLevel(1)
    setWinsThisLevel(0)
    setScore(0)
    setLives(2)
    setClubsShown(3)
    setGuess('')
    setResult(null)
    setTimeLeft(TIMER_START)
    usedIds.current = new Set()

    if (daily) {
      const queue = getDailyPlayers()
      dailyQueue.current = queue
      dailyIndex.current = 0
      setPlayer(queue[0])
    } else {
      const first = pickPlayer(1)
      usedIds.current.add(first.id)
      setPlayer(first)
    }
    setScreen('game')
  }

  function loadNextPlayer(lvl: number) {
    let next
    if (isDaily) {
      dailyIndex.current += 1
      next = dailyQueue.current[dailyIndex.current] ?? pickPlayer(lvl)
    } else {
      next = pickPlayer(lvl)
      usedIds.current.add(next.id)
    }
    setPlayer(next)
    setClubsShown(3)
    setGuess('')
    setResult(null)
    setTimeLeft(TIMER_START)
  }

  function triggerGameOver(currentScore: number, currentLevel: number, won: boolean, currentPlayer: typeof players[0], wasRevealed = false) {
    saveScore({ username, score: currentScore, levelReached: currentLevel, won, mode: isDaily ? 'daily' : 'free' })
    updateStats(currentScore, won)
    if (isDaily) saveDailyResult(currentScore, currentLevel, won)
    setGameOver({ score: currentScore, level: currentLevel, won, correctAnswer: currentPlayer.name, wasRevealed })
    setScreen('game-over')
  }

  // Timer tick
  useEffect(() => {
    if (screen !== 'game' || result === 'correct' || timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft, result, screen])

  // Timer hits 0
  useEffect(() => {
    if (timeLeft > 0 || result === 'correct' || screen !== 'game') return
    if (clubsShown < player.clubs.length) {
      setClubsShown((n) => n + 1)
      setResult(null)
      setTimeLeft(TIMER_START)
    } else {
      const remaining = lives - 1
      setLives(remaining)
      if (remaining <= 0) {
        triggerGameOver(score, level, false, player)
      } else {
        setResult('wrong')
        setGuess('')
        setTimeLeft(TIMER_START)
      }
    }
  }, [timeLeft])

  function handleGuess() {
    if (!guess.trim() || result === 'correct') return

    if (isCorrectGuess(guess, player.name)) {
      const pts = calcPoints(timeLeft, clubsShown, level)
      const newScore = score + pts
      const newWins = winsThisLevel + 1
      setScore(newScore)
      setWinsThisLevel(newWins)
      setResult('correct')

      const needed = WINS_TO_ADVANCE[level]
      if (newWins >= needed) {
        if (level >= MAX_LEVEL) {
          setTimeout(() => triggerGameOver(newScore, level, true, player, true), 1200)
        } else {
          const nextLevel = level + 1
          setLevel(nextLevel)
          setWinsThisLevel(0)
          setTimeout(() => loadNextPlayer(nextLevel), 1200)
        }
      } else {
        setTimeout(() => loadNextPlayer(level), 1200)
      }
    } else {
      const remaining = lives - 1
      setLives(remaining)
      if (remaining <= 0) {
        triggerGameOver(score, level, false, player)
      } else {
        setResult('wrong')
        setGuess('')
        setTimeLeft(TIMER_START)
      }
    }
  }

  function handleReveal() {
    setClubsShown((n) => n + 1)
    setResult(null)
    setTimeLeft((t) => Math.min(t + TIMER_BONUS, TIMER_MAX))
  }

  function buildShareText(): string {
    const date = getDailyDateKey()
    const stars = '⭐'.repeat(gameOver.level) + '☆'.repeat(MAX_LEVEL - gameOver.level)
    return [
      '★ THE FOOTBALL JOURNEYMAN ★',
      isDaily ? `Daily Challenge — ${date}` : 'Free Play',
      `Score: ${gameOver.score} pts`,
      `Level reached: ${gameOver.level}/5  ${stars}`,
      gameOver.won ? '✅ Completed!' : '❌ Game Over',
    ].join('\n')
  }

  function handleShare() {
    navigator.clipboard.writeText(buildShareText()).then(() => {
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2500)
    })
  }

  if (screen === 'landing') {
    return (
      <LandingScreen
        onFreePlay={(name) => initGame(name, false)}
        onDailyChallenge={(name) => initGame(name, true)}
        onLeaderboard={() => setScreen('leaderboard')}
        onStats={() => setScreen('stats')}
      />
    )
  }

  if (screen === 'leaderboard') return <Leaderboard onBack={() => setScreen('landing')} />
  if (screen === 'stats') return <Stats onBack={() => setScreen('landing')} />

  if (screen === 'game-over') {
    return (
      <div className="app">
        <div className="badge-header">
          <div className="badge-title">★ THE FOOTBALL JOURNEYMAN ★</div>
        </div>
        <div className="card">
          <div className="card-question">{gameOver.won ? '★ YOU WON! ★' : 'GAME OVER'}</div>

          {!gameOver.wasRevealed && (
            <div className="answer-reveal">
              The answer was: <strong>{gameOver.correctAnswer}</strong>
            </div>
          )}

          <div className="gameover-score">
            <div className="gameover-pts">{gameOver.score}</div>
            <div className="gameover-label">POINTS</div>
          </div>
          <div className="gameover-detail">
            {gameOver.won ? 'You completed all 5 levels!' : `Reached Level ${gameOver.level}`}
          </div>

          <button className="share-btn" onClick={handleShare}>
            {shareCopied ? '✓ COPIED!' : '📋 SHARE RESULT'}
          </button>

          <div className="actions">
            <button onClick={() => initGame(username, false)}>▶ FREE PLAY</button>
            <button className="secondary" onClick={() => setScreen('leaderboard')}>🏆 LEADERBOARD</button>
          </div>
          <button className="secondary" style={{ width: '100%' }} onClick={() => setScreen('landing')}>🏠 HOME</button>
        </div>
      </div>
    )
  }

  // Game screen
  const needed = WINS_TO_ADVANCE[level]
  const canRevealMore = clubsShown < player.clubs.length
  const isCorrect = result === 'correct'
  const timerPct = Math.min((timeLeft / TIMER_START) * 100, 100)
  const timerUrgent = timeLeft <= 5
  const pts = calcPoints(timeLeft, clubsShown, level)

  return (
    <div className="app">
      <div className="badge-header">
        <div className="badge-title">★ THE FOOTBALL JOURNEYMAN ★</div>
        <div className="badge-row">
          <button className="back-btn" onClick={() => triggerGameOver(score, level, false, player, true)}>🏠 HOME</button>
          <div className="badge-score">SCORE: {score}</div>
          <div className="badge-level">LVL {level} &nbsp;{winsThisLevel}/{needed}</div>
          <div className={`badge-lives ${lives === 1 ? 'one-life' : ''}`}>
            {lives === 2 ? '❤️❤️' : '❤️'}
          </div>
        </div>
        {isDaily && <div className="daily-banner">📅 DAILY CHALLENGE</div>}
      </div>

      <div className="card">
        <div className="card-question">WHO AM I?</div>

        <ol className="club-list">
          {player.clubs.slice(0, clubsShown).map((club, i) => (
            <li key={i}>
              <span className="club-num">[{i + 1}]</span> {club}
            </li>
          ))}
        </ol>

        <div className="worth">
          Answer now for ~<strong>{pts} pts</strong>
        </div>

        {!isCorrect && (
          <>
            <div className="guess-row">
              <input
                type="text"
                placeholder="Player name..."
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGuess()}
                autoFocus
              />
              <button onClick={handleGuess}>GUESS!</button>
            </div>

            <div className={`timer ${timerUrgent ? 'urgent' : ''}`}>
              <div className="timer-bar-track">
                <div className="timer-bar-fill" style={{ width: `${timerPct}%` }} />
              </div>
              <div className="timer-text">⏱ {timeLeft}s</div>
            </div>
          </>
        )}

        {isCorrect && (
          <div className="feedback correct">✓ CORRECT! +{pts} PTS — NEXT UP...</div>
        )}

        {result === 'wrong' && (
          <div className="feedback wrong">✗ WRONG! — 1 LIFE REMAINING. TRY AGAIN!</div>
        )}

        {!isCorrect && canRevealMore && (
          <button className="secondary" onClick={handleReveal}>
            REVEAL NEXT CLUB (+{TIMER_BONUS}s)
          </button>
        )}
      </div>
    </div>
  )
}
