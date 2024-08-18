function makeParticle(id, x, y) {
    let particle = document.createElement("div");
    particle.id = id;
    particle.className = "particle";
    particle.style.left = x + "%";
    particle.style.bottom = y + "%";
    document.getElementsByClassName("container")[0].appendChild(particle);
}

function moveParticle(id, dx, dy) {
    let particle = document.getElementById(id);

    let left = parseFloat(particle.style.left);
    let bottom = parseFloat(particle.style.bottom);

    particle.style.left = (left + dx) + "%";
    particle.style.bottom = (bottom + dy) + "%";
}

function updatePosition(id, vmax) {
    let vy = 0;
    let loss = 0.1;
    var ay = -0.1 * (parseFloat(document.getElementById("gravity").value) / 50);

    function update() {
        let animationId = requestAnimationFrame(update);
        vy += ay;
        let particleBottom = parseFloat(document.getElementById(id).style.bottom);
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

function move_with_delay(particles, vmax) {
    let i = 0;
    let id = setInterval(frame, 50);
    function frame() {
        if (i == particles.length) {
            clearInterval(id);
        } else {
            updatePosition(particles[i], vmax);
            i++;
        }
    }
}

function move_all_once(particles, vmax) {
    particles.forEach(particle => {
        updatePosition(particle, vmax);
    });
}

function move(particles, vmax) {
    // move_with_delay(particles, vmax);
    move_all_once(particles, vmax);
}

var particles = [];
var particle_count = 50

let particle_count_elem = document.getElementById("particle_count")
particle_count_elem.addEventListener("change", function () {
    particle_count = particle_count_elem.value;
    make_particles();
})

function make_particles() {
    document.getElementsByClassName("container")[0].innerHTML = "";
    particles = [];
    let start_position = document.getElementById("start_position").value;

    for (let i = 0; i < particle_count; i++) {
        let x = 4 * i;
        let y = i;

        if (start_position == "random") {
            x = Math.floor((Math.random() * 100));
            y = Math.floor((Math.random() * 100));
        }
        particles.push(`b${i}`);
        makeParticle(`b${i}`, x, y);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("start").addEventListener("click", function () {
        move(particles, 4);
    });
    make_particles();
});
