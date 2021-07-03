const songs = [
  {
    name: 'Below',
    artist: 'Beartooth',
    songSrc: 'Beartooth - Below.mp3',
    imgSrc: 'Beartooth.jpg',
  },
  {
    name: 'My Exs Best Friend',
    artist: 'Machine Gun Kelly',
    songSrc: 'Machine Gun Kelly - My Exs Best Friend.mp3',
    imgSrc: 'Machine Gun Kelly.jpg',
  },
  {
    name: 'The Past Is Dead',
    artist: 'Beartooth',
    songSrc: 'Beartooth - The Past Is Dead.mp3',
    imgSrc: 'Beartooth.jpg',
  },
  {
    name: 'Reminders',
    artist: 'Touche Amore',
    songSrc: 'Touche Amore - Reminders.mp3',
    imgSrc: 'Touche Amore.jpg',
  },
];

const music = document.querySelector('audio');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const playBtn = document.getElementById('play');
const albumImage = document.getElementById('album-image');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
const timeCurrentElement = document.getElementById('time-current');
const timeDurationElement = document.getElementById('time-duration');

let isPlaying = false;

const playSong = () => {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  music.play();
};
const pauseSong = () => {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  music.pause();
};

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

let songIndex = 0;

const loadSong = (song) => {
  initialLoad(song);
  playSong();
};

const changeSong = (direction) => {
  if (direction === 'prev') {
    songIndex--;
    if (songIndex < 0) songIndex = songs.length - 1;
    loadSong(songs[songIndex]);
  } else if (direction === 'next') {
    songIndex++;
    if (songIndex === songs.length) songIndex = 0;
    loadSong(songs[songIndex]);
  }
};

const updateProgressBar = (e) => {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    timeCurrentElement.textContent = showMinutesAndSeconds(currentTime);
  }
};

const setProgressBar = (e) => {
  const width = e.target.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
};

const showMinutesAndSeconds = (time) =>
  `${Math.floor(time / 60)}:${Math.floor(time % 60)
    .toString()
    .padStart(2, 0)}`;

prevBtn.addEventListener('click', () => changeSong('prev'));
nextBtn.addEventListener('click', () => changeSong('next'));

music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', () => changeSong('next'));
progress.addEventListener('click', setProgressBar);

const initialLoad = (song) => {
  songTitle.textContent = song.name;
  songArtist.textContent = song.artist;
  music.src = `audio/${song.songSrc}`;
  albumImage.src = `img/${song.imgSrc}`;
  timeCurrentElement.textContent = '0:00';
  setTimeout(() => (timeDurationElement.textContent = showMinutesAndSeconds(music.duration)), 100);
};
initialLoad(songs[0]);
