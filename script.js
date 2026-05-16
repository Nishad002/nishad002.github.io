/* ========================================================= */
/* STARS BACKGROUND GENERATOR */
/* ========================================================= */

const starsContainer = document.querySelector(".stars-container");

/* ========================================================= */
/* CREATE STARS */
/* ========================================================= */

function createStars() {

    const totalStars = 120;

    for (let i = 0; i < totalStars; i++) {

        const star = document.createElement("div");

        star.classList.add("star");

        /* RANDOM POSITION */

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        /* RANDOM SIZE */

        const size = Math.random() * 3;

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        /* RANDOM ANIMATION SPEED */

        const duration = 3 + Math.random() * 6;

        star.style.animationDuration = `${duration}s`;

        /* RANDOM DELAY */

        const delay = Math.random() * 5;

        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

/* ========================================================= */
/* START STAR CREATION */
/* ========================================================= */

createStars();

/* ========================================================= */
/* GET ALL GRID CONTAINERS */
/* ========================================================= */

const moviesCount = document.getElementById("movies-count");

const seriesCount = document.getElementById("series-count");

const moviesCompletedGrid = document.getElementById("movies-completed-grid");

const seriesCompletedGrid = document.getElementById("series-completed-grid");

/* ========================================================= */
/* MODAL ELEMENTS */
/* ========================================================= */

const animeModal = document.getElementById("anime-modal");

const modalImage = document.getElementById("modal-image");

const modalTitle = document.getElementById("modal-title");

const modalLink = document.getElementById("modal-link");

const closeModalBtn = document.getElementById("close-modal");

/* ========================================================= */
/* PLACEHOLDER IMAGE */
/* IMPORTANT:
   Put your placeholder image inside images folder
   Example:
   images/placeholder.webp
*/
/* ========================================================= */

const PLACEHOLDER_IMAGE = "images/placeholder.webp";

/* ========================================================= */
/* CREATE ANIME CARD */
/* ========================================================= */

function createAnimeCard(anime) {

    /* CREATE CARD */

    const card = document.createElement("div");

    card.classList.add("anime-card");

    /* ===================================================== */
    /* CHECK IMAGE */
    /* ===================================================== */

    const imageSource = anime.image && anime.image.trim() !== ""
        ? anime.image
        : PLACEHOLDER_IMAGE;

    /* ===================================================== */
    /* CARD HTML */
    /* ===================================================== */

    card.innerHTML = `
    
        <img src="${imageSource}" alt="${anime.title}">

        <div class="card-overlay">

            <h3 class="card-title">
                ${anime.title}
            </h3>

        </div>

    `;

    /* ===================================================== */
    /* CLICK EVENT -> OPEN MODAL */
    /* ===================================================== */

    card.addEventListener("click", () => {

        openModal(anime);

    });

    return card;
}

/* ========================================================= */
/* RENDER ALL ANIME */
/* ========================================================= */

function renderAnime() {

    /* ===================================================== */
    /* CLEAR OLD CONTENT */
    /* ===================================================== */

    moviesCompletedGrid.innerHTML = "";

    seriesCompletedGrid.innerHTML = "";

    /* ===================================================== */
    /* COUNT VARIABLES */
    /* ===================================================== */

    let totalMovies = 0;

    let totalSeries = 0;

    /* ===================================================== */
    /* LOOP THROUGH ANIME DATA */
    /* ===================================================== */

    animeList.forEach(anime => {

        const card = createAnimeCard(anime);

        /* ================================================= */
        /* MOVIES COMPLETED */
        /* ================================================= */

        if (
            anime.type === "movie" &&
            anime.status === "completed"
        ) {

            moviesCompletedGrid.appendChild(card);
            totalMovies++;
        }

        /* ================================================= */
        /* SERIES COMPLETED */
        /* ================================================= */

        else if (
            anime.type === "series" &&
            anime.status === "completed"
        ) {

            seriesCompletedGrid.appendChild(card);
            totalSeries++;
        }

        /* ===================================================== */
        /* UPDATE COUNT UI */
        /* ===================================================== */

        moviesCount.textContent = totalMovies;

        seriesCount.textContent = totalSeries;

    });

}

/* ========================================================= */
/* OPEN MODAL */
/* ========================================================= */

function openModal(anime) {

    /* ===================================================== */
    /* IMAGE */
    /* ===================================================== */

    if (anime.image && anime.image.trim() !== "") {

        modalImage.src = anime.image;

    } else {

        modalImage.src = PLACEHOLDER_IMAGE;
    }

    /* ===================================================== */
    /* TITLE */
    /* ===================================================== */

    modalTitle.textContent = anime.title;

    /* ===================================================== */
    /* LINK */
    /* ===================================================== */

    if (anime.link && anime.link.trim() !== "") {

        modalLink.href = anime.link;

        modalLink.style.display = "inline-block";

    } else {

        modalLink.style.display = "none";
    }

    /* ===================================================== */
    /* SHOW MODAL */
    /* ===================================================== */

    animeModal.classList.add("active");

    /* ===================================================== */
    /* DISABLE BODY SCROLL */
    /* ===================================================== */

    document.body.style.overflow = "hidden";
}

/* ========================================================= */
/* CLOSE MODAL */
/* ========================================================= */

function closeModal() {

    animeModal.classList.remove("active");

    /* ENABLE SCROLL AGAIN */

    document.body.style.overflow = "auto";
}

/* ========================================================= */
/* CLOSE BUTTON CLICK */
/* ========================================================= */

closeModalBtn.addEventListener("click", closeModal);

/* ========================================================= */
/* CLICK OUTSIDE MODAL */
/* ========================================================= */

animeModal.addEventListener("click", (event) => {

    if (event.target === animeModal) {

        closeModal();
    }
});

/* ========================================================= */
/* ESC KEY CLOSE */
/* ========================================================= */

document.addEventListener("keydown", (event) => {

    if (
        event.key === "Escape" &&
        animeModal.classList.contains("active")
    ) {

        closeModal();
    }
});

/* ========================================================= */
/* SMOOTH NAVIGATION CLOSE FIX */
/* ========================================================= */

document.querySelectorAll(".dropdown-content a").forEach(link => {

    link.addEventListener("click", () => {

        closeModal();
    });

});

/* ========================================================= */
/* START WEBSITE */
/* ========================================================= */

renderAnime();