const sentences = [
    "Welcome to My Website !",
    "Made with Love ❤️",
    "Created by Achinta Hazra"
];
const randomIndex = Math.floor(Math.random() * sentences.length);
const selectedSentence = sentences[randomIndex];
document.getElementsByClassName("sentence")[0].textContent = selectedSentence;

// Add DARK theme functionality using JS

const dlbutton=document.getElementById("themeToggle")
dlbutton.addEventListener('click',()=>{
  document.body.classList.toggle('light');
  if(document.body.classList.contains('light')){
    dlbutton.innerText='Normal'
  }else{
    dlbutton.innerText='Beautify'
  }
})
// place the song cards using JS



// Place the created Playlist Using JS


// ADD Current Song Info Using JS




// Hamburger menu toggle for library panel
document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const leftPanel = document.querySelector(".left");

  hamburgerBtn.addEventListener("click", () => {
    leftPanel.classList.toggle("open");
  });
});

document.addEventListener("click", (e) => {
  const leftPanel = document.querySelector(".left");
  const hamburgerBtn = document.getElementById("hamburgerBtn");

  if (
    !leftPanel.contains(e.target) &&
    !hamburgerBtn.contains(e.target) &&
    leftPanel.classList.contains("open")
  ) {
    leftPanel.classList.remove("open");
  }
});
