import * as THREE from 'three';
import { gsap } from 'gsap';

export function initHero() {
    initThreeBackground();
    initGlitchText();
}

function initThreeBackground() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Create container for canvas if not exists
    let canvasContainer = document.getElementById('hero-canvas-container');
    if (!canvasContainer) {
        canvasContainer = document.createElement('div');
        canvasContainer.id = 'hero-canvas-container';
        canvasContainer.style.position = 'absolute';
        canvasContainer.style.top = '0';
        canvasContainer.style.left = '0';
        canvasContainer.style.width = '100%';
        canvasContainer.style.height = '100%';
        canvasContainer.style.zIndex = '-1';
        canvasContainer.style.overflow = 'hidden';
        heroSection.prepend(canvasContainer);
    }

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050511, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvasContainer.appendChild(renderer.domElement);

    // Particles - "Digital Dust"
    const geometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
        new THREE.Color('#00f2ff'), // Cyan
        new THREE.Color('#bd00ff'), // Purple
        new THREE.Color('#00ff9d')  // Green
    ];

    for (let i = 0; i < count * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 100; // x
        positions[i + 1] = (Math.random() - 0.5) * 100; // y
        positions[i + 2] = (Math.random() - 0.5) * 50; // z

        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Shader Material for glow effect
    const material = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Floating Geometries (optional "Minecraft blocks" abstract ref)
    const cubes = [];
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.1
    });

    for (let i = 0; i < 5; i++) {
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 20
        );
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        cube.scale.setScalar(Math.random() * 2 + 1);
        scene.add(cube);
        cubes.push(cube);
    }


    // Animation Loop
    let mouseX = 0;
    let mouseY = 0;

    // Mouse interaction
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Rotate particle system slowly
        points.rotation.y = elapsedTime * 0.05;
        points.rotation.x = elapsedTime * 0.02;

        // Mouse Parallax
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        // Animate cubes
        cubes.forEach((cube, i) => {
            cube.rotation.x += 0.01 * (i + 1) * 0.5;
            cube.rotation.y += 0.01 * (i + 1) * 0.5;
            cube.position.y += Math.sin(elapsedTime + i) * 0.02;
        });

        renderer.render(scene, camera);
    }

    animate();
}

function initGlitchText() {
    const title = document.querySelector('.hero h1');
    if (!title) return;

    const originalText = title.innerText;
    const glitchChars = '!<>-_\\/[]{}—=+*^?#________';

    // Add glitch class for CSS effects
    title.classList.add('glitch-effect');
    title.dataset.text = originalText;

    let iterations = 0;

    // Trigger glitch on hover
    title.addEventListener('mouseover', () => {
        let interval = setInterval(() => {
            title.innerText = title.innerText
                .split('')
                .map((letter, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
                iterations = 0;
            }

            iterations += 1 / 3;
        }, 30);
    });
}
