const statsBtn = document.getElementById("statsBtn");
const statsModal = document.getElementById("statsModal");
const closeBtn = document.querySelector(".close-btn");

statsBtn.addEventListener("click", () => {
    statsModal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    statsModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === statsModal) {
        statsModal.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const startDate = new Date("2025-09-02T00:00:00");
    const today = new Date();

    const diff = today - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    const el = document.getElementById("daysTogether");

    if (el) {
        el.textContent = days;
    }

});

function createHeartBurst(x, y) {

    const container = document.getElementById("heartBurstContainer");

    for (let i = 0; i < 20; i++) {

        const heart = document.createElement("div");
        heart.classList.add("burst-heart");

        // Start position (center of popup / screen)
        heart.style.left = x + "px";
        heart.style.top = y + "px";

        // Random direction
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 800 + 50;

        const xMove = Math.cos(angle) * distance;
        const yMove = Math.sin(angle) * distance;

        heart.style.setProperty("--x", `${xMove}px`);
        heart.style.setProperty("--y", `${yMove}px`);

        heart.style.animation = "burst 1.2s ease-out forwards";

        container.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, 800);
    }
}

statsBtn.onclick = function (e) {

    statsModal.style.display = "block";

    // Get center of screen
    const x = window.innerWidth / 2;
    const y = window.innerHeight / 2;

    createHeartBurst(x, y);
};