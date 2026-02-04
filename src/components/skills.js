/**
 * Skills Component - Dev Style with Code Editor + Animated Progress Bars
 * Shows code being typed and progress bars animate as code appears
 */

export function initSkills() {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const skillsData = [
    { name: 'Java', level: 65, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'JavaScript', level: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'TypeScript', level: 45, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'React', level: 50, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', level: 55, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'MySQL', level: 50, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'Git', level: 60, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Docker', level: 35, icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  ];

  container.innerHTML = `
        <div class="skills-dev-layout">
            <!-- Left: Code Editor -->
            <div class="skills-code-editor glass-card animate-on-scroll">
                <div class="window-header">
                    <div class="window-controls">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <div class="window-title">skills.config.ts — VS Code</div>
                </div>
                <div class="code-area single-pane skills-code-area">
                    <div class="line-numbers" id="skills-line-numbers"></div>
                    <div class="code-content" id="skills-code"></div>
                </div>
            </div>
            
            <!-- Right: Skill Bars with Icons -->
            <div class="skills-bars-panel glass-card animate-on-scroll" style="transition-delay: 0.1s">
                <h3 class="skills-panel-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="skills-title-icon">
                        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                        <path d="M2 17l10 5 10-5"/>
                        <path d="M2 12l10 5 10-5"/>
                    </svg>
                    Skill Proficiency
                </h3>
                <div class="skills-list" id="skills-list">
                    ${skillsData.map((skill, i) => `
                        <div class="skill-row" data-index="${i}">
                            <div class="skill-info">
                                <div class="skill-name-with-icon">
                                    <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                                    <span class="skill-name">${skill.name}</span>
                                </div>
                                <span class="skill-percent">0%</span>
                            </div>
                            <div class="skill-bar">
                                <div class="skill-bar-fill" data-level="${skill.level}"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

  // Code content to type
  const codeContent = `interface Skill {
  name: string;
  level: number;
  icon: string;
}

const skills: Skill[] = [
  { name: "Java", level: 65, icon: "java" },
  { name: "JavaScript", level: 60, icon: "js" },
  { name: "TypeScript", level: 45, icon: "ts" },
  { name: "React", level: 50, icon: "react" },
  { name: "Node.js", level: 55, icon: "node" },
  { name: "MySQL", level: 50, icon: "mysql" },
  { name: "Git", level: 60, icon: "git" },
  { name: "Docker", level: 35, icon: "docker" },
];

export const getSkillByName = (name: string) => {
  return skills.find(s => s.name === name);
};`;

  // Start typing animation
  animateSkillsCode(codeContent, skillsData);
  observeScrollAnimation();
}

function animateSkillsCode(code, skillsData) {
  const codeElement = document.getElementById('skills-code');
  const lineNumbers = document.getElementById('skills-line-numbers');
  if (!codeElement) return;

  // Reset all bars to 0% first
  document.querySelectorAll('.skill-bar-fill').forEach(fill => {
    fill.style.width = '0%';
  });
  document.querySelectorAll('.skill-percent').forEach(percent => {
    percent.textContent = '0%';
  });

  let charIndex = 0;
  let currentSkillIndex = -1;
  const lines = code.split('\n');

  // Lines where each skill appears in code
  const skillLines = [7, 8, 9, 10, 11, 12, 13, 14];

  function updateLineNumbers() {
    const lineCount = (codeElement.innerHTML.match(/<br>/g) || []).length + 1;
    let numbers = '';
    for (let i = 1; i <= Math.max(lineCount, lines.length); i++) {
      numbers += `<span>${i}</span>`;
    }
    lineNumbers.innerHTML = numbers;
  }

  function animateSkillBar(index) {
    const row = document.querySelector(`.skill-row[data-index="${index}"]`);
    if (!row) return;

    const fill = row.querySelector('.skill-bar-fill');
    const percent = row.querySelector('.skill-percent');
    const level = parseInt(fill.dataset.level);

    // Reset to 0
    fill.style.width = '0%';

    // Animate both bar and percentage with JavaScript
    const duration = 800;
    const startTime = performance.now();

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const currentValue = Math.round(level * eased);

      // Update both bar width and percentage
      fill.style.width = currentValue + '%';
      percent.textContent = currentValue + '%';

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function type() {
    if (charIndex < code.length) {
      codeElement.innerHTML = syntaxHighlight(code.substring(0, charIndex + 1)) + '<span class="cursor"></span>';
      updateLineNumbers();

      // Check if we've typed to a skill line
      const currentLine = (code.substring(0, charIndex).match(/\n/g) || []).length;
      const skillLineIndex = skillLines.indexOf(currentLine);
      if (skillLineIndex !== -1 && skillLineIndex > currentSkillIndex) {
        currentSkillIndex = skillLineIndex;
        animateSkillBar(skillLineIndex);
      }

      charIndex++;
      const char = code[charIndex - 1];
      const delay = char === '\n' ? 25 : (Math.random() * 10 + 5);
      setTimeout(type, delay);
    } else {
      codeElement.innerHTML = syntaxHighlight(code);
      updateLineNumbers();

      // Make sure all bars are animated
      skillsData.forEach((_, i) => {
        if (i > currentSkillIndex) {
          setTimeout(() => animateSkillBar(i), i * 80);
        }
      });
    }
  }

  // Start with observer - only animate when user scrolls to this section
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(type, 500);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-100px 0px'  // Only trigger when 100px inside viewport
  });

  const container = document.querySelector('.skills-dev-layout');
  if (container) {
    observer.observe(container);
  }
}

function syntaxHighlight(code) {
  return code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(interface|const|export|return)/g, '<span class="keyword">$1</span>')
    .replace(/(".*?")/g, '<span class="string">$1</span>')
    .replace(/: (\d+)/g, ': <span class="number">$1</span>')
    .replace(/(Skill|string|number)/g, '<span class="type">$1</span>')
    .replace(/(name|level|icon):/g, '<span class="property">$1</span>:')
    .replace(/\n/g, '<br>');
}

function observeScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('#skills-container .animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}
