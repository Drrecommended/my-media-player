const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevButton = document.getElementById("prev");
const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const muteButton = document.getElementById("mute");
const volumeControl = document.getElementById("vol-control");

//Music
const songs = [
  {
    name: "Fantastic Man - Won't Somebody Think of the Children",
    displayName: "Won't Somebody Think of the Children",
    artist: "Fantastic Man",
  },
  {
    name: "Luca Lozano - BIOHAZARD",
    displayName: "BIOHAZARD",
    artist: "Luca Lozano",
  },
  {
    name: "Marlon Hoffstadt - To All Believers",
    displayName: "To All The Believers",
    artist: "Marlon Hoffstadt",
  },
  {
    name: "New Members - Deep In The Night",
    displayName: "Deep In The Night",
    artist: "New Members",
  },
];

//check if playing

let isPlayling = false;

// play the song

function playSong() {
  isPlayling = true;
  playButton.classList.replace("fa-play", "fa-pause");
  playButton.setAttribute("title", "pause");
  if (isPlayling) {
    muteButton.classList.replace("fa-volume-mute", "fa-volume-up");
    muteButton.setAttribute("title", "mute");
  }
  music.play();
}

//pause the song

function pauseSong() {
  isPlayling = false;
  playButton.classList.replace("fa-pause", "fa-play");
  playButton.setAttribute("title", "play");
  if (!isPlayling) {
    muteButton.classList.replace("fa-volume-up", "fa-volume-mute");
    muteButton.setAttribute("title", "mute");
  }
  music.pause();
}

//play or pause event listener
playButton.addEventListener("click", () =>
  isPlayling ? pauseSong() : playSong()
);

// Update DOM

function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;

//previous song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//next song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//on load select first song

loadSong(songs[songIndex]);

//update progress bar and time

function updateProgressBar(e) {
  if (isPlayling) {
    const { duration, currentTime } = e.srcElement;
    //update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //delay switching the duration to avoid NaN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //display for current time
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//set progress bar
function setProgressBar(e) {
  if(!isPlayling) {
    playSong()
  }
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

//handle volume change

function handleVolume() {
  music.volume = this.value / 100;
  let checkMute = music.volume;
  if (checkMute && isPlayling) {
    muteButton.classList.replace("fa-volume-mute", "fa-volume-up");
    muteButton.setAttribute("title", "mute");
  } else {
    playSong();
    muteButton.classList.replace("fa-volume-up", "fa-volume-mute");
    muteButton.setAttribute("title", "mute");
  }
}


// event listeners
prevButton.addEventListener("click", prevSong);
nextButton.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
volumeControl.addEventListener("change", handleVolume);
volumeControl.addEventListener("input", handleVolume);
