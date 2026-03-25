let imagesData = [];
let groupByDate = false;

async function loadGallery() {
    const response = await fetch('js/images.json');
    imagesData = await response.json();

    imagesData.sort((a, b) => new Date(b.date) - new Date(a.date));

    renderGallery();
}

function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = "";

    if (!groupByDate) renderFlatGrid(gallery);
    else renderGrouped(gallery);
}

function renderFlatGrid(container) {
    const grid = document.createElement('div');
    grid.className = 'image-grid';

    imagesData.forEach(item => {
        grid.appendChild(createCard(item));
    });

    container.appendChild(grid);
}

function renderGrouped(container) {
    let currentDate = "";
    let grid;

    imagesData.forEach(item => {
        if (item.date !== currentDate) {
            currentDate = item.date;

            const group = document.createElement('div');
            const title = document.createElement('div');

            group.className = 'date-group';
            title.className = 'date-title';
            title.innerText = formatDate(currentDate);

            grid = document.createElement('div');
            grid.className = 'same-height-grid';

            group.appendChild(title);
            group.appendChild(grid);
            container.appendChild(group);
        }

        grid.appendChild(createCard(item));
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'image-card';

    if (groupByDate){
        if (item.type === "video") {
            card.innerHTML = `
                <video src="${item.src}" muted></video>
                <div class="play-icon">▶</div>
            `;

            const video = card.querySelector('video');

            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });

            card.onclick = () => openModal(item);

        } else {
            card.innerHTML = `
                <img src="${item.src}" loading="lazy">
            `;

            card.onclick = () => openModal(item);
        }
    }
    else{
        if (item.type === "video") {
            card.innerHTML = `
                <video src="${item.src}" muted></video>
                <div class="play-icon">▶</div>
                <div class="overlay">${formatDate(item.date)}</div>
            `;

            const video = card.querySelector('video');

            card.addEventListener('mouseenter', () => video.play());
            card.addEventListener('mouseleave', () => {
                video.pause();
                video.currentTime = 0;
            });

            card.onclick = () => openModal(item);

        } else {
            card.innerHTML = `
                <img src="${item.src}" loading="lazy">
                <div class="overlay">${formatDate(item.date)}</div>
            `;

            card.onclick = () => openModal(item);
        }
    }
    return card;
}

function openModal(item) {
    const modal = document.getElementById('mediaModal');
    const img = document.getElementById('modalImg');
    const video = document.getElementById('modalVideo');

    modal.style.display = "flex";

    // 🔥 ADD THIS
    document.body.classList.add("modal-open");

    if (item.type === "video") {
        img.style.display = "none";
        video.style.display = "block";

        video.src = item.src;
        video.play();
    } else {
        video.style.display = "none";
        img.style.display = "block";

        img.src = item.src;
    }
}

function closeModal() {
    const modal = document.getElementById('mediaModal');
    const video = document.getElementById('modalVideo');

    modal.style.display = "none";

    // 🔥 ADD THIS
    document.body.classList.remove("modal-open");

    video.pause();
    video.currentTime = 0;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}: ${day} ${month}, ${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('toggleDate').onclick = (e) => {
        groupByDate = !groupByDate;

        e.target.innerText = groupByDate ? "Ungroup Dates" : "Group by Date";

        renderGallery();
    };

    document.querySelector('.close').onclick = closeModal;

    document.getElementById('mediaModal').onclick = (e) => {
        if (e.target.id === 'mediaModal') closeModal();
    };

    loadGallery();
});


