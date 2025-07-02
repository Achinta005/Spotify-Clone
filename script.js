window.addEventListener("DOMContentLoaded", () => {
  loadPlaylists();
});

// Place the created Playlist Using JS

let playlists = {}; // { playlistName: [songObj, songObj] }
let currentPlaylist = null;
let currentPlaylistIndex = 0;
let isPlayingPlaylist = false;

// Load from localStorage
function loadPlaylists() {
  const stored = localStorage.getItem("userPlaylists");
  if (stored) {
    playlists = JSON.parse(stored);
    renderPlaylists();
  }
}
// Save to localStorage
function savePlaylists() {
  localStorage.setItem("userPlaylists", JSON.stringify(playlists));
}

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

    playlist.forEach((song, index) => {
      const songCard = document.createElement("div");
      songCard.classList.add("song");

      const img = document.createElement("img");
      img.classList.add("song-img");
      img.src = `images/${song.image}`;
      img.alt = song.title;

      const title = document.createElement("p");
      title.classList.add("song-title");
      title.textContent = song.title;

      // Left-click to play
      songCard.addEventListener("click", () => playSong(index));

      // Right-click to add to playlist
      songCard.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        const playlistName = prompt("Add to which playlist?");
        if (playlistName && playlists[playlistName]) {
          const exists = playlists[playlistName].some(
            (s) => s.title === song.title
          );
          if (!exists) {
            playlists[playlistName].push(song);
            savePlaylists();
            renderPlaylists();
          }
        } else {
          alert("Playlist not found.");
        }
      });

      songCard.append(img, title);
      songlistdiv.appendChild(songCard);
    });

    //Render playlists only after songs are loaded
    renderPlaylists();
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
    <img src="images/${song.image}" alt="${song.title}">
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
const currentTime=document.getElementById("current-time");
const duration=document.getElementById("duration");

function formatTime(seconds){
  const min=Math.floor(seconds/60);
  const sec=Math.floor(seconds%60);
  return `${min}:${sec<10?'0':''}${sec}`;

}
audio.addEventListener("timeupdate", () => {
  seekbar.max = audio.duration||0;
  seekbar.value = audio.currentTime||0;

  currentTime.textContent=formatTime(audio.currentTime);
  duration.textContent=formatTime(audio.duration||0);
});
seekbar.addEventListener("input", () => {
  audio.currentTime = seekbar.value;
});

// Volume
const volume=document.getElementById("volume-value");
volume.textContent=`${volumeSlider.value}%`;

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value / 100;
  volume.textContent=`${volumeSlider.value}%`;
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

const createBtn = document.querySelector(".create");
const form = document.getElementById("playlistForm");
const saveBtn = document.getElementById("savePlaylist");
const input = document.getElementById("newPlaylistName");

createBtn.addEventListener("click", () => {
  form.classList.toggle("hidden");
  input.focus();
});

saveBtn.addEventListener("click", () => {
  const name = input.value.trim();
  if (name && !playlists[name]) {
    playlists[name] = [];
    savePlaylists();
    renderPlaylists();
    input.value = "";
    form.classList.add("hidden");
  } else {
    alert("Playlist already exists or name is invalid.");
  }
});


function renderPlaylists() {
  const container = document.getElementById("user-playlists");
  container.innerHTML = "";

  for (const name in playlists) {
    const plDiv = document.createElement("div");
    plDiv.className = "playlist-item";

    const title = document.createElement("span");
    title.textContent = name;
    title.className = "playlist-title";
    title.addEventListener("click", () => playUserPlaylist(name));

    const toggleBtn = document.createElement("button");
    toggleBtn.innerHTML = "+";
    toggleBtn.className = "expand-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.className = "delete-btn";
    deleteBtn.title = "Delete playlist";
    deleteBtn.addEventListener("click", () => {
      if (confirm(`Delete playlist "${name}"?`)) {
        delete playlists[name];
        savePlaylists();
        renderPlaylists();
      }
    });

    const songList = document.createElement("div");
    songList.className = "playlist-songs hidden";

    playlists[name].forEach((song) => {
      const p = document.createElement("p");
      p.textContent = song.title;
      songList.appendChild(p);
    });

    toggleBtn.addEventListener("click", () => {
      songList.classList.toggle("hidden");
    });

    const btnWrapper = document.createElement("div");
    btnWrapper.style.float = "right";
    btnWrapper.append(toggleBtn, deleteBtn);

    plDiv.append(title, btnWrapper, songList);
    container.appendChild(plDiv);
  }
}


songCard.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  const playlistName = prompt("Add to which playlist?");
  if (playlistName && playlists[playlistName]) {
    const exists = playlists[playlistName].some(s => s.title === song.title);
    if (!exists) {
      playlists[playlistName].push(song);
      savePlaylists();
      renderPlaylists();
    }
  }
});


function playUserPlaylist(name) {
  currentPlaylist = playlists[name];
  currentPlaylistIndex = 0;
  isPlayingPlaylist = true;
  playSongFromPlaylist();
}

function playSongFromPlaylist() {
  if (!currentPlaylist || currentPlaylist.length === 0) return;
  const song = currentPlaylist[currentPlaylistIndex];
  audio.src = song.file;
  audio.play();
  currentSongDiv.innerHTML = `
    <img src="images/${song.image}" alt="${song.title}">
    <span>${song.title}</span>
  `;
}

audio.addEventListener("ended", () => {
  if (isPlayingPlaylist && currentPlaylistIndex < currentPlaylist.length - 1) {
    currentPlaylistIndex++;
    playSongFromPlaylist();
  }
});


