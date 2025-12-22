// Projects data
const projects = [
    {
        name: "Team Profile",
        type: "Web",
        tools: ["HTML", "CSS", "JS"],
        description: "A modern team profile page showcasing staff members and their roles.",
        image: "assets/team-profile.jpg",
        demo: "https://salyys1.github.io/staff/index.html",
        github: "https://github.com/SalyyS1/staff"
    },
    {
        name: "Profile",
        type: "Web",
        tools: ["HTML", "CSS", "JS"],
        description: "Profile same as my profile in guns.lol.",
        image: "assets/profile.jpg",
        demo: "https://salyys1.github.io/Yxchi/",
        github: "https://github.com/SalyyS1/Yxchi"
    },
    {
        name: "LandingPages Minecraft",
        type: "Web",
        tools: ["HTML", "CSS", "JS"],
        description: "Beautiful landing pages for Minecraft servers with modern design.",
        image: "assets/landing-page.jpg",
        demo: "https://salyys1.github.io/landingpages/",
        github: "https://github.com/SalyyS1/landingpages"
    },
    {
        name: "MMOItems Config – VSCode Extension",
        type: "Tool",
        tools: ["VS Code", "Extension","TS"],
        description: "VSCode extension for MMOItems configuration with syntax highlighting.",
        image: "assets/vscode-extension.jpg",
        demo: "https://youtu.be/KO4AdPrv45M",
        github: "null"
    },
    {
        name: "CultivationPath",
        type: "Plugin",
        tools: ["Java", "Minecraft"],
        description: "Tu Tiên plugin for Minecraft with cultivation system and techniques.",
        image: "assets/cultivation.jpg",
        demo: null,
        github: "https://github.com/SalyyS1/CultivationPath"
    },
    {
        name: "Upgrade Item Config",
        type: "Config",
        tools: ["GooP", "MythicMobs", "MMOItems"],
        description: "Advanced item upgrade system for GooP, Mythicmobs, and MMOItems.",
        image: "assets/upgrade-config.jpg",
        demo: "https://youtu.be/6cN4MspPBY4",
        github: null
    }
];

// Skin data
const skinData = {
    salyvn: {
        uuid: "9b6ebdbbd92041faa61721ddc6658708",
        name: "SalyVn",
        // mc-heads.net supports CORS headers for canvas usage
        skinUrl: "https://mc-heads.net/skin/9b6ebdbbd92041faa61721ddc6658708"
    }
};

// Initialize the page
window.onload = () => {
    initializeCodeCopy();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeSkinViewer();
    renderProjects();
};

// Code copy functionality
function initializeCodeCopy() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.parentElement.querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent);

            const originalText = button.textContent;
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = originalText;
            }, 2000);
        });
    });
}

// Mobile menu
function initializeMobileMenu() {
    const menuButton = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    menuButton.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth scroll
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skin viewer initialization
function initializeSkinViewer() {

    if (typeof skinview3d === "undefined") {
        const skinContainer = document.querySelector(".minecraft-skin");
        if (skinContainer) {
             skinContainer.innerHTML = `
                <div class="skin-error">
                     <h3>Error Loading Skin</h3>
                     <p>Cannot load skinview3d library. Please check network connection or refresh page.</p>
                 </div>
             `;
        }
        return;
    }

    const canvas = document.getElementById("skin-canvas");
    if (!canvas) {
        return;
    }

    const info = skinData.salyvn;
    const skinIdentifier = info.uuid;
    if (!skinIdentifier) {
         return;
    }

    const skinUrl = info.skinUrl;

    try {
        const viewer = new skinview3d.SkinViewer({
            canvas: canvas,
            width: 300,
            height: 400,
            skin: skinUrl,
            background: null,
        });

        viewer.controls.enableRotate = true;
        viewer.controls.enableZoom = true;
        viewer.controls.enablePan = false;
        viewer.zoom = 0.8;

        if (skinview3d.WalkingAnimation) {
            viewer.animation = new skinview3d.WalkingAnimation();
            viewer.animation.speed = 1;
            viewer.animation.play();
        }

    } catch (error) {

        const ctx = canvas.getContext("2d");
        if (ctx) {
            try {
                ctx.fillStyle = "rgba(0,0,0,0.7)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = "orange";
                ctx.font = "16px Poppins";
                ctx.textAlign = "center";
                ctx.fillText("Error Loading Skin", canvas.width / 2, canvas.height / 2 - 10);
                ctx.font = "12px Poppins";
                ctx.fillText("(Check UUID)", canvas.width / 2, canvas.height / 2 + 10);
            } catch (e) {
            }
        }
    }
}

function copyDiscord() {
    const discordId = 'salyy.0105';
    navigator.clipboard.writeText(discordId).then(() => {
        alert('Discord ID copied to clipboard!');
    }).catch(err => {
    });
}

// Render projects from data
function renderProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        // Create tags HTML
        const tagsHTML = project.tools.map(tool => `<span class="project-tag">${tool}</span>`).join('');

        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.name}">
            <div class="project-info">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${tagsHTML}
                </div>
                <div class="project-links">
                    ${project.demo ? `<a href="${project.demo}" target="_blank" class="demo-link">${project.demo.includes('youtu.be') ? 'Watch Demo' : 'Live Demo'}</a>` : ''}
                    ${project.github ? `<a href="${project.github}" target="_blank" class="github-link"><i class="bi bi-github"></i> Source Code</a>` : ''}
                    ${project.type === 'Web' && !project.github ? `<a href="https://github.com/SalyyS1/${project.name.toLowerCase().replace(/\s+/g, '-')}" target="_blank" class="github-link"><i class="bi bi-github"></i> Source Code</a>` : ''}
                </div>
            </div>
        `;

        projectsGrid.appendChild(projectCard);
    });
}
