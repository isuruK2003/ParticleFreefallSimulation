function makeBall(id, x, y) {
    let ball = document.createElement("div");
    ball.id = id;
    ball.className = "ball";
    ball.style.left = x + "%";
    ball.style.bottom = y + "%";
    document.getElementsByClassName("container")[0].appendChild(ball);
}

function moveBall(id, dx, dy) {
    let ball = document.getElementById(id);

    let left = parseFloat(ball.style.left);
    let bottom = parseFloat(ball.style.bottom);

    ball.style.left = (left + dx) + "%";
    ball.style.bottom = (bottom + dy) + "%";
}

function updatePosition(id, vmax) {
    let vy = 0;
    let loss = 0.1;
    var ay = -0.1;

    function update() {
        let animationId = requestAnimationFrame(update);
        vy += ay;
        let ballBottom = parseFloat(document.getElementById(id).style.bottom);
        if (ballBottom <= 0) {
            vy = vmax;
            vmax -= loss;
        }
        if (vmax <= 0) {
            cancelAnimationFrame(animationId);
        }
        moveBall(id, 0, vy);        
    }
    update();
}

function move_with_delay(balls, vmax) {
    let i = 0;
    let id = setInterval(frame, 50);
    function frame() {
        if (i == balls.length) {
            clearInterval(id);
        } else {
            updatePosition(balls[i], vmax);
            i++;
        }
    }
}

function move_all_once(balls, vmax) {
    balls.forEach(ball => {
        updatePosition(ball, vmax);
    });
}

function move(balls, vmax) {
    move_with_delay(balls, vmax);
    // move_all_once(balls, vmax);
}

document.addEventListener("DOMContentLoaded", function() {
    var balls = [];

    for (let i = 0; i < 100; i += 2) {
        let x = Math.floor((Math.random() * 100));
        let y = Math.floor((Math.random() * 100));
        balls.push(`b${i}`);
        makeBall(`b${i}`, x, y);
    }

    document.getElementById("start").addEventListener("click", function() {
        move(balls, 4);
    });
});
