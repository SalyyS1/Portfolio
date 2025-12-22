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
  const menuButton = document.querySelector('.mobile-menu-btn')
  const navLinks = document.querySelector('.nav-links')

  if (!menuButton || !navLinks) return

  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('flex')

    if (isOpen) {
      navLinks.classList.remove('flex')
      navLinks.classList.add('hidden')
    } else {
      navLinks.classList.remove('hidden')
      navLinks.classList.add('flex')
    }

    // Toggle hamburger animation
    menuButton.classList.toggle('active')
  })

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        navLinks.classList.remove('flex')
        navLinks.classList.add('hidden')
        menuButton.classList.remove('active')
      }
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
  const navLinks = document.querySelectorAll('.nav-links a')

  if (sections.length === 0 || navLinks.length === 0) return

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id')

        navLinks.forEach(link => {
          link.classList.remove('text-primary')
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-primary')
          }
        })
      }
    })
  }, {
    rootMargin: '-50% 0px -50% 0px'
  })

  sections.forEach(section => observer.observe(section))
}
