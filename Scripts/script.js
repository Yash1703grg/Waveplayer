console.log("Welcome To Waveplayer!")
// Initialise the variables
let songIndex = 0;
let audioElement = new Audio('Resources/songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('progressBar');
let nowPlayingName = document.getElementById('nowPlayingName');
let nowPlayingBanner = document.getElementById('nowPlayingBanner');
let songItems = Array.from(document.getElementsByClassName('song'));
// audioElement.play();

let songs = [
    { songName: "Lag Ja Gale Se Phir", filePath: "Resources/songs/1.mp3", coverPath: "Resources/Banner/1.jpeg" },
    { songName: "Naam Goom jayega", filePath: "Resources/songs/2.mp3", coverPath: "Resources/Banner/2.jpeg" },
    { songName: "Rahen na Rahen", filePath: "Resources/songs/3.mp3", coverPath: "Resources/Banner/3.jpeg" },
    { songName: "Mera Saaya Saath Hoga", filePath: "Resources/songs/4.mp3", coverPath: "Resources/Banner/4.jpeg" },
    { songName: "Dil Hoom Hoom Kare - Female Version", filePath: "Resources/songs/5.mp3", coverPath: "Resources/Banner/5.jpeg" },
    { songName: "Piya Tose Naina Laage Re", filePath: "Resources/songs/6.mp3", coverPath: "Resources/Banner/6.jpeg" },
    { songName: "Ajib Dastan Hai Yeh", filePath: "Resources/songs/7.mp3", coverPath: "Resources/Banner/7.jpeg" },
    { songName: "Ek Pyar Ka Naghma Hai", filePath: "Resources/songs/8.mp3", coverPath: "Resources/Banner/8.jpeg" },
    { songName: "Aayega Aanewala", filePath: "Resources/songs/9.mp3", coverPath: "Resources/Banner/9.jpeg" },
    { songName: "Tujhse Naraz Nahin Zindagi", filePath: "Resources/songs/10.mp3", coverPath: "Resources/Banner/10.jpeg" }
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;

})
// Handle play/pause click

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }

    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
})

// Listen To Events
audioElement.addEventListener('timeupdate', () => {
    //seekbar update
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
})

progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');

    })
}

Array.from(document.getElementsByClassName('songPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = `Resources/songs/${songIndex + 1}.mp3`;
        nowPlayingName.innerText = songs[songIndex].songName;
        nowPlayingBanner.src = songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    })
})

audioElement.addEventListener('ended', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Resources/songs/${songIndex + 1}.mp3`;
    nowPlayingName.innerText = songs[songIndex].songName;
    nowPlayingBanner.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Resources/songs/${songIndex + 1}.mp3`;
    nowPlayingName.innerText = songs[songIndex].songName;
    nowPlayingBanner.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }

    audioElement.src = `Resources/songs/${songIndex + 1}.mp3`;
    nowPlayingName.innerText = songs[songIndex].songName;
    nowPlayingBanner.src = songs[songIndex].coverPath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
})

const seekNextButton = document.getElementById('seekNext');
const seekPreviousButton = document.getElementById('seekPrevious');

seekNextButton.addEventListener('click', () => {
    if (audioElement.currentTime + 10 <= audioElement.duration) {
        audioElement.currentTime += 10;
    }
    else {
        audioElement.currentTime += audioElement.duration;
    }
})

seekPreviousButton.addEventListener('click', () => {
    if (audioElement.currentTime - 10 >= 10) {
        audioElement.currentTime -= 10;
    }
    else {
        audioElement.currentTime = 0;
    }
})

const volumeButton = document.getElementById('volumeButton');

volumeButton.addEventListener('click', () => {
    if (audioElement.muted) {
        audioElement.muted = false;
        volumeButton.classList.remove('fa-volume-xmark');
        volumeButton.classList.add('fa-volume-high');
    }
    else {
        audioElement.muted = true;
        volumeButton.classList.remove('fa-volume-high');
        volumeButton.classList.add('fa-volume-xmark');
    }
})

const volumeBar = document.getElementById('volumeBar');
audioElement.volume = 1;
volumeBar.addEventListener('input', () => {
    audioElement.volume = volumeBar.value;

    if (volumeBar.value == 0) {
        volumeButton.classList.remove('fa-volume-high');
        volumeButton.classList.add('fa-volume-xmark');
    }
    else {
        volumeButton.classList.remove('fa-volume-xmark');
        volumeButton.classList.add('fa-volume-high');
    }
})

