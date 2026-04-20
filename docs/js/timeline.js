function createMediaHTML(item) {
    if (item.media.length === 1) {
        return `
            <div class="card">
                <img src="${item.media[0]}" class="clickable-media"/>
                <span>${item.date}</span>
            </div>
        `;
    }

    let html = `<div class="card-group">`;

    item.media.forEach((img, index) => {
        html += `
            <div class="card ${index % 2 !== 0 ? "card2" : ""}">
                <img src="${img}" class="clickable-media"/>
                <span>${item.date}</span>
            </div>
        `;
    });

    html += `</div>`;
    return html;
}

let milestonesData = Array.isArray(typeof milestones !== "undefined" ? milestones : null)
    ? [...milestones]
    : [];

const API_URL =
    (typeof window !== "undefined" && window.MILESTONES_API_URL)
        ? window.MILESTONES_API_URL
        : "http://localhost:5000/milestones";

function renderTimeline(items) {
    const container = document.getElementById("timeline");
    container.innerHTML = "";

    items.forEach((item) => {

        const position = item.position;

        const div = document.createElement("div");
        div.className = `milestone ${position}`;

        div.innerHTML = `
            ${createMediaHTML(item)}
            <h3>${item.title}</h3>
            <p>${item.description}</p>
        `;

        container.appendChild(div);
    });

    attachImageClick();
}

/* IMAGE MODAL */
function attachImageClick() {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImg");

    document.querySelectorAll(".clickable-media").forEach(img => {
        img.onclick = () => {
            modal.style.display = "flex";
            modalImg.src = img.src;
            document.body.classList.add("modal-open");
        };
    });
}

const imageModal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImg");

/* CLICK OUTSIDE IMAGE → CLOSE */
imageModal.addEventListener("click", (e) => {
    if (e.target === imageModal) {
        imageModal.style.display = "none";
        document.body.classList.remove("modal-open");
    }
});

document.getElementById("closeImage").onclick = () => {
    document.getElementById("imageModal").style.display = "none";
    document.body.classList.remove("modal-open");
};

/* ADD MILESTONE */
const formModal = document.getElementById("formModal");

document.getElementById("addMilestoneBtn").onclick = () => {
    formModal.style.display = "flex";
};

/* CLICK OUTSIDE FORM → CLOSE */
formModal.addEventListener("click", (e) => {
    if (e.target === formModal) {
        formModal.style.display = "none";
    }
});

async function refreshTimelineFromDB() {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error(`Failed to load milestones: ${response.status} ${response.statusText}`);
    }
    milestonesData = await response.json();
    renderTimeline(milestonesData);
}

document.getElementById("saveMilestone").onclick = async () => {
    try {
        const date = document.getElementById("dateInput").value.trim();
        const title = document.getElementById("titleInput").value.trim();
        const desc = document.getElementById("descInput").value.trim();
        const position = document.getElementById("positionInput").value;

        const mediaRaw = document.getElementById("mediaInput").value;
        const media = mediaRaw
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean);

        if (!date || !title) {
            alert("Please enter at least `Date` and `Title`.");
            return;
        }

        const payload = {
            date,
            title,
            description: desc,
            media,
            position
        };

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Failed to save milestone: ${response.status} ${response.statusText}`);
        }

        formModal.style.display = "none";
        await refreshTimelineFromDB();
    } catch (err) {
        console.error(err);
        alert("Could not save milestone. Check console for details.");
    }
};

renderTimeline(milestonesData);
refreshTimelineFromDB().catch((err) => {
    console.warn("Using local milestones (DB load failed):", err);
});