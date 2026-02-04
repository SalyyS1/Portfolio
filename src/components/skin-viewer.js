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
  zoom: 0.8,
  // mc-heads.net supports CORS headers for canvas usage
  skinUrl: 'https://mc-heads.net/skin/9b6ebdbbd92041faa61721ddc6658708'
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

  try {
    const viewer = new skinview3d.SkinViewer({
      canvas,
      width: SKIN_CONFIG.width,
      height: SKIN_CONFIG.height,
      skin: SKIN_CONFIG.skinUrl,
      panorama: 'https://raw.githubusercontent.com/nickyvanurk/3d-minecraft-model-viewer/main/textures/panorama.png'
    })

    // Configure controls
    viewer.controls.enableRotate = true
    viewer.controls.enableZoom = true
    viewer.controls.enablePan = false
    viewer.zoom = SKIN_CONFIG.zoom

    // Realistic idle animation with natural gestures
    let time = 0
    let wavePhase = 0

    const animate = () => {
      time += 0.016 // ~60fps timing
      wavePhase += 0.02

      if (viewer.playerObject && viewer.playerObject.skin) {
        const skin = viewer.playerObject.skin

        // Natural breathing effect on body (slow rhythm)
        const breathe = Math.sin(time * 1.2) * 0.015

        // Left arm waves with natural pauses
        if (skin.leftArm) {
          // Wave pattern with occasional pause
          const waveSpeed = 1.2
          const waveAmount = 0.3 + Math.sin(time * 0.3) * 0.1 // Varying intensity
          skin.leftArm.rotation.x = -2.4 + breathe * 2
          skin.leftArm.rotation.z = Math.sin(wavePhase * waveSpeed) * waveAmount
        }

        // Right arm relaxed sword-holding position with micro-movements
        if (skin.rightArm) {
          skin.rightArm.rotation.x = -0.35 + Math.sin(time * 0.5) * 0.02
          skin.rightArm.rotation.z = 0.12 + Math.sin(time * 0.7) * 0.02
        }

        // Body breathing + subtle weight shift
        if (skin.body) {
          skin.body.rotation.y = Math.sin(time * 0.4) * 0.025
          skin.body.rotation.z = Math.sin(time * 0.3) * 0.008
          skin.body.rotation.x = breathe // Breathing forward/back
        }

        // Head - natural look around + nodding + reaction to wave
        if (skin.head) {
          // Occasional glance direction changes
          const lookY = Math.sin(time * 0.35) * 0.12 + Math.sin(time * 0.9) * 0.05
          const lookX = Math.sin(time * 0.25) * 0.06 + breathe
          skin.head.rotation.y = lookY
          skin.head.rotation.x = lookX
          // Subtle head tilt
          skin.head.rotation.z = Math.sin(time * 0.2) * 0.03
        }

        // Legs - relaxed stance with weight shifting
        if (skin.leftLeg) {
          skin.leftLeg.rotation.z = 0.08 // Spread outward
          skin.leftLeg.rotation.x = Math.sin(time * 0.4) * 0.02
          skin.leftLeg.rotation.y = Math.sin(time * 0.25) * 0.01
        }
        if (skin.rightLeg) {
          skin.rightLeg.rotation.z = -0.08 // Spread outward  
          skin.rightLeg.rotation.x = Math.sin(time * 0.4 + Math.PI) * 0.02
          skin.rightLeg.rotation.y = Math.sin(time * 0.25 + Math.PI) * 0.01
        }
      }
      requestAnimationFrame(animate)
    }
    animate()

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
