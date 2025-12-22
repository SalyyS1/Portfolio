/**
 * Projects Component
 * Renders project cards dynamically from project data
 * Uses textContent for XSS safety
 */

// Project data
const projects = [
  {
    name: 'Team Profile',
    type: 'Web',
    tools: ['HTML', 'CSS', 'JS'],
    description: 'A modern team profile page showcasing staff members and their roles.',
    image: '/assets/team-profile.jpg',
    demo: 'https://salyys1.github.io/staff/index.html',
    github: 'https://github.com/SalyyS1/staff'
  },
  {
    name: 'Profile',
    type: 'Web',
    tools: ['HTML', 'CSS', 'JS'],
    description: 'Profile same as my profile in guns.lol.',
    image: '/assets/profile.jpg',
    demo: 'https://salyys1.github.io/Yxchi/',
    github: 'https://github.com/SalyyS1/Yxchi'
  },
  {
    name: 'LandingPages Minecraft',
    type: 'Web',
    tools: ['HTML', 'CSS', 'JS'],
    description: 'Beautiful landing pages for Minecraft servers with modern design.',
    image: '/assets/landing-page.jpg',
    demo: 'https://salyys1.github.io/landingpages/',
    github: 'https://github.com/SalyyS1/landingpages'
  },
  {
    name: 'MMOItems Config – VSCode Extension',
    type: 'Tool',
    tools: ['VS Code', 'Extension', 'TS'],
    description: 'VSCode extension for MMOItems configuration with syntax highlighting.',
    image: '/assets/vscode-extension.jpg',
    demo: 'https://youtu.be/KO4AdPrv45M',
    github: null
  },
  {
    name: 'CultivationPath',
    type: 'Plugin',
    tools: ['Java', 'Minecraft'],
    description: 'Tu Tiên plugin for Minecraft with cultivation system and techniques.',
    image: '/assets/cultivation.jpg',
    demo: null,
    github: 'https://github.com/SalyyS1/CultivationPath'
  },
  {
    name: 'Upgrade Item Config',
    type: 'Config',
    tools: ['GooP', 'MythicMobs', 'MMOItems'],
    description: 'Advanced item upgrade system for GooP, Mythicmobs, and MMOItems.',
    image: '/assets/upgrade-config.jpg',
    demo: 'https://youtu.be/6cN4MspPBY4',
    github: null
  }
]

/**
 * Render projects to the grid container
 */
export function renderProjects() {
  const grid = document.getElementById('projectsGrid')

  if (!grid) {
    console.warn('Projects grid not found')
    return
  }

  projects.forEach(project => {
    const card = createProjectCard(project)
    grid.appendChild(card)
  })
}

/**
 * Create a project card element using safe DOM methods
 * @param {Object} project - Project data
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project) {
  const card = document.createElement('div')
  card.className = 'glass-card overflow-hidden group transition-all duration-300 hover:-translate-y-3'

  // Image container
  const imageContainer = document.createElement('div')
  imageContainer.className = 'relative overflow-hidden h-48'

  const img = document.createElement('img')
  img.src = project.image
  img.alt = project.name
  img.className = 'w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
  img.loading = 'lazy'

  const overlay = document.createElement('div')
  overlay.className = 'absolute inset-0 bg-gradient-to-t from-darker/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'

  imageContainer.appendChild(img)
  imageContainer.appendChild(overlay)

  // Content container
  const content = document.createElement('div')
  content.className = 'p-6'

  // Title - using textContent for XSS safety
  const title = document.createElement('h3')
  title.className = 'text-xl font-semibold text-light mb-2'
  title.textContent = project.name

  // Description - using textContent for XSS safety
  const description = document.createElement('p')
  description.className = 'text-gray-light text-sm mb-4'
  description.textContent = project.description

  // Tags container
  const tagsContainer = document.createElement('div')
  tagsContainer.className = 'flex flex-wrap gap-2 mb-4'

  project.tools.forEach(tool => {
    const tag = document.createElement('span')
    tag.className = 'px-2 py-1 text-xs bg-white/10 rounded border border-white/20'
    tag.textContent = tool // Safe: textContent
    tagsContainer.appendChild(tag)
  })

  // Links container
  const linksContainer = document.createElement('div')
  linksContainer.className = 'flex gap-3'

  if (project.demo) {
    const demoLink = document.createElement('a')
    demoLink.href = project.demo
    demoLink.target = '_blank'
    demoLink.rel = 'noopener noreferrer'
    demoLink.className = 'px-4 py-2 bg-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary hover:text-darker transition-all duration-300'
    demoLink.textContent = project.demo.includes('youtu.be') ? 'Watch Demo' : 'Live Demo'
    linksContainer.appendChild(demoLink)
  }

  if (project.github) {
    const githubLink = document.createElement('a')
    githubLink.href = project.github
    githubLink.target = '_blank'
    githubLink.rel = 'noopener noreferrer'
    githubLink.className = 'px-4 py-2 bg-white/10 text-light rounded-lg text-sm font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2'

    // GitHub icon (static SVG is safe)
    githubLink.innerHTML = `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>`

    const sourceText = document.createElement('span')
    sourceText.textContent = 'Source'
    githubLink.appendChild(sourceText)

    linksContainer.appendChild(githubLink)
  }

  // Assemble card
  content.appendChild(title)
  content.appendChild(description)
  content.appendChild(tagsContainer)
  content.appendChild(linksContainer)

  card.appendChild(imageContainer)
  card.appendChild(content)

  return card
}
