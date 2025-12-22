/**
 * Main entry point for SalyVn Portfolio
 * Initializes all components and sets up event listeners
 */
import './styles/main.css'
import './styles/animations.css'
import { initSkinViewer } from './components/skin-viewer.js'
import { renderProjects } from './components/projects.js'
import { initNavigation } from './components/navigation.js'
import { initThemeToggle } from './components/theme-toggle.js'
import { initAllAnimations } from './components/animations.js'

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Core functionality
  initThemeToggle()
  initNavigation()
  initSkinViewer()
  renderProjects()

  // Initialize all animations
  initAllAnimations()
})
