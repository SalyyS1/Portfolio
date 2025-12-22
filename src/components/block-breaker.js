/**
 * Block Breaker Mini Game
 * Enhanced with difficulty levels, power-ups, combos, and leaderboard
 */

// Game configuration
const GAME_CONFIG = {
  difficulties: {
    easy: { time: 45, gridSize: 20, powerUpChance: 0.15, label: 'Easy' },
    medium: { time: 30, gridSize: 25, powerUpChance: 0.12, label: 'Medium' },
    hard: { time: 20, gridSize: 30, powerUpChance: 0.1, label: 'Hard' }
  },
  blockTypes: {
    dirt: { points: 1, color: 'linear-gradient(135deg, #8B5A2B, #6B4423)' },
    stone: { points: 2, color: 'linear-gradient(135deg, #808080, #5a5a5a)' },
    grass: { points: 2, color: 'linear-gradient(180deg, #4a7c3a 30%, #8B5A2B 30%)' },
    diamond: { points: 5, color: 'linear-gradient(135deg, #00d4ff, #00a8cc)', glow: 'rgba(0, 212, 255, 0.4)' },
    gold: { points: 3, color: 'linear-gradient(135deg, #ffd700, #cc9900)', glow: 'rgba(255, 215, 0, 0.4)' }
  },
  powerUps: {
    bomb: { icon: '💣', effect: 'Clears 3x3 area', color: '#ff4444' },
    time: { icon: '⏰', effect: '+5 seconds', color: '#44ff44' },
    double: { icon: '2×', effect: 'Double points 10s', color: '#ffaa00' }
  },
  comboThreshold: 500, // ms between clicks for combo
  comboMultipliers: [1, 1.5, 2, 2.5, 3, 4, 5] // Based on combo count
}

// Game state
const gameState = {
  score: 0,
  time: 30,
  best: 0,
  combo: 0,
  lastClickTime: 0,
  doublePointsUntil: 0,
  isRunning: false,
  timer: null,
  difficulty: 'medium',
  username: '',
  leaderboard: []
}

/**
 * Initialize the game
 */
export function initBlockBreaker() {
  const container = document.getElementById('minigame-container')
  if (!container) return

  // Load saved data
  gameState.best = parseInt(localStorage.getItem('blockBreakerBest') || '0')
  gameState.username = localStorage.getItem('blockBreakerUsername') || ''

  // Render game UI
  renderGameUI(container)
  loadLeaderboard()
  createBlocks()
}

/**
 * Render the complete game UI
 */
function renderGameUI(container) {
  container.innerHTML = `
    <h3 class="minigame-title">Block Breaker</h3>
    <p class="minigame-desc">Break blocks to score! Power-ups give bonuses. Build combos for multipliers!</p>

    <div class="minigame-wrapper">
      <!-- Difficulty Selector -->
      <div class="difficulty-selector">
        ${Object.entries(GAME_CONFIG.difficulties).map(([key, val]) => `
          <button class="difficulty-btn ${key === gameState.difficulty ? 'active' : ''}"
                  data-difficulty="${key}">${val.label}</button>
        `).join('')}
      </div>

      <!-- Stats Display -->
      <div class="minigame-stats">
        <div class="stat-item">
          <span class="stat-label">Score</span>
          <span class="stat-value" id="game-score">0</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Combo</span>
          <span class="stat-value combo-display" id="game-combo">-</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Time</span>
          <span class="stat-value" id="game-time">${GAME_CONFIG.difficulties[gameState.difficulty].time}s</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Best</span>
          <span class="stat-value" id="game-best">${gameState.best}</span>
        </div>
      </div>

      <!-- Power-up Indicator -->
      <div class="powerup-indicator" id="powerup-indicator"></div>

      <!-- Game Grid -->
      <div class="minigame-grid" id="minigame-grid"></div>

      <!-- Start Button -->
      <button class="btn btn-primary minigame-btn" id="start-game">Start Game</button>

      <!-- Leaderboard Toggle -->
      <button class="btn btn-ghost leaderboard-toggle" id="leaderboard-toggle">
        <span>🏆</span> Leaderboard
      </button>

      <!-- Leaderboard Panel -->
      <div class="leaderboard-panel hidden" id="leaderboard-panel">
        <h4>🏆 Top Players</h4>
        <div class="leaderboard-list" id="leaderboard-list">
          <p class="loading-text">Loading...</p>
        </div>
        <p class="leaderboard-note">Want to be featured? DM your score on Discord!</p>
      </div>
    </div>

    <!-- Username Modal -->
    <div class="username-modal hidden" id="username-modal">
      <div class="modal-content">
        <h4>Enter Your Name</h4>
        <input type="text" id="username-input" placeholder="Your name" maxlength="20"
               value="${gameState.username}">
        <div class="modal-buttons">
          <button class="btn btn-ghost" id="skip-username">Skip</button>
          <button class="btn btn-primary" id="save-username">Save & Play</button>
        </div>
      </div>
    </div>
  `

  // Attach event listeners
  attachEventListeners()
}

/**
 * Attach all event listeners
 */
function attachEventListeners() {
  // Difficulty buttons
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.addEventListener('click', () => selectDifficulty(btn.dataset.difficulty))
  })

  // Start button
  document.getElementById('start-game')?.addEventListener('click', handleStartClick)

  // Leaderboard toggle
  document.getElementById('leaderboard-toggle')?.addEventListener('click', toggleLeaderboard)

  // Username modal
  document.getElementById('save-username')?.addEventListener('click', saveUsername)
  document.getElementById('skip-username')?.addEventListener('click', () => {
    hideModal()
    startGame()
  })

  // Enter key in username input
  document.getElementById('username-input')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') saveUsername()
  })
}

/**
 * Select difficulty level
 */
function selectDifficulty(difficulty) {
  if (gameState.isRunning) return

  gameState.difficulty = difficulty
  document.querySelectorAll('.difficulty-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.difficulty === difficulty)
  })

  const config = GAME_CONFIG.difficulties[difficulty]
  document.getElementById('game-time').textContent = `${config.time}s`
  createBlocks()
}

/**
 * Handle start button click
 */
function handleStartClick() {
  if (gameState.isRunning) return

  // Show username modal if no username set
  if (!gameState.username) {
    document.getElementById('username-modal')?.classList.remove('hidden')
  } else {
    startGame()
  }
}

/**
 * Save username and start game
 */
function saveUsername() {
  const input = document.getElementById('username-input')
  const name = input?.value.trim() || 'Player'

  gameState.username = name
  localStorage.setItem('blockBreakerUsername', name)
  hideModal()
  startGame()
}

/**
 * Hide username modal
 */
function hideModal() {
  document.getElementById('username-modal')?.classList.add('hidden')
}

/**
 * Create game blocks
 */
function createBlocks() {
  const grid = document.getElementById('minigame-grid')
  if (!grid) return

  grid.innerHTML = ''
  const config = GAME_CONFIG.difficulties[gameState.difficulty]
  const blockKeys = Object.keys(GAME_CONFIG.blockTypes)

  for (let i = 0; i < config.gridSize; i++) {
    const block = document.createElement('div')

    // Determine block type (regular or power-up)
    const isPowerUp = Math.random() < config.powerUpChance

    if (isPowerUp && gameState.isRunning) {
      const powerUpKeys = Object.keys(GAME_CONFIG.powerUps)
      const powerUpType = powerUpKeys[Math.floor(Math.random() * powerUpKeys.length)]
      const powerUp = GAME_CONFIG.powerUps[powerUpType]

      block.className = 'minigame-block powerup'
      block.dataset.powerup = powerUpType
      block.innerHTML = `<span class="powerup-icon">${powerUp.icon}</span>`
      block.style.background = powerUp.color
      block.style.boxShadow = `0 0 15px ${powerUp.color}`
    } else {
      const type = blockKeys[Math.floor(Math.random() * blockKeys.length)]
      const blockType = GAME_CONFIG.blockTypes[type]

      block.className = `minigame-block ${type}`
      block.dataset.type = type
      block.style.background = blockType.color
      if (blockType.glow) {
        block.style.boxShadow = `0 0 10px ${blockType.glow}`
      }
    }

    block.addEventListener('click', () => breakBlock(block))
    grid.appendChild(block)
  }
}

/**
 * Break a block
 */
function breakBlock(block) {
  if (!gameState.isRunning || block.classList.contains('broken')) return

  const now = Date.now()

  // Check for combo
  if (now - gameState.lastClickTime < GAME_CONFIG.comboThreshold) {
    gameState.combo = Math.min(gameState.combo + 1, GAME_CONFIG.comboMultipliers.length - 1)
  } else {
    gameState.combo = 0
  }
  gameState.lastClickTime = now

  // Handle power-up
  if (block.dataset.powerup) {
    activatePowerUp(block.dataset.powerup, block)
  } else {
    // Calculate score
    const type = block.dataset.type
    const basePoints = GAME_CONFIG.blockTypes[type]?.points || 1
    const comboMultiplier = GAME_CONFIG.comboMultipliers[gameState.combo]
    const doubleActive = Date.now() < gameState.doublePointsUntil
    const points = Math.floor(basePoints * comboMultiplier * (doubleActive ? 2 : 1))

    gameState.score += points
    showScorePopup(block, points, gameState.combo > 0)
  }

  // Break the block
  block.classList.add('broken')

  // Update display
  updateDisplay()

  // Check if all blocks broken
  const remaining = document.querySelectorAll('.minigame-block:not(.broken)')
  if (remaining.length === 0) {
    createBlocks()
  }
}

/**
 * Activate power-up effect
 */
function activatePowerUp(type, block) {
  const indicator = document.getElementById('powerup-indicator')

  switch (type) {
    case 'bomb':
      // Get surrounding blocks (simplified: just break 5 random blocks)
      const blocks = Array.from(document.querySelectorAll('.minigame-block:not(.broken)'))
      const toBreak = blocks.slice(0, Math.min(5, blocks.length))
      toBreak.forEach(b => {
        if (b !== block) {
          const basePoints = GAME_CONFIG.blockTypes[b.dataset.type]?.points || 1
          gameState.score += basePoints
          b.classList.add('broken')
        }
      })
      showPowerUpMessage('💣 BOOM!', '#ff4444')
      break

    case 'time':
      gameState.time += 5
      document.getElementById('game-time').textContent = `${gameState.time}s`
      showPowerUpMessage('⏰ +5 SECONDS!', '#44ff44')
      break

    case 'double':
      gameState.doublePointsUntil = Date.now() + 10000
      showPowerUpMessage('2× DOUBLE POINTS!', '#ffaa00')

      // Visual indicator
      if (indicator) {
        indicator.innerHTML = '<span class="double-active">2× ACTIVE</span>'
        setTimeout(() => {
          if (indicator) indicator.innerHTML = ''
        }, 10000)
      }
      break
  }
}

/**
 * Show power-up activation message
 */
function showPowerUpMessage(text, color) {
  const popup = document.createElement('div')
  popup.className = 'powerup-popup'
  popup.textContent = text
  popup.style.color = color

  const grid = document.getElementById('minigame-grid')
  if (grid) {
    grid.appendChild(popup)
    setTimeout(() => popup.remove(), 1000)
  }
}

/**
 * Show score popup on block
 */
function showScorePopup(block, points, isCombo) {
  const popup = document.createElement('div')
  popup.className = `score-popup ${isCombo ? 'combo' : ''}`
  popup.textContent = `+${points}`

  const rect = block.getBoundingClientRect()
  const grid = document.getElementById('minigame-grid')
  const gridRect = grid?.getBoundingClientRect()

  if (gridRect) {
    popup.style.left = `${rect.left - gridRect.left + rect.width / 2}px`
    popup.style.top = `${rect.top - gridRect.top}px`
    grid?.appendChild(popup)
    setTimeout(() => popup.remove(), 600)
  }
}

/**
 * Update display values
 */
function updateDisplay() {
  document.getElementById('game-score').textContent = gameState.score

  const comboDisplay = document.getElementById('game-combo')
  if (comboDisplay) {
    if (gameState.combo > 0) {
      comboDisplay.textContent = `×${GAME_CONFIG.comboMultipliers[gameState.combo]}`
      comboDisplay.classList.add('active')
    } else {
      comboDisplay.textContent = '-'
      comboDisplay.classList.remove('active')
    }
  }
}

/**
 * Start the game
 */
function startGame() {
  if (gameState.isRunning) return

  const config = GAME_CONFIG.difficulties[gameState.difficulty]

  gameState.score = 0
  gameState.time = config.time
  gameState.combo = 0
  gameState.lastClickTime = 0
  gameState.doublePointsUntil = 0
  gameState.isRunning = true

  // Update UI
  document.getElementById('game-score').textContent = '0'
  document.getElementById('game-time').textContent = `${config.time}s`
  document.getElementById('game-combo').textContent = '-'
  document.getElementById('powerup-indicator').innerHTML = ''

  const startBtn = document.getElementById('start-game')
  if (startBtn) {
    startBtn.textContent = 'Playing...'
    startBtn.disabled = true
  }

  // Create fresh blocks with power-ups
  createBlocks()

  // Start timer
  gameState.timer = setInterval(() => {
    gameState.time--
    document.getElementById('game-time').textContent = `${gameState.time}s`

    if (gameState.time <= 0) {
      endGame()
    }
  }, 1000)
}

/**
 * End the game
 */
function endGame() {
  clearInterval(gameState.timer)
  gameState.isRunning = false

  // Check for new best
  const isNewBest = gameState.score > gameState.best
  if (isNewBest) {
    gameState.best = gameState.score
    localStorage.setItem('blockBreakerBest', gameState.best.toString())
    document.getElementById('game-best').textContent = gameState.best
  }

  // Update button
  const startBtn = document.getElementById('start-game')
  if (startBtn) {
    startBtn.textContent = 'Play Again'
    startBtn.disabled = false
  }

  // Show game over message
  showGameOverMessage(isNewBest)

  // Disable blocks
  document.querySelectorAll('.minigame-block').forEach(block => {
    block.style.pointerEvents = 'none'
  })
}

/**
 * Show game over message
 */
function showGameOverMessage(isNewBest) {
  const grid = document.getElementById('minigame-grid')
  if (!grid) return

  const overlay = document.createElement('div')
  overlay.className = 'game-over-overlay'
  overlay.innerHTML = `
    <div class="game-over-content">
      <h4>${isNewBest ? '🎉 New Best!' : 'Game Over!'}</h4>
      <p class="final-score">${gameState.score} points</p>
      <p class="player-name">${gameState.username || 'Player'}</p>
      ${isNewBest ? '<p class="share-hint">Share your score on Discord to be featured!</p>' : ''}
    </div>
  `

  grid.appendChild(overlay)
  setTimeout(() => overlay.remove(), 3000)
}

/**
 * Toggle leaderboard panel
 */
function toggleLeaderboard() {
  const panel = document.getElementById('leaderboard-panel')
  panel?.classList.toggle('hidden')
}

/**
 * Load leaderboard from JSON
 */
async function loadLeaderboard() {
  try {
    const response = await fetch('./data/leaderboard.json')
    if (response.ok) {
      gameState.leaderboard = await response.json()
      renderLeaderboard()
    }
  } catch (e) {
    // Use fallback data
    gameState.leaderboard = [
      { name: 'SalyVn', score: 150, difficulty: 'hard' },
      { name: 'Player1', score: 120, difficulty: 'medium' },
      { name: 'Gamer', score: 100, difficulty: 'easy' }
    ]
    renderLeaderboard()
  }
}

/**
 * Render leaderboard list
 */
function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list')
  if (!list) return

  if (gameState.leaderboard.length === 0) {
    list.innerHTML = '<p class="no-scores">No scores yet. Be the first!</p>'
    return
  }

  list.innerHTML = gameState.leaderboard
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((entry, i) => `
      <div class="leaderboard-entry ${i < 3 ? 'top-' + (i + 1) : ''}">
        <span class="rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}</span>
        <span class="name">${entry.name}</span>
        <span class="score">${entry.score}</span>
        <span class="diff">${entry.difficulty}</span>
      </div>
    `).join('')
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBlockBreaker)
} else {
  initBlockBreaker()
}
