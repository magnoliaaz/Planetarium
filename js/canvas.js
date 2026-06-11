const canvas =
document.getElementById(
"starCanvas"
);

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

let stars = [];

/* Generate Stars */

for(let i = 0; i < 400; i++){

    stars.push({

        x:
        Math.random()
        * canvas.width,

        y:
        Math.random()
        * canvas.height,

        radius:
        Math.random() * 2

    });

}

/* Draw */

function drawStars(){

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    stars.forEach(star=>{

        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
        "white";

        ctx.fill();

    });

}

/* Animate */

function animate(){

    drawStars();

    stars.forEach(star=>{

        star.y += 0.5;

        if(
            star.y >
            canvas.height
        ){

            star.y = 0;

        }

    });

    requestAnimationFrame(
        animate
    );

}

animate();
