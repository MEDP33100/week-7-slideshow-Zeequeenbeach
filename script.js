const API_URL = "https://api.artic.edu/api/v1/artworks/search?q=painting&limit=10&fields=id,title,image_id";
let currentIndex = 0;
let artworks = [];

const artImage = document.getElementById('art-image');
const artTitle = document.getElementById('art-title');
const prevBtn = document.getElementById('right-btn');
const nextBtn = document.getElementById('left-btn');

function displayArtwork(index) {
    const artwork = artworks[index];
    if (!artwork) return;
    const imageUrl = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
    artImage.src = imageUrl;
    artTitle.textContent = artwork.title;
}

async function fetchArtworks() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        artworks = data.data;
        displayArtwork(currentIndex);
    } catch (error) {
        console.error('Error fetching artworks:', error);
        artTitle.textContent = "Failed to load artwork.";
    }
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        displayArtwork(currentIndex);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentIndex < artworks.length - 1) {
        currentIndex++;
        displayArtwork(currentIndex);
    }
});

fetchArtworks();
