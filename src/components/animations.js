/**
 * Animations Component
 * Handles scroll-triggered animations, hero load effects, and staggered reveals
 */

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
export function initScrollAnimations() {
  // Respect reduced motion preference
  if (prefersReducedMotion()) {
    document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-scale, .animate-fade')
      .forEach(el => el.classList.add('visible'))
    return
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px', // Trigger 50px before element enters
    threshold: 0.1
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target) // Animate only once
      }
    })
  }, observerOptions)

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll, .animate-slide-left, .animate-scale, .animate-fade')
    .forEach(el => observer.observe(el))
}

/**
 * Apply staggered animation delays to child elements
 * @param {string} containerSelector - CSS selector for parent container
 * @param {string} itemSelector - CSS selector for items to animate
 * @param {string} animationClass - Animation class to apply (default: animate-on-scroll)
 * @param {number} delayIncrement - Delay increment in ms (default: 100)
 */
export function initStaggeredAnimations(containerSelector, itemSelector, animationClass = 'animate-on-scroll', delayIncrement = 100) {
  const container = document.querySelector(containerSelector)
  if (!container) return

  const items = container.querySelectorAll(itemSelector)
  items.forEach((item, index) => {
    item.style.transitionDelay = `${index * delayIncrement}ms`
    item.classList.add(animationClass)
  })
}

/**
 * Initialize hero section load animation
 * Staggered fade-up effect for hero elements
 */
export function initHeroAnimation() {
  // Respect reduced motion
  if (prefersReducedMotion()) {
    document.querySelectorAll('.hero-animate')
      .forEach(el => el.classList.add('loaded'))
    return
  }

  const heroElements = document.querySelectorAll('.hero-animate')
  if (heroElements.length === 0) return

  // Trigger animation after short delay (let content load)
  setTimeout(() => {
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('loaded')
      }, index * 150)
    })
  }, 200)
}

/**
 * Initialize navbar scroll shadow effect
 */
export function initNavScrollEffect() {
  const navbar = document.querySelector('.navbar')
  if (!navbar) return

  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-scrolled')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
  }

  // Initial check
  handleScroll()

  // Listen for scroll with passive flag for performance
  window.addEventListener('scroll', handleScroll, { passive: true })
}

/**
 * Add animation classes to about section items
 */
export function initAboutAnimations() {
  // Experience items - slide from left
  initStaggeredAnimations('#about .glass-card:first-child', '.about-item', 'animate-slide-left', 100)

  // Skills cards - fade up
  initStaggeredAnimations('#about .glass-card:nth-child(2)', '.skill-card', 'animate-on-scroll', 150)

  // Achievements - slide from left
  initStaggeredAnimations('#about .glass-card:last-child', '.about-item', 'animate-slide-left', 100)
}

/**
 * Add animation classes to contact section cards
 */
export function initContactAnimations() {
  const contactCards = document.querySelectorAll('#contact .glass-card')
  contactCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`
    card.classList.add('animate-scale')
  })
}

/**
 * Initialize all animations
 * Call this from main.js after DOM content loaded
 */
export function initAllAnimations() {
  // Hero load animation
  initHeroAnimation()

  // Navbar scroll effect
  initNavScrollEffect()

  // Wait for dynamic content to render
  setTimeout(() => {
    // Project cards staggered reveal
    initStaggeredAnimations('#projectsGrid', '.project-card', 'animate-on-scroll', 100)

    // About section animations
    initAboutAnimations()

    // Contact section animations
    initContactAnimations()

    // Start observing all animated elements
    initScrollAnimations()
  }, 100)
}
