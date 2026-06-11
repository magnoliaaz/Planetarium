/* =========================
   TAHAP 5 - ORBIT BERGERAK
========================= */

const planets = [

    {
        element: document.querySelector(".mercury"),
        radius: 75,
        angle: 0,
        speed: 0.03
    },

    {
        element: document.querySelector(".venus"),
        radius: 110,
        angle: 1,
        speed: 0.025
    },

    {
        element: document.querySelector(".earth"),
        radius: 150,
        angle: 2,
        speed: 0.02
    },

    {
        element: document.querySelector(".mars"),
        radius: 190,
        angle: 3,
        speed: 0.018
    },

    {
        element: document.querySelector(".jupiter"),
        radius: 235,
        angle: 4,
        speed: 0.015
    },

    {
        element: document.querySelector(".saturn"),
        radius: 280,
        angle: 5,
        speed: 0.012
    },

    {
        element: document.querySelector(".uranus"),
        radius: 325,
        angle: 6,
        speed: 0.010
    },

    {
        element: document.querySelector(".neptune"),
        radius: 370,
        angle: 7,
        speed: 0.008
    }

];

function animatePlanets(){

    planets.forEach(planet => {

        planet.angle += planet.speed;

        const orbit =
        planet.element.parentElement;

        const radius =
        orbit.offsetWidth / 2;

        const x =
        Math.cos(
            planet.angle
        ) * radius;

        const y =
        Math.sin(
            planet.angle
        ) * radius;

        planet.element.style.left =
        `${radius + x}px`;

        planet.element.style.top =
        `${radius + y}px`;

    });

    requestAnimationFrame(
        animatePlanets
    );

}

animatePlanets();

/* =========================
   TAHAP 6 & 7
   INTERAKTIF + INFO PLANET
========================= */

let planetData = [];

const planetCard =
document.getElementById(
    "planet-card"
);

fetch(
    "data/planets.json"
)

.then(response =>
    response.json()
)

.then(data => {

    planetData = data;

    console.log(
        "Data planet berhasil dimuat"
    );

    console.log(
        planetData
    );

})

.catch(error => {

    console.error(
        "Gagal memuat JSON:",
        error
    );

});

/* Event Klik Planet */

document
.querySelectorAll(".planet")
.forEach(planet => {

    planet.addEventListener(
        "click",

        function(){

            const selectedPlanet =
            this.dataset.planet;

            console.log(
                selectedPlanet
            );

            const data =
            planetData.find(

                planet =>
                planet.name ===
                selectedPlanet

            );

            if(data){

                planetCard.innerHTML =

                `
                <h2>${data.name}</h2>

                <hr>

                <p>
                    <strong>Diameter:</strong>
                    ${data.diameter}
                </p>

                <p>
                    <strong>Temperature:</strong>
                    ${data.temperature}
                </p>

                <p>
                    <strong>Gravity:</strong>
                    ${data.gravity}
                </p>

                <p>
                    <strong>Distance:</strong>
                    ${data.distance}
                </p>

                <p>
                    <strong>Satellites:</strong>
                    ${data.satellites}
                </p>

                <p>
                    ${data.description}
                </p>
                `;

            }

        }

    );

});