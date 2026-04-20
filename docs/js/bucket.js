let data = [];
let currentView = "completed";

const grid = document.getElementById("cardGrid");
const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalDate = document.getElementById("modalDate");

document.getElementById("closeModal").onclick = () => {
    modal.classList.add("hidden");
};

/* Fetch JSON */
fetch("js/data.json")
    .then(res => res.json())
    .then(json => {
        data = json;
        updateProgress();
        renderCards();
    });

/* Progress */
function updateProgress() {
    const completed = data.filter(d => d.status === "completed").length;
    const total = data.length;

    progressText.innerText = `${completed} / ${total} Dreams Completed`;

    const percent = (completed / total) * 100;
    progressFill.style.width = percent + "%";
}

/* Render Cards */
function renderCards() {
    grid.innerHTML = "";

    const filtered = data.filter(d => d.status === currentView);

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "card";

        if (item.status === "dream") card.classList.add("locked");

        card.innerHTML = `
            <h3>${item.title}</h3>
            <p>${item.short}</p>
            ${item.date ? `<span>${item.date}</span>` : ""}
        `;

        card.onclick = () => openModal(item);

        grid.appendChild(card);
    });
}

/* Modal */
function openModal(item) {
    modalTitle.innerText = item.title;
    modalDesc.innerText = item.description;
    modalDate.innerText = item.date || "";
    modal.classList.remove("hidden");
}

/* Toggle */
document.querySelectorAll(".toggle button").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".toggle button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        currentView = btn.dataset.type;
        renderCards();
    });
});