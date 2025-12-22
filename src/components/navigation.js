/**
 * Navigation Component
 * Handles mobile menu, smooth scrolling, and active link states
 */

/**
 * Initialize navigation functionality
 */
export function initNavigation() {
  initMobileMenu()
  initSmoothScroll()
  initActiveLinks()
}

/**
 * Initialize mobile hamburger menu toggle
 */
function initMobileMenu() {
  const menuButton = document.getElementById('mobile-menu-btn')
  const mobileMenu = document.getElementById('mobile-menu')
  const hamburgerIcon = menuButton?.querySelector('.hamburger-icon')
  const closeIcon = menuButton?.querySelector('.close-icon')

  if (!menuButton || !mobileMenu) return

  menuButton.addEventListener('click', () => {
    const isOpen = !mobileMenu.classList.contains('hidden')

    if (isOpen) {
      mobileMenu.classList.add('hidden')
      hamburgerIcon?.classList.remove('hidden')
      closeIcon?.classList.add('hidden')
    } else {
      mobileMenu.classList.remove('hidden')
      hamburgerIcon?.classList.add('hidden')
      closeIcon?.classList.remove('hidden')
    }
  })

  // Close menu when clicking a link
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      hamburgerIcon?.classList.remove('hidden')
      closeIcon?.classList.add('hidden')
    })
  })
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault()
      const targetId = anchor.getAttribute('href')
      const target = document.querySelector(targetId)

      if (target) {
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0
        const targetPosition = target.offsetTop - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })
      }
    })
  })
}

/**
 * Highlight active navigation link based on scroll position
 */
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]')
  const desktopNavLinks = document.querySelectorAll('.nav-link')
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')

  if (sections.length === 0) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')

        // Update desktop nav
        desktopNavLinks.forEach(link => {
          link.classList.remove('text-primary')
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary')
          }
        })

        // Update mobile nav
        mobileNavLinks.forEach(link => {
          link.classList.remove('text-primary', 'bg-primary/10')
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary', 'bg-primary/10')
          }
        })
      }
    })
  }, {
    rootMargin: '-50% 0px -50% 0px'
  })

  sections.forEach(section => observer.observe(section))
}
