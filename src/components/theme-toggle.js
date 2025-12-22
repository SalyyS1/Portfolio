/**
 * Theme Toggle Component
 * Manages dark/light mode with localStorage persistence
 */

const THEME_KEY = 'salyvn-theme'
const DARK_CLASS = 'dark'

/**
 * Initialize theme toggle functionality
 */
export function initThemeToggle() {
  // Apply saved theme or default to dark
  const savedTheme = localStorage.getItem(THEME_KEY)

  if (savedTheme === 'light') {
    document.documentElement.classList.remove(DARK_CLASS)
  } else {
    document.documentElement.classList.add(DARK_CLASS)
  }

  // Setup toggle button
  const toggleBtn = document.getElementById('theme-toggle')
  if (toggleBtn) {
    updateToggleIcon(toggleBtn)
    toggleBtn.addEventListener('click', () => toggleTheme(toggleBtn))
  }
}

/**
 * Toggle between dark and light themes
 * @param {HTMLElement} toggleBtn - The toggle button element
 */
function toggleTheme(toggleBtn) {
  const isDark = document.documentElement.classList.toggle(DARK_CLASS)
  localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  updateToggleIcon(toggleBtn)
}

/**
 * Update the toggle button icon based on current theme
 * @param {HTMLElement} toggleBtn - The toggle button element
 */
function updateToggleIcon(toggleBtn) {
  const isDark = document.documentElement.classList.contains(DARK_CLASS)
  const sunIcon = toggleBtn.querySelector('.sun-icon')
  const moonIcon = toggleBtn.querySelector('.moon-icon')

  if (sunIcon && moonIcon) {
    sunIcon.classList.toggle('hidden', isDark)
    moonIcon.classList.toggle('hidden', !isDark)
  }
}
