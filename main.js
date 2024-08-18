let particles = [];
let particleCount = 50;
let animationIds = [];

const particleCountElem = document.getElementById("particle_count");

particleCountElem.addEventListener("change", () => {
    particleCount = particleCountElem.value;
    makeParticles();
});

function makeParticle(id, x, y) {
    const particle = document.createElement("div");
    particle.id = id;
    particle.className = "particle";
    particle.style.left = `${x}%`;
    particle.style.bottom = `${y}%`;
    document.querySelector(".container").appendChild(particle);
}

function moveParticle(id, dx, dy) {
    const particle = document.getElementById(id);
    const left = parseFloat(particle.style.left);
    const bottom = parseFloat(particle.style.bottom);

    particle.style.left = `${left + dx}%`;
    particle.style.bottom = `${bottom + dy}%`;
}

function updatePosition(id) {
    let vy = 0;
    const loss = 0.1;
    const ay = -0.1 * (parseFloat(document.getElementById("gravity").value) / 50);

    const particleElem = document.getElementById(id);
    const particleBottom = parseFloat(particleElem.style.bottom);
    let vmax = Math.sqrt(Math.abs(2 * ay * particleBottom));

    function update() {
        const animationId = requestAnimationFrame(update);
        animationIds.push(animationId);
        vy += ay;
        const particleBottom = parseFloat(particleElem.style.bottom);

        if (particleBottom <= 0) {
            vy = vmax;
            vmax -= loss;
        }
        if (vmax <= 0) {
            cancelAnimationFrame(animationId);
        }
        moveParticle(id, 0, vy);
    }

    update();
}

function moveAllOnce(particles) {
    particles.forEach(particle => {
        updatePosition(particle);
    });
}

function move(particles) {
    updateControlsAbility(true); // Disable controls when the animation starts
    moveAllOnce(particles);
}

function makeParticles() {
    document.querySelector(".container").innerHTML = "";
    particles = [];

    for (let i = 0; i < particleCount; i++) {
        const x = Math.floor(Math.random() * 100);
        const y = Math.floor(Math.random() * 100);

        particles.push(`b${i}`);
        makeParticle(`b${i}`, x, y);
    }
}

function stopAnimations() {
    animationIds.forEach(id => cancelAnimationFrame(id));
    animationIds = [];
    updateControlsAbility(false); // Enable controls when the animation stops
}

function rearrangeParticles() {
    stopAnimations();
    makeParticles();
}

function updateControlsAbility(disable) {
    let controls = document.getElementsByTagName("input");
    for (let control of controls) {
        if (control.type !== "range") {
            continue;
        }
        control.disabled = disable;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("start").addEventListener("click", () => {
        move(particles);
    });

    document.getElementById("stop").addEventListener("click", () => {
        stopAnimations();
    });

    document.getElementById("rearrange").addEventListener("click", () => {
        rearrangeParticles();
    });

    makeParticles();
});
