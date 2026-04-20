const btn = document.getElementById('touch-btn');
const textElement = document.getElementById('compliment-text');
const flowerContainer = document.getElementById('flower-container');
const centerContent = document.getElementById('center-content');
const bgMusic = document.getElementById('bg-music');

// Add as many compliments as you like here!
const compliments = [
    "Tum Duniya ki sabse smart larki ho!",
    "You have the most beautiful smile in the world.",
    "Meri zindagi mein aane ke liye shukriya! ❤️",
    "You make every single day better.",
    "You are absolutely perfect to me."
];

// Array of different flower emojis
const flowers = ['🌸', '🌺', '🌻', '🌼', '🌷', '🌹', '🪷'];

let clickCount = 0;

bgMusic.play();

btn.addEventListener('click', () => {
    // 1. Handle the text display
    textElement.style.display = 'block';
    if (clickCount===0){
        bgMusic.play();
    }
    
    // Cycle through the compliments array based on how many times the button was clicked
    const complimentIndex = clickCount % compliments.length;
    textElement.innerText = compliments[complimentIndex];

    // 2. Add the flowers
    // The more she clicks, the more flowers we add in a single batch
    const numberOfFlowersToAdd = 15 + clickCount; 
    spawnFlowers(numberOfFlowersToAdd);

    clickCount++;
});

function spawnFlowers(count) {
    for (let i = 0; i < count; i++) {
        // Pick random coordinates anywhere on the screen
        const x = Math.random() * (window.innerWidth - 40); // 40 is roughly the flower width
        const y = Math.random() * (window.innerHeight - 40);

        const flower = document.createElement('div');
        flower.className = 'flower';
        
        // Pick a random flower emoji
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        
        // Position it
        flower.style.left = `${x}px`;
        flower.style.top = `${y}px`;
        
        // Add a random slight rotation for variety
        flower.style.setProperty('--rotation', (Math.random() * 40) - 20);
        
        flowerContainer.appendChild(flower);
    }
}