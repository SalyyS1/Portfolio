/**
 * Minecraft Skin Viewer Component
 * Renders 3D Minecraft skin using skinview3d library
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

  if (!canvas) {
    console.warn('Skin canvas not found')
    return
  }

  // Check if skinview3d library is loaded
  if (typeof skinview3d === 'undefined') {
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

  } catch (error) {
    console.error('Skin viewer initialization failed:', error)
    showSkinError('Error loading Minecraft skin')
  }
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
    desc.className = 'text-gray-light'
    desc.textContent = message // Safe: textContent

    errorDiv.appendChild(title)
    errorDiv.appendChild(desc)
    container.appendChild(errorDiv)
  }
}
