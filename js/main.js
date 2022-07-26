const cover = document.querySelector(".player__cover");
const songAuthor = document.querySelector(".player__song-author");
const songName = document.querySelector(".player__song-name");
const backwardBtn = document.querySelector(".controls__button--backward");
const playBtn = document.querySelector(".controls__button--play");
const forwardBtn = document.querySelector(".controls__button--forward");
const audio = document.querySelector("audio");
const progressBar = document.querySelector(".player__progress-bar");
const progressBarDuration = document.querySelector(".progress-bar__duration");
const time = document.querySelector(".player__time");

const songs = [
  {
    author: "Anno Domini Beats",
    name: "Culture",
    fileName: "Culture - Anno Domini Beats.mp3",
    coverName: "annodominination.jpg",
  },
  {
    author: "NEFFEX",
    name: "Go!",
    fileName: "Go! - NEFFEX.mp3",
    coverName: "neffex.jpg",
  },
  {
    author: "Squadda B",
    name: "Travel Nonstop",
    fileName: "Travel Nonstop - Squadda B.mp3",
    coverName: "squadda b.jpg",
  },
];

let isPlaying = false;
let currentSongIndex = 0;

const initPlayer = () => {
  const song = songs[currentSongIndex];
  cover.src = `../img/${song.coverName}`;
  songAuthor.innerText = song.author;
  songName.innerText = song.name;
  audio.src = `../audio/${song.fileName}`;
};

const setPlayOrPause = () => {
  const icon = playBtn.querySelector(".button__img");

  if (!isPlaying) {
    audio.play();
    isPlaying = true;
    icon.src = "../icons/circle-pause-solid.svg";
  } else {
    audio.pause();
    isPlaying = false;
    icon.src = "../icons/circle-play-solid.svg";
  }
};

const chengeCurrentSongIndex = (step) => {
  if (step === "forward") {
    currentSongIndex =
      currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
  }

  if (step === "backward") {
    currentSongIndex =
      currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
  }
};

const setNextSong = () => {
  chengeCurrentSongIndex("forward");
  initPlayer();
  isPlaying && audio.play();
};

const setPrevSong = () => {
  chengeCurrentSongIndex("backward");
  initPlayer();
  isPlaying && audio.play();
};

const updateProgressBar = () => {
  const { duration, currentTime } = audio;
  const percent = (currentTime / duration) * 100;
  progressBarDuration.style.width = `${percent}%`;
};

const addZero = (number) => {
  return number < 10 ? `0${number}` : String(number);
};

const convertTimeToString = (seconds) => {
  const minutes = addZero(Math.ceil(Math.floor(seconds / 60)));
  const sec = addZero(Math.ceil(Math.round(seconds - minutes * 60)));

  return `${minutes}:${sec}`;
};

const updateTime = (seconds) => {
  time.innerText = convertTimeToString(seconds);
};

playBtn.addEventListener("click", setPlayOrPause);
forwardBtn.addEventListener("click", setNextSong);
backwardBtn.addEventListener("click", setPrevSong);

progressBar.addEventListener("click", (event) => {
  const { offsetX, currentTarget } = event;
  const { clientWidth } = currentTarget;
  const { duration } = audio;
  audio.currentTime = (offsetX / clientWidth) * duration;
});

audio.addEventListener("ended", setNextSong);

audio.addEventListener("loadeddata", () => {
  updateTime(audio.duration);
});

audio.addEventListener("play", () => {
  setInterval(() => {
    const timeLeft = audio.duration - audio.currentTime;
    updateProgressBar();
    updateTime(timeLeft);
  }, 500);
});

initPlayer();
