/**
 * Minecraft Skin Viewer Component
 * Renders 3D Minecraft skin using skinview3d library
 * Includes loading state animation
 */

// Skin configuration
const SKIN_CONFIG = {
  uuid: '9b6ebdbbd92041faa61721ddc6658708',
  name: 'SalyVn',
  width: 300,
  height: 400,
  zoom: 0.8
}

/**
 * Initialize the skin viewer on the canvas element
 */
export function initSkinViewer() {
  const canvas = document.getElementById('skin-canvas')
  const container = canvas?.closest('.glass-card')

  if (!canvas) {
    console.warn('Skin canvas not found')
    return
  }

  // Show loading state
  let loader = null
  if (container) {
    container.style.position = 'relative'
    loader = createLoader()
    container.appendChild(loader)
  }

  // Check if skinview3d library is loaded
  if (typeof skinview3d === 'undefined') {
    removeLoader(loader)
    showSkinError('Cannot load skinview3d library')
    return
  }

  const skinUrl = `https://crafatar.com/skins/${SKIN_CONFIG.uuid}`

  try {
    const viewer = new skinview3d.SkinViewer({
      canvas,
      width: SKIN_CONFIG.width,
      height: SKIN_CONFIG.height,
      skin: skinUrl,
      background: null
    })

    // Configure controls
    viewer.controls.enableRotate = true
    viewer.controls.enableZoom = true
    viewer.controls.enablePan = false
    viewer.zoom = SKIN_CONFIG.zoom

    // Add walking animation if available
    if (skinview3d.WalkingAnimation) {
      viewer.animation = new skinview3d.WalkingAnimation()
      viewer.animation.speed = 1
    }

    // Remove loader after skin loads
    setTimeout(() => removeLoader(loader), 800)

  } catch (error) {
    console.error('Skin viewer initialization failed:', error)
    removeLoader(loader)
    showSkinError('Error loading Minecraft skin')
  }
}

/**
 * Create loading spinner element
 * @returns {HTMLElement}
 */
function createLoader() {
  const loader = document.createElement('div')
  loader.className = 'skin-loader absolute inset-0 flex items-center justify-center bg-surface-dark/50 z-20'

  const spinner = document.createElement('div')
  spinner.className = 'w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin'

  loader.appendChild(spinner)
  return loader
}

/**
 * Remove loader with fade out animation
 * @param {HTMLElement|null} loader
 */
function removeLoader(loader) {
  if (!loader) return

  loader.style.opacity = '0'
  setTimeout(() => loader.remove(), 300)
}

/**
 * Display error message when skin fails to load
 * Uses safe DOM methods to prevent XSS
 * @param {string} message - Error message to display
 */
function showSkinError(message) {
  const container = document.querySelector('.minecraft-skin')

  if (container) {
    // Clear existing content
    container.innerHTML = ''

    // Create error container
    const errorDiv = document.createElement('div')
    errorDiv.className = 'text-center p-8'

    const title = document.createElement('h3')
    title.className = 'text-xl mb-2 text-primary'
    title.textContent = 'Error Loading Skin'

    const desc = document.createElement('p')
    desc.className = 'text-text-secondary'
    desc.textContent = message // Safe: textContent

    errorDiv.appendChild(title)
    errorDiv.appendChild(desc)
    container.appendChild(errorDiv)
  }
}
