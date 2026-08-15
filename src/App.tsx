import { useState, useEffect, useRef } from 'react'
import type { Player } from './data/players'
import { saveScore, saveScoreGlobal, updateStats } from './data/leaderboard'
import { getDailyPlayers, getDailyDateKey, saveDailyResult } from './data/daily'
import LandingScreen from './LandingScreen'
import Leaderboard from './Leaderboard'
import Stats from './Stats'
import { supabase } from './lib/supabase'
import { trackGameStarted, trackLevelUp, trackCorrectGuess, trackWrongGuess, trackGameOver, trackRevealClub } from './lib/analytics'
import './App.css'

const WINS_TO_ADVANCE: Record<number, number> = { 1: 3, 2: 3, 3: 2, 4: 2, 5: 1 }
const MAX_LEVEL = 5
const MAX_LIVES = 3
const TIMER_START = 18
const TIMER_BONUS = 10
const TIMER_MAX = 28

function maxPointsForLevel(level: number): number {
  return 25 + level * 25
}

function calcPoints(timeLeft: number, clubsShown: number, level: number): number {
  const max = maxPointsForLevel(level)
  const timeScore = (Math.max(timeLeft, 0) / TIMER_START) * max
  const clubPenalty = (clubsShown - 1) * max * 0.2
  return Math.max(Math.round(timeScore - clubPenalty), 5)
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

// Normalise accents so "Kaka" matches "Kaká", "Ibrahimovic" matches "Ibrahimović" etc.
function normalise(s: string): string {
  return s.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
}

// Levenshtein distance between two strings (used to allow one-character typos).
function editDistance(a: string, b: string): number {
  const m = a.length
  const n = b.length
  let prev = Array.from({ length: n + 1 }, (_, i) => i)
  let curr = new Array<number>(n + 1)
  for (let i = 1; i <= m; i++) {
    curr[0] = i
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      curr[j] = Math.min(
        prev[j] + 1,        // deletion
        curr[j - 1] + 1,    // insertion
        prev[j - 1] + cost, // substitution
      )
    }
    ;[prev, curr] = [curr, prev]
  }
  return prev[n]
}

function isCorrectGuess(guess: string, playerName: string): boolean {
  const g = normalise(guess)
  const words = normalise(playerName).split(' ')

  // Accept any trailing word-chunk of the name: "Edwin van der Sar" ->
  // "van der sar" / "der sar" / "sar" (plus the full name). Leading/middle
  // particles like "van" or "der" are never generated on their own.
  for (let i = 0; i < words.length; i++) {
    const candidate = words.slice(i).join(' ')
    if (candidate.length >= 3 && g === candidate) return true
    if (candidate.length >= 5 && editDistance(g, candidate) <= 1) return true
  }

  return false
}

function arraysEqual(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((item, i) => item === b[i])
}

// A "twin" is a different real player with the exact same club career (same
// clubs, same order). Naming the twin instead of the answer is forgiven.
function matchesTwin(guess: string, currentPlayer: Player, allPlayers: Player[]): boolean {
  return allPlayers.some(
    (p) =>
      p.id !== currentPlayer.id &&
      isCorrectGuess(guess, p.name) &&
      arraysEqual(p.clubs, currentPlayer.clubs),
  )
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
  const [players, setPlayers] = useState<Player[]>([])
  const [loadingPlayers, setLoadingPlayers] = useState(true)

  useEffect(() => {
    supabase.from('players').select('*').then(({ data, error }) => {
      if (!error && data) setPlayers(data as Player[])
      setLoadingPlayers(false)
    })
  }, [])

  const [screen, setScreen] = useState<Screen>('landing')
  const [username, setUsername] = useState('Anonymous')
  const [isDaily, setIsDaily] = useState(false)

  // Game state
  const [level, setLevel] = useState(1)
  const [winsThisLevel, setWinsThisLevel] = useState(0)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(2)
  const [player, setPlayer] = useState(players[0])
  const [clubsShown, setClubsShown] = useState(1)
  const [positionRevealed, setPositionRevealed] = useState(false)
  const [guess, setGuess] = useState('')
  const [result, setResult] = useState<'correct' | 'wrong' | 'close' | null>(null)
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
      return pickRandom(players.filter((p) => p.level === (lvl as 1|2|3|4|5)))
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
    setClubsShown(1)
    setPositionRevealed(false)
    setGuess('')
    setResult(null)
    setTimeLeft(TIMER_START)
    usedIds.current = new Set()

    if (daily) {
      const queue = getDailyPlayers(players)
      dailyQueue.current = queue
      dailyIndex.current = 0
      setPlayer(queue[0])
    } else {
      const first = pickPlayer(1)
      usedIds.current.add(first.id)
      setPlayer(first)
    }
    trackGameStarted(daily ? 'daily' : 'free')
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
    setClubsShown(1)
    setPositionRevealed(false)
    setGuess('')
    setResult(null)
    setTimeLeft(TIMER_START)
  }

  function triggerGameOver(currentScore: number, currentLevel: number, won: boolean, currentPlayer: typeof players[0], wasRevealed = false) {
    saveScore({ username, score: currentScore, levelReached: currentLevel, won, mode: isDaily ? 'daily' : 'free' })
    updateStats(currentScore, won)
    if (isDaily) {
      saveDailyResult(currentScore, currentLevel, won)
      saveScoreGlobal({ username, score: currentScore, levelReached: currentLevel, won, mode: 'daily' })
    }
    trackGameOver(currentScore, currentLevel, won, isDaily ? 'daily' : 'free')
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
      trackCorrectGuess(level, clubsShown, timeLeft, pts)

      const needed = WINS_TO_ADVANCE[level]
      if (newWins >= needed) {
        if (level >= MAX_LEVEL) {
          setTimeout(() => triggerGameOver(newScore, level, true, player, true), 1200)
        } else {
          const nextLevel = level + 1
          trackLevelUp(nextLevel)
          setLevel(nextLevel)
          if (nextLevel === 3) setLives((l) => Math.min(l + 1, MAX_LIVES))
          setWinsThisLevel(0)
          setTimeout(() => loadNextPlayer(nextLevel), 1200)
        }
      } else {
        setTimeout(() => loadNextPlayer(level), 1200)
      }
    } else {
      if (matchesTwin(guess, player, players)) {
        setResult('close')
        setGuess('')
        return
      }
      const remaining = lives - 1
      setLives(remaining)
      trackWrongGuess(level)
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
    trackRevealClub(level, clubsShown + 1)
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

  if (loadingPlayers) {
    return (
      <div className="app">
        <div className="badge-header">
          <div className="badge-title">★ THE FOOTBALL JOURNEYMAN ★</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          Loading players...
        </div>
      </div>
    )
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
            {'❤️'.repeat(lives)}
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
              {i === 0 && player.debutYear ? ` (${player.debutYear})` : ''}
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
          <div className="feedback wrong">✗ WRONG! — {lives} {lives === 1 ? 'LIFE' : 'LIVES'} REMAINING. TRY AGAIN!</div>
        )}

        {result === 'close' && (
          <div className="feedback close">🤔 Same clubs as another player! No life lost — try again.</div>
        )}

        {!isCorrect && canRevealMore && (
          <button className="secondary" onClick={handleReveal}>
            REVEAL NEXT CLUB (+{TIMER_BONUS}s)
          </button>
        )}

        {!isCorrect && !canRevealMore && !positionRevealed && player.position && (
          <button className="secondary" onClick={() => setPositionRevealed(true)}>
            REVEAL POSITION
          </button>
        )}
        {positionRevealed && player.position && (
          <div className="position-clue">📍 Position: {player.position}</div>
        )}
      </div>
    </div>
  )
}
