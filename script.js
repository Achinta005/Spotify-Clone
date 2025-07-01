const sentences = [
    "Welcome to My Website !",
    "Made with Love ❤️",
    "Created by Achinta Hazra"
];
const randomIndex = Math.floor(Math.random() * sentences.length);
const selectedSentence = sentences[randomIndex];
document.getElementsByClassName("sentence")[0].textContent = selectedSentence;

// Add DARK theme functionality using JS



// Place the created Playlist Using JS



// place the song cards using JS



// ADD Current Song Info Using JS
// ADD Current Song Info Using JS



// Hamburger menu toggle for library panel
const hamburgerBtn = document.getElementById('hamburgerBtn');
const leftPanel = document.querySelector('.left');
if (hamburgerBtn && leftPanel) {
    hamburgerBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('open');
    });
}