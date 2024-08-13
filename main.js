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
    var ay = -0.1 * (parseFloat(document.getElementById("gravity").value) / 50);

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
    // move_with_delay(balls, vmax);
    move_all_once(balls, vmax);
}

var balls = [];
var ball_count = 50

let ball_count_elem = document.getElementById("ball_count")
ball_count_elem.addEventListener("change", function() {
    ball_count = ball_count_elem.value;
    make_balls();
})

function make_balls() {
    document.getElementsByClassName("container")[0].innerHTML = "";
    balls = [];
    let start_position = document.getElementById("start_position").value;

    for (let i = 0; i < ball_count; i++) {
        let x = 4 * i;
        let y = i;

        if (start_position == "random") {
            x = Math.floor((Math.random() * 100));
            y = Math.floor((Math.random() * 100));
        }
        balls.push(`b${i}`);
        makeBall(`b${i}`, x, y);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("start").addEventListener("click", function() {
        move(balls, 4);
    });
    make_balls();
});
