/* =======================================
   TAHAP 6 & 7 - FETCH JSON + INTERAKTIF ZOOM
======================================= */
let lastScrollPosition = 0;
let isOrbitPaused = false;

const planets = [
    { element: document.querySelector(".mercury"), radius: 75, angle: 0, speed: 0.010 },
    { element: document.querySelector(".venus"), radius: 110, angle: 0.8, speed: 0.008 },
    { element: document.querySelector(".earth"), radius: 150, angle: 2.1, speed: 0.006 },
    { element: document.querySelector(".mars"), radius: 190, angle: 3.4, speed: 0.005 },
    { element: document.querySelector(".jupiter"), radius: 235, angle: 4.7, speed: 0.004 },
    { element: document.querySelector(".saturn"), radius: 280, angle: 1.5, speed: 0.003 },
    { element: document.querySelector(".uranus"), radius: 325, angle: 5.5, speed: 0.002 },
    { element: document.querySelector(".neptune"), radius: 370, angle: 2.8, speed: 0.001 }
];

function animatePlanets() {
    if (!isOrbitPaused) {

        planets.forEach(planet => {

            if (!planet.element) return;

            planet.angle += planet.speed;

            const orbit = planet.element.parentElement;
            const radius = orbit.offsetWidth / 2;

            const x = Math.cos(planet.angle) * radius;
            const y = Math.sin(planet.angle) * radius;

            planet.element.style.left = (radius + x) + "px";
            planet.element.style.top = (radius + y) + "px";

        });
    }

    requestAnimationFrame(animatePlanets);
}

animatePlanets();

let planetData = [];
const sidePlanetCard = document.getElementById("side-planet-card");
const initialInstruction = document.getElementById("initial-instruction");
const btnResume = document.getElementById("btn-resume");
const solarContainer = document.getElementById("solar-container");

fetch("data/planets.json")
    .then(response => response.json())
    .then(data => {
        planetData = data;
    })
    .catch(error => console.error("Gagal memuat JSON:", error));

/* Event Click pada Planet & Matahari */
document.querySelectorAll(".planet, .sun").forEach(planet => {
    planet.addEventListener("click", function () {

        const selectedPlanet = this.dataset.planet;
        const data = planetData.find(p => p.name === selectedPlanet);

       if (data) {

    isOrbitPaused = true;

    lastScrollPosition = window.scrollY;

document.body.classList.add("focus-planet-mode");

    document.getElementById("planet-info-section")
    .scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
            solarContainer.classList.add("zoom-mode");

            document.querySelectorAll(".planet, .sun").forEach(p => {
                p.classList.add("inactive-planet");
            });

            this.classList.remove("inactive-planet");
            this.classList.add("active-highlight");

            initialInstruction.classList.add("d-none");
            sidePlanetCard.classList.remove("d-none");
            btnResume.classList.remove("d-none");

            sidePlanetCard.innerHTML = `
                <div class="card-body p-4 p-xl-5">

                    <img src="${data.image}"
                         alt="${data.name}"
                         class="img-fluid rounded mb-4"
                         style="max-height:220px; object-fit:contain; display:block; margin:auto;">

                    <h2 class="card-title text-info fw-bold text-uppercase mb-1">
                        ${data.name}
                    </h2>

                    <hr class="border-light opacity-25">

                    <div class="row text-start my-4 g-3">

                        <div class="col-6">
                            <span class="text-secondary small d-block fw-bold">
                                DIAMETER
                            </span>
                            <strong class="fs-5 text-white">
                                ${data.diameter}
                            </strong>
                        </div>

                        <div class="col-6">
                            <span class="text-secondary small d-block fw-bold">
                                SUHU RATA-RATA
                            </span>
                            <strong class="fs-5 text-white">
                                ${data.temperature}
                            </strong>
                        </div>

                        <div class="col-6">
                            <span class="text-secondary small d-block fw-bold">
                                GRAVITASI
                            </span>
                            <strong class="fs-5 text-white">
                                ${data.gravity}
                            </strong>
                        </div>

                        <div class="col-6">
                            <span class="text-secondary small d-block fw-bold">
                                JUMLAH SATELIT
                            </span>
                            <strong class="fs-5 text-white">
                                ${data.satellites}
                            </strong>
                        </div>

                    </div>

                    <hr class="border-light opacity-25">

                    <p class="card-text text-start mt-4 fs-6"
                       style="line-height:1.7;color:#ccc;">
                        ${data.description}
                    </p>

                </div>
            `;
        }
    });
});

/* Event Click Tombol Kembali */
btnResume.addEventListener("click", function () {

    isOrbitPaused = false;

    document.body.classList.remove("focus-planet-mode");
window.scrollTo(0, lastScrollPosition);
    solarContainer.classList.remove("zoom-mode");

    document.querySelectorAll(".planet, .sun").forEach(p => {
        p.classList.remove("inactive-planet", "active-highlight");
    });

    sidePlanetCard.classList.add("d-none");
    btnResume.classList.add("d-none");
    initialInstruction.classList.remove("d-none");

});


fetch("data/planets.json")
    .then(response => response.json())
    .then(data => {

        const container =
            document.getElementById("statistics-content");

        const maxDiameter = 139820;

        let html = `
            <div class="row g-4">
        `;

        data.forEach(planet => {

            if (planet.name === "Matahari") return;

            const diameter =
                parseInt(
                    planet.diameter
                        .replace(/\./g, "")
                        .replace(" km", "")
                );

            const percentage =
                (diameter / maxDiameter) * 100;

            html += `
                <div class="col-md-6 col-lg-4">

                    <div class="stat-card">

                        <img
                            src="${planet.image}"
                            alt="${planet.name}"
                            class="planet-stat-img">

                        <h4 class="stat-title">
                            ${planet.name}
                        </h4>

                        <p class="stat-diameter">
                            Diameter: ${planet.diameter}
                        </p>

                        <div class="progress">

                            <div
                                class="progress-bar bg-info"
                                style="width:${percentage}%">

                                ${Math.round(percentage)}%

                            </div>

                        </div>

                    </div>

                </div>
            `;
        });

        html += `</div>`;

        container.innerHTML = html;

    });

    /* =========================
   OBSERVATORY MAP
========================= */

const map =
L.map("map").setView(
    [-2.5,118],
    5
);

L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
        "&copy; OpenStreetMap"
    }
).addTo(map);

fetch("data/observatory.json")

.then(response =>
    response.json()
)

.then(data => {

    const card =
    document.getElementById(
        "observatory-card"
    );

    data.forEach(obs => {

    const marker =
    L.marker([
        obs.lat,
        obs.lng
    ]).addTo(map);

    marker.bindPopup(`
    <div class="popup-observatory">
        <img src="${obs.image}" alt="${obs.name}">
        
    </div>


    <br>

    <strong>${obs.name}</strong>

    <br>

    ${obs.city}

`);

    marker.on("click", () => {

        card.innerHTML = `
        <img
        src="${obs.image}"
        alt="${obs.name}"
        class="observatory-image">

            <h3 class="text-info">
                ${obs.name}
            </h3>

            <hr>

            <p>
                <strong>Kota:</strong>
                ${obs.city}
            </p>

            <p>
                ${obs.description}
            </p>

        `;

    });

});

});

/* =========================
   ACTIVE NAVBAR LINK
========================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {
            link.classList.add("active");
        }

    });

});