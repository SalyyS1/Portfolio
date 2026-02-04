import { gsap } from 'gsap';

export function initLiveEditor() {
    const editorContainer = document.querySelector('#about-editor');
    if (!editorContainer) return;

    // Layout: 3 Cards on LEFT + Code Editor on RIGHT showing card code
    editorContainer.innerHTML = `
        <div class="about-combined-layout">
            <!-- Left Side: Three Cards -->
            <div class="about-cards-column">
                <div class="about-card glass-card animate-on-scroll">
                    <div class="about-card-header">
                        <svg class="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22,4 12,14.01 9,11.01"/>
                        </svg>
                        <h3>Experience</h3>
                    </div>
                    <ul class="about-card-list">
                        <li>4+ years of server administration across various roles</li>
                        <li>2 years managing and growing StellaStudio</li>
                        <li>Creator of the MMOItems VSCode extension</li>
                    </ul>
                </div>
                
                <div class="about-card glass-card animate-on-scroll" style="transition-delay: 0.1s">
                    <div class="about-card-header">
                        <svg class="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                        </svg>
                        <h3>Core Focus</h3>
                    </div>
                    <ul class="about-card-list">
                        <li>Building responsive web interfaces with modern frameworks</li>
                        <li>Developing custom Minecraft plugins (Spigot/Paper)</li>
                        <li>Growing and managing gaming communities</li>
                    </ul>
                </div>
                
                <div class="about-card glass-card animate-on-scroll" style="transition-delay: 0.2s">
                    <div class="about-card-header">
                        <svg class="about-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
                            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                            <path d="M4 22h16"/>
                            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                        </svg>
                        <h3>Achievements</h3>
                    </div>
                    <ul class="about-card-list">
                        <li>Founded StellaStudio with 10+ staff professional</li>
                        <li>Built a community of 1.0k+ members in Discord</li>
                        <li>200+ servers use our products</li>
                    </ul>
                </div>
            </div>
            
            <!-- Right Side: Code Editor showing card code -->
            <div class="live-editor-wrapper glass-card animate-on-scroll" style="transition-delay: 0.15s">
                <div class="window-header">
                    <div class="window-controls">
                        <span class="dot red"></span>
                        <span class="dot yellow"></span>
                        <span class="dot green"></span>
                    </div>
                    <div class="window-title">AboutCards.jsx — Visual Studio Code</div>
                </div>
                <div class="code-area single-pane">
                    <div class="line-numbers"></div>
                    <div class="code-content" id="jsx-code"></div>
                </div>
            </div>
        </div>
    `;

    // JSX/HTML code that creates the cards
    const jsxContent = `const AboutCards = () => {
  return (
    <div className="cards-grid">
      <Card icon="✓" title="Experience">
        <li>4+ years server admin</li>
        <li>2 years at StellaStudio</li>
        <li>VSCode extension creator</li>
      </Card>
      
      <Card icon="★" title="Core Focus">
        <li>Web development</li>
        <li>Minecraft plugins</li>
        <li>Community building</li>
      </Card>
      
      <Card icon="🏆" title="Achievements">
        <li>10+ staff team</li>
        <li>1.0k+ Discord members</li>
        <li>200+ servers using products</li>
      </Card>
    </div>
  );
};

export default AboutCards;`;

    // Start Typing Animation
    typeCode('#jsx-code', jsxContent, 'jsx');
    observeScrollAnimation();
}

function typeCode(selector, code, language) {
    const codeElement = document.querySelector(selector);
    const lineNumbersElement = codeElement?.previousElementSibling;
    if (!codeElement) return;

    let charIndex = 0;
    const lines = code.split('\n');

    function updateLineNumbers() {
        const lineCount = (codeElement.innerHTML.match(/<br>/g) || []).length + 1;
        let numbers = '';
        for (let i = 1; i <= Math.max(lineCount, lines.length); i++) {
            numbers += `<span>${i}</span>`;
        }
        if (lineNumbersElement) {
            lineNumbersElement.innerHTML = numbers;
        }
    }

    function type() {
        if (charIndex < code.length) {
            const char = code[charIndex];
            codeElement.innerHTML = syntaxHighlight(code.substring(0, charIndex + 1), language) + '<span class="cursor"></span>';
            updateLineNumbers();
            charIndex++;

            const delay = char === '\n' ? 40 : (Math.random() * 15 + 8);
            setTimeout(type, delay);
        } else {
            codeElement.innerHTML = syntaxHighlight(code, language);
            updateLineNumbers();
        }
    }

    setTimeout(type, 500);
}

function syntaxHighlight(code, language) {
    return code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/(const|return|export|default)/g, '<span class="keyword">$1</span>')
        .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
        .replace(/(&lt;\/?[A-Z]\w*)/g, '<span class="component">$1</span>')
        .replace(/(className|icon|title)=/g, '<span class="property">$1</span>=')
        .replace(/\/\/.*/g, '<span class="comment">$&</span>')
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

    document.querySelectorAll('#about-editor .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}
