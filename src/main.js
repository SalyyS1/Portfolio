/**
 * Main entry point for SalyVn Portfolio
 * Initializes all components and sets up event listeners
 */
import './styles/main.css'
import { initSkinViewer } from './components/skin-viewer.js'
import { renderProjects } from './components/projects.js'
import { initNavigation } from './components/navigation.js'
import { initThemeToggle } from './components/theme-toggle.js'

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle()
  initNavigation()
  initSkinViewer()
  renderProjects()
})
