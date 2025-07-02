const sentences = [
  "Welcome to My Website !",
  "Made with Love ❤️",
  "Created by Achinta Hazra",
];
const randomIndex = Math.floor(Math.random() * sentences.length);
const selectedSentence = sentences[randomIndex];
document.getElementsByClassName("sentence")[0].textContent = selectedSentence;

// Add DARK theme functionality using JS

const dlbutton = document.getElementById("themeToggle");
dlbutton.addEventListener("click", () => {
  document.body.classList.toggle("light");
  if (document.body.classList.contains("light")) {
    dlbutton.innerText = "Normal";
  } else {
    dlbutton.innerText = "Beautify";
  }
});
// place the song cards using JS
fetch("playlist.json")
  .then((response) => response.json())
  .then((playlist) => {
    songs = playlist;
    const songlistdiv = document.querySelector(".song-name");

    if (!songlistdiv) {
      console.error("Element with class 'song-name' not found.");
      return;
    }

    playlist.forEach((song, index) => {
      // Container for one song card
      const songCard = document.createElement("div");
      songCard.classList.add("song");

      // Image element
      const img = document.createElement("img");
      img.classList.add("song-img");
      img.src = `images/${song.image}`;
      img.alt = song.title;

      // Title element
      const title = document.createElement("p");
      title.classList.add("song-title");
      title.textContent = song.title;

      // Click handler
      songCard.addEventListener("click", () => playSong(index));

      // Append to card and then to container
      songCard.append(img, title);
      songlistdiv.appendChild(songCard);
    });
  })
  .catch((error) => {
    console.error("Error loading playlist:", error);
  });

// ADD Current Song Info Using JS & Playback control

let currentSongIndex = 0;
let songs = [];
let isLooping = false;
let isShuffling = false;

const audio = document.getElementById("audio-player");
const seekbar = document.getElementById("seekbar");
const volumeSlider = document.getElementById("volume");
const currentSongDiv = document.querySelector(".current-song");
const previous = document.querySelector(".play-button-p");
const next = document.querySelector(".play-button-n");
const play = document.querySelector(".play-button-m");
const loopBtn = document.querySelector(".loop-button");
const shuffleBtn = document.querySelector(".shuffle-button");

// Play song by index
function playSong(index) {
  currentSongIndex = index;
  const song = songs[index];
  audio.src = song.file;
  audio.play();

  // Show current song
  currentSongDiv.innerHTML = `
    <img src="images/${song.image}" alt="${song.title}" width="40" height="40">
    <span>${song.title}</span>
  `;
}

// Play/pause toggle
function togglePlay() {
  if (!audio.src) {
    // If no song loaded, play the first song
    playSong(0);
    return;
  }

  if (audio.paused) {
    audio.play();
    setPlayButtonIcon(true);
  } else {
    audio.pause();
    setPlayButtonIcon(false);
  }
}

play.addEventListener("click", togglePlay);
function setPlayButtonIcon(isPlaying) {
  play.innerHTML = isPlaying
    ? `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3 2h3v12H3V2zm7 0h3v12h-3V2z"/></svg>` // pause
    : `<svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor"><path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288z"/></svg>`; // play
}

audio.addEventListener("play", () => setPlayButtonIcon(true));
audio.addEventListener("pause", () => setPlayButtonIcon(false));

// Prev/Next
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  playSong(currentSongIndex);
}
previous.addEventListener("click", prevSong);
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playSong(currentSongIndex);
}
next.addEventListener("click", nextSong);

// Seekbar
audio.addEventListener("timeupdate", () => {
  seekbar.max = audio.duration;
  seekbar.value = audio.currentTime;
});
seekbar.addEventListener("input", () => {
  audio.currentTime = seekbar.value;
});

// Volume
audio.volume = 0.5; // set initial volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
});


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

// Place the created Playlist Using JS
