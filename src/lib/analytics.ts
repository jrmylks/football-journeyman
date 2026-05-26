declare function gtag(...args: unknown[]): void

function track(eventName: string, params?: Record<string, unknown>) {
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, params)
  }
}

export function trackGameStarted(mode: 'free' | 'daily') {
  track('game_started', { mode })
}

export function trackLevelUp(level: number) {
  track('level_up', { level })
}

export function trackCorrectGuess(level: number, clubsShown: number, timeLeft: number, points: number) {
  track('correct_guess', { level, clubs_shown: clubsShown, time_left: timeLeft, points })
}

export function trackWrongGuess(level: number) {
  track('wrong_guess', { level })
}

export function trackGameOver(score: number, levelReached: number, won: boolean, mode: 'free' | 'daily') {
  track('game_over', { score, level_reached: levelReached, won, mode })
}

export function trackRevealClub(level: number, clubsShown: number) {
  track('reveal_club', { level, clubs_shown: clubsShown })
}
