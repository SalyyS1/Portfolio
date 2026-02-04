/**
 * Main entry point for SalyVn Portfolio
 * Initializes all components and sets up event listeners
 */
import './styles/main.css'
import './styles/global.css' /* Import our new global styles */
import './styles/animations.css'
import { initSkinViewer } from './components/skin-viewer.js'
import { renderProjects } from './components/projects.js'
import { initNavigation } from './components/navigation.js'
import { initThemeToggle } from './components/theme-toggle.js'
import { initAllAnimations } from './components/animations.js'
import { initLiveEditor } from './components/editor.js'
import { initSkills } from './components/skills.js'
import { initContact } from './components/contact.js'
import { initHero } from './components/hero.js'
import { initStatsCounter } from './components/stats-counter.js'

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initThemeToggle()
  initNavigation()
  initSkinViewer()
  renderProjects()

  // New "Pro Max" components
  initLiveEditor()
  initSkills()
  initContact()
  initHero()
  initStatsCounter()

  // Initialize all animations
  initAllAnimations()
})
