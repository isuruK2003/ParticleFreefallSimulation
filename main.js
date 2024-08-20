let particles = [];
let animationIds = [];

let particleBg = document.getElementById("particle-bg").value;
let particleCount = parseFloat(document.getElementById("particle-count").value);
let gravity = parseFloat(document.getElementById("gravity").value);
let restitution = parseFloat(document.getElementById("restitution").value);

function makeParticle(id, x, y) {
    const particle = document.createElement("div");
    particle.id = id;
    particle.classList.add("particle");
    particle.classList.add(particleBg);
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
    let ay = -0.1 * (gravity / 50);
    
    const particleElem = document.getElementById(id);
    const particleBottom = parseFloat(particleElem.style.bottom);
    let vmax = Math.sqrt(Math.abs(2 * ay * particleBottom)); // v = sqrt(2gh)
    
    function update() {
        const animationId = requestAnimationFrame(update);
        animationIds.push(animationId);
        vy += ay;
        const particleBottom = parseFloat(particleElem.style.bottom);

        if (particleBottom <= 0) {
            vy = vmax;
            vmax -= vmax * (restitution / 100);
        }
        if (vmax <= 0) {
            cancelAnimationFrame(animationId);
        }
        moveParticle(id, 0, vy);
    }

    update();
}

function move(particles) {
    updateControlsAbility(true);
    // move all particles at once
    particles.forEach(particle => {
        updatePosition(particle);
    });
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

    document.getElementById("particle-count-value").innerHTML = particleCount;
    document.getElementById("gravity-value").innerHTML = gravity;
    document.getElementById("restitution-value").innerHTML = restitution;

    document.getElementById("start").addEventListener("click", () => {
        if (animationIds.length == 0) {
            move(particles);
        }
    });

    document.getElementById("stop").addEventListener("click", () => {
        stopAnimations();
    });

    document.getElementById("rearrange").addEventListener("click", () => {
        rearrangeParticles();
    });

    document.getElementById("particle-count").addEventListener("change", () => {
        particleCount = parseFloat(document.getElementById("particle-count").value);
        document.getElementById("particle-count-value").innerHTML = particleCount;
        makeParticles();
    });

    document.getElementById("gravity").addEventListener("change", () => {
        gravity = parseFloat(document.getElementById("gravity").value);
        document.getElementById("gravity-value").innerHTML = gravity;
    });

    document.getElementById("restitution").addEventListener("change", () => {
        restitution = parseFloat(document.getElementById("restitution").value);
        document.getElementById("restitution-value").innerHTML = restitution;
    });

    document.getElementById("particle-bg").addEventListener("change", () => {
        particleBg = document.getElementById("particle-bg").value;
        for (let particleId of particles) {
            document.getElementById(particleId).classList = [];
            document.getElementById(particleId).classList.add("particle");
            document.getElementById(particleId).classList.add(particleBg);
        }
    });

    makeParticles();
});
