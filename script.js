const sentences = [
    "Welcome to My Website !",
    "Made with Love ❤️",
    "Created by Achinta Hazra"
];
const randomIndex = Math.floor(Math.random() * sentences.length);
const selectedSentence = sentences[randomIndex];
document.getElementsByClassName("sentence")[0].textContent = selectedSentence;